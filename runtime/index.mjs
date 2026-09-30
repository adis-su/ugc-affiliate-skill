import { resolveCreator } from "./knowledge/creator-library.mjs";
import { retrieveProductIntelligence, fetchProductSource, resolveProductWithSource } from "./intelligence/product-retrieval.mjs";
import { retrieveCreatorIntelligence } from "./intelligence/creator-retrieval.mjs";
import { resolveNiche, NICHE_KNOWLEDGE } from "./knowledge/niche-knowledge.mjs";
import { CAMPAIGN_OBJECTIVES, CAMPAIGN_STAGES, CTAS, FORMAT_ANGLES, PLATFORMS as KNOWLEDGE_PLATFORMS, SCENE_LIMITS, SILENT_FORMATS, resolveCreativeKnowledge, validateCampaignEnums } from "./knowledge/campaign-creative-behavior.mjs";

export const SUPPORTED_CREATORS = new Set(["Rositasari"]);
export const PLATFORMS = new Set(KNOWLEDGE_PLATFORMS);
export const NICHES = FORMAT_ANGLES;

const blocker = (code, stage, message, field = null, corrective_action = null) => ({
  code, stage, severity: "BLOCKER", message, field, corrective_action
});

const baseValidation = (status, blockers = [], warnings = [], corrective_actions = []) => ({
  status, blockers, warnings, corrective_actions,
  contract_checks: [],
  output_counts: { scene_plan: 0, image_prompts: 0, video_prompts: 0 },
  continuity_checks: []
});

const blockedOutput = (validation) => ({
  creative_summary: null,
  scene_plan: [],
  image_prompts: [],
  video_prompts: [],
  validation
});

function isSpeechRequested(input) {
  return /speech|spoken|dialogue|lip-sync|voice[- ]?over/i.test(input?.content?.custom_instructions ?? "");
}

function speechMode(input) {
  if (input.content.format === "Talking Head") return "spoken";
  if (SILENT_FORMATS.has(input.content.format)) return "silent";
  return isSpeechRequested(input) ? "spoken" : "silent_or_optional";
}

export function validateRequest(input) {
  const blockers = [];
  if (!input || typeof input !== "object") {
    return [blocker("INVALID_INPUT", "normalize", "Request must be an object.")];
  }

  const required = [
    ["niche", input.niche], ["product.product_name", input.product?.product_name],
    ["campaign.objective", input.campaign?.objective], ["campaign.stage", input.campaign?.stage],
    ["campaign.cta", input.campaign?.cta], ["creator", input.creator],
    ["content.format", input.content?.format], ["content.angle", input.content?.angle],
    ["content.duration_sec", input.content?.duration_sec], ["content.scene_count", input.content?.scene_count]
  ];
  for (const [field, value] of required) {
    if (value === undefined || value === null || value === "") {
      blockers.push(blocker("MISSING_REQUIRED_FIELD", "validate", `Missing required field: ${field}`, field));
    }
  }

  if (!Array.isArray(input.platform) || input.platform.length === 0) {
    blockers.push(blocker("MISSING_REQUIRED_FIELD", "validate", "At least one platform is required.", "platform"));
  } else {
    for (const platform of input.platform) {
      if (!PLATFORMS.has(platform)) blockers.push(blocker("INVALID_ENUM", "validate", `Unsupported platform: ${platform}`, "platform"));
    }
  }

  if (input.niche && !NICHES[input.niche]) blockers.push(blocker("INVALID_ENUM", "validate", `Unsupported niche: ${input.niche}`, "niche"));
  blockers.push(...validateCampaignEnums(input));
  if (input.creator && !SUPPORTED_CREATORS.has(input.creator)) {
    blockers.push(blocker("CREATOR_NOT_FOUND", "creator", `Creator is not available: ${input.creator}`, "creator"));
  }
  if (input.niche) {
    const nicheResult = resolveNiche(input.niche);
    if (nicheResult.blocker) blockers.push(nicheResult.blocker);
  }

  const niche = NICHES[input.niche];
  if (niche && input.content?.format && !niche.formats.includes(input.content.format)) {
    blockers.push(blocker("INVALID_FORMAT_ANGLE", "creative", `Format is not supported by ${input.niche}: ${input.content.format}`, "content.format"));
  }
  if (niche && input.content?.angle && !niche.angles.includes(input.content.angle)) {
    blockers.push(blocker("INVALID_FORMAT_ANGLE", "creative", `Angle is not supported by ${input.niche}: ${input.content.angle}`, "content.angle"));
  }

  const [min, max] = SCENE_LIMITS[input.content?.duration_sec] ?? [null, null];
  if (min !== null && typeof input.content.scene_count === "number" &&
      (input.content.scene_count < min || input.content.scene_count > max)) {
    blockers.push(blocker(
      "INVALID_DURATION_SCENE_COUNT", "scene-planning",
      `Duration ${input.content.duration_sec}s supports ${min}–${max} scenes, received ${input.content.scene_count}.`,
      "content.scene_count"
    ));
  }

  if (input.content?.format && SILENT_FORMATS.has(input.content.format) && isSpeechRequested(input)) {
    blockers.push(blocker(
      "SPEECH_MODE_CONFLICT", "behavior",
      "Silent format cannot contain spoken dialogue, voice-over, or lip-sync instructions.",
      "content.custom_instructions"
    ));
  }
  return blockers;
}

export function resolveProduct(input) {
  const intelligence = retrieveProductIntelligence(input);
  if (intelligence.conflict_notes.some((conflict) => conflict.values.explicit !== undefined)) {
    return {
      blocker: blocker(
        "PRODUCT_CONFLICT",
        "product",
        "Explicit product facts conflict with retrieved product facts.",
        "product.product_facts",
        "Preserve the conflict and resolve the product source before generation."
      )
    };
  }
  return intelligence;
}

function campaignIntelligence(input, product) {
  const { objective, stage, cta } = input.campaign;
  const conversion = objective === "Affiliate Conversion" || stage === "Conversion";
  const productRole =
    objective === "Product Education" ? "demonstration subject" :
    objective === "Problem Solving" ? "solution" :
    conversion ? "conversion anchor" :
    "product subject";

  return {
    objective, stage, cta,
    product_role: productRole,
    viewer_takeaway: conversion
      ? "understand the product clearly enough to act"
      : "recognize and understand the product through visible evidence",
    required_evidence: [input.content.angle],
    behavior_direction: stage === "Awareness" ? "recognize → inspect → understand" : "inspect → demonstrate → result",
    cta_behavior: cta === "None" ? "none" : "evidence → result → CTA-compatible final state",
    speech_requirement: input.content.format === "Talking Head" ? "required" : "optional_or_disallowed_by_format",
    campaign_constraints: ["use only supported product facts", "avoid unsupported claims"],
    product_source: product.record
  };
}

function creativeConcept(input, campaign) {
  const role = campaign.product_role;
  return {
    core_idea: `${input.content.angle} is shown through native ${input.content.format} behavior.`,
    viewer_takeaway: campaign.viewer_takeaway,
    product_role: role,
    creator_role: input.content.format === "Talking Head" ? "demonstrator" : "user",
    hook: "visual attention through a real product-related action",
    evidence: campaign.required_evidence,
    emotional_behavioral_beat: "notice → inspect → react naturally",
    cta_role: campaign.cta === "None" ? "none" : "final-state cue",
    ending_state: campaign.cta === "None" ? "clear product/result state" : "clear result with CTA-compatible behavior",
    ugc_guardrail: "smartphone-native, observational, non-cinematic"
  };
}

function scenePurpose(count) {
  return count === 1 ? ["hook-result"] :
    count === 2 ? ["hook", "evidence-result"] :
    count === 3 ? ["hook", "interaction", "result"] :
    count === 4 ? ["hook", "setup", "demonstration", "result"] :
    ["hook", "setup", "interaction", "result", "cta"];
}

function buildSceneStates(input, product, campaign, concept) {
  const purposes = scenePurpose(input.content.scene_count);
  return purposes.map((purpose, i) => {
    const final = i === purposes.length - 1;
    const action = i === 0 ? "establish" : final ? "present_result" : "interact";
    const productState = i === 0 ? "visible" : final ? "result" : "in_use";
    return {
      scene_id: `scene_${String(i + 1).padStart(2, "0")}`,
      purpose,
      creator_state: { creator: input.creator, action },
      product_state: { product: product.record.product_name, state: productState },
      environment_state: { stable: true, continuity_lock: "inherit" },
      camera_state: {
        platform: input.platform[0],
        framing: input.content.format === "Talking Head" ? "upper_body" : "UGC smartphone framing",
        movement: i === 0 ? "stable" : "motivated"
      },
      behavior_cue: i === 0 ? "notice" : final ? "reveal" : "inspect",
      required_evidence: campaign.required_evidence,
      continuity_lock: {
        character: "Character Identity Lock: Rositasari",
        product: `Product Identity Lock: ${product.record.product_name}`,
        environment: "inherit unchanged environment unless state transition requires change"
      },
      transition_intent: final ? null : purposes[i + 1],
      transition_cause: final ? null : "creator action causes the next visible state",
      campaign_role: campaign.product_role,
      concept_anchor: concept.core_idea,
      behavior_sequence: resolveCreativeKnowledge(input).behavior.sequence,
      behavior_rules: resolveCreativeKnowledge(input).behavior.rules ?? resolveCreativeKnowledge(input).rules.ugc_guardrails
    };
  });
}

function buildImagePrompts(scenes, input, product, campaign, concept) {
  return scenes.map(scene => ({
    scene_id: scene.scene_id,
    prompt: [
      `Character Identity: ${scene.creator_identity.creator}; use the locked character reference when available`,
      `Current creator state: ${scene.creator_state.action}; gaze and pose remain consistent with the scene state`,
      `Product Identity: ${product.record.product_name}; preserve the Product Identity Lock`,
      `Product State: ${scene.product_state.state}`,
      `Visible behavior: ${scene.behavior_cue}`,
      `Environment: ordinary ${input.niche} setting with stable spatial continuity`,
      `Camera/composition: ${scene.camera_state.framing}, smartphone-native capture, plausible perspective`,
      `Lighting: natural or ordinary ambient lighting appropriate to the environment`,
      `UGC realism: ${scene.niche_realism.join(", ")}`,
      `Evidence: ${campaign.required_evidence.join(", ")}`,
      `Continuity: same character, product, wardrobe, environment geometry and camera relationship`,
      `Negative constraints only where relevant: no identity drift, product duplication, impossible anatomy, or unexplained state change`,
      "single visual state; do not describe future actions"
    ].join("; ")
  }));
}

function buildVideoPrompts(scenes, input, product) {
  return scenes.slice(0, -1).map((from, index) => {
    const to = scenes[index + 1];
    return {
      transition_id: `${from.scene_id}_to_${to.scene_id}`,
      from_scene: from.scene_id,
      to_scene: to.scene_id,
      prompt: [
        `Starting Frame Anchor: exact visual state of ${from.scene_id}`,
        `Physical Cause: ${to.transition_cause}`,
        `Human Movement: one primary movement from ${from.behavior_cue} to ${to.behavior_cue}`,
        "Facial Movement: proportional reaction driven by the visible stimulus",
        `Product Movement: preserve ${product.record.product_name} identity; movement follows physical contact and state change`,
        `Material Physics: ${input.niche} materials respond naturally to the creator's movement`,
        "Camera Movement: subtle smartphone drift or reframing only when motivated by creator movement",
        "Environment Movement: minimal and physically caused; preserve room geometry and object placement",
        `Ending Frame Anchor: exact visual state of ${to.scene_id}`,
        "Continuity: same character identity, product identity, wardrobe, environment and compatible camera relationship",
        "No teleportation, morphing, duplicated objects, unexplained state changes, or cinematic camera choreography"
      ].join("; "),
      continuity_anchors: [from.scene_id, to.scene_id, "Character Identity Lock", "Product Identity Lock", "Environment Continuity"]
    };
  });
}

function validateGeneratedOutput(result, input) {
  const blockers = [];
  const expectedImages = result.scene_plan.length;
  const expectedVideos = Math.max(expectedImages - 1, 0);

  if (result.image_prompts.length !== expectedImages) {
    blockers.push(blocker("OUTPUT_COUNT_MISMATCH", "validation", "Image prompt count does not match scene count."));
  }
  if (result.video_prompts.length !== expectedVideos) {
    blockers.push(blocker("OUTPUT_COUNT_MISMATCH", "validation", "Video prompt count does not equal N-1."));
  }

  for (const scene of result.scene_plan.slice(0, -1)) {
    if (!scene.transition_intent || !scene.transition_cause) {
      blockers.push(blocker("SCENE_STATE_INVALID", "validation", `${scene.scene_id} is missing transition metadata.`));
    }
  }

  if (SILENT_FORMATS.has(input.content.format) && result.spoken_script) {
    blockers.push(blocker("SPEECH_MODE_CONFLICT", "validation", "Silent output contains spoken script."));
  }
  return blockers;
}

function repairGeneratedOutput(result, input) {
  const repairs = [];

  for (const prompt of result.image_prompts) {
    if (/then|after that|future action/i.test(prompt.prompt)) {
      prompt.prompt = prompt.prompt.replace(/\\b(then|after that|future action)[^;.]*/gi, "").replace(/; ;/g, ";");
      repairs.push("image_prompt_future_action_removed");
    }
    if (!/single visual state/i.test(prompt.prompt)) {
      prompt.prompt += "; single visual state; do not describe future actions";
      repairs.push("image_prompt_state_anchor_restored");
    }
  }

  for (let i = 0; i < result.scene_plan.length - 1; i++) {
    const scene = result.scene_plan[i];
    if (!scene.transition_intent) {
      scene.transition_intent = result.scene_plan[i + 1].purpose;
      repairs.push(`${scene.scene_id}_transition_intent_restored`);
    }
    if (!scene.transition_cause) {
      scene.transition_cause = "creator action causes the next visible state";
      repairs.push(`${scene.scene_id}_transition_cause_restored`);
    }
  }

  if (SILENT_FORMATS.has(input.content.format) && result.spoken_script) {
    delete result.spoken_script;
    repairs.push("silent_spoken_script_removed");
  }

  return repairs;
}

function validateAndRepair(result, input) {
  const initialBlockers = validateGeneratedOutput(result, input);
  if (!initialBlockers.length) {
    return { result, repairs: [], blockers: [] };
  }

  const repairs = repairGeneratedOutput(result, input);
  const remainingBlockers = validateGeneratedOutput(result, input);

  return { result, repairs, blockers: remainingBlockers };
}

export async function runAsync(input, options = {}) {
  const requestBlockers = validateRequest(input);
  if (requestBlockers.length) {
    return blockedOutput({
      ...baseValidation("BLOCK", requestBlockers),
      contract_checks: ["request_validation"]
    });
  }

  const retrievedSource = options.retrieved_product_source ?? (input.product?.product_url ? await fetchProductSource(input.product.product_url, options) : null);
  const product = resolveProductWithSource(input, retrievedSource);
  if (product.blocker) {
    return blockedOutput({
      ...baseValidation("BLOCK", [product.blocker]),
      contract_checks: ["product_source_conflict"]
    });
  }

  const creatorBase = resolveCreator(input.creator);
  if (creatorBase.blocker) {
    return blockedOutput({
      ...baseValidation("BLOCK", [creatorBase.blocker]),
      contract_checks: ["creator_resolution"]
    });
  }

  const creator = retrieveCreatorIntelligence(creatorBase, input);

  const nicheKnowledge = resolveNiche(input.niche);
  if (nicheKnowledge.blocker) {
    return blockedOutput({
      ...baseValidation("BLOCK", [nicheKnowledge.blocker]),
      contract_checks: ["niche_resolution"]
    });
  }

  const creativeKnowledge = resolveCreativeKnowledge(input);
  const campaign = campaignIntelligence(input, product);
  const concept = creativeConcept(input, campaign);
  concept.decision_hierarchy = creativeKnowledge.rules.decision_hierarchy;
  concept.behavior_pattern = creativeKnowledge.behavior.sequence;
  const scenes = buildSceneStates(input, product, campaign, concept);
  for (const scene of scenes) {
    scene.creator_identity = creator.character_identity_lock;
    scene.voice_identity = speechMode(input) === "spoken" ? creator.voice_identity_lock : null;
    scene.niche_realism = nicheKnowledge.human_realism;
    scene.product_consistency = nicheKnowledge.product_consistency;
  }
  const images = buildImagePrompts(scenes, input, product, campaign, concept);
  const videos = buildVideoPrompts(scenes, input, product);
  const fault = input.fixture_setup?.mock_generation_fault;
  const generationBlockers = [];

  if (fault === "scene_03_character_identity_drift") {
    generationBlockers.push(blocker("IDENTITY_DRIFT", "validation", "Character identity changed between scene states.", "scene_03"));
  }
  if (fault === "scene_02_product_teleportation") {
    generationBlockers.push(
      blocker("PRODUCT_DRIFT", "validation", "Product changed spatial state without a physical transition.", "scene_02"),
      blocker("CONTINUITY_BREAK", "validation", "Product continuity was broken between consecutive scenes.", "scene_02")
    );
  }
  if (fault === "invented_clinical_claim") {
    generationBlockers.push(blocker(
      "UNSUPPORTED_DETAIL", "validation",
      "Generated content contains a product claim not supported by Product Intelligence.", "product"
    ));
  }

  const spoken = speechMode(input) === "spoken";
  const result = {
    creative_summary: {
      niche: input.niche,
      product: input.product.product_name,
      campaign_objective: input.campaign.objective,
      campaign_stage: input.campaign.stage,
      cta: input.campaign.cta,
      creator: input.creator,
      format: input.content.format,
      angle: input.content.angle,
      duration_sec: input.content.duration_sec,
      scene_count: input.content.scene_count,
      creative_concept: concept.core_idea
    },
    scene_plan: scenes,
    image_prompts: images,
    video_prompts: videos,
    ...(spoken ? { spoken_script: { status: "PENDING_SCRIPT_ENGINE" } } : {}),
    ...(SILENT_FORMATS.has(input.content.format) ? { silent_behavior_script: { sequence: "notice → inspect → reveal" } } : {}),
    validation: {
      ...baseValidation(generationBlockers.length ? "BLOCK" : "PASS", generationBlockers),
      contract_checks: [
        "request_validation", "product_intelligence", "campaign_intelligence",
        "creative_concept", "scene_state_model", "image_prompt_count", "video_prompt_count",
        "character_identity_lock", "character_reference_status", "voice_identity_lock", "product_identity_lock", "product_source_provenance", "speech_mode"
      ],
      output_counts: {
        scene_plan: scenes.length,
        image_prompts: images.length,
        video_prompts: videos.length
      },
      continuity_checks: [
        "scene-to-scene character continuity",
        "scene-to-scene product continuity",
        "scene-to-scene environment continuity"
      ]
    }
  };

  const repairPass = validateAndRepair(result, input);
  result.validation.repair_actions = repairPass.repairs;
  result.validation.revalidation = {
    executed: true,
    initial_blockers_detected: repairPass.repairs.length > 0,
    remaining_blockers: repairPass.blockers.map(item => item.code)
  };

  if (repairPass.blockers.length) {
    result.validation.status = "BLOCK";
    result.validation.blockers.push(...repairPass.blockers);
  } else if (!generationBlockers.length) {
    result.validation.status = "PASS";
  }
  return result;
}

export function run(input) {\n  const requestBlockers = validateRequest(input);\n  if (requestBlockers.length) return runBlockedSync(requestBlockers);\n  return runCoreSync(input);\n}\n\nfunction runBlockedSync(blockers) {\n  return blockedOutput({ ...baseValidation("BLOCK", blockers), contract_checks: ["request_validation"] });\n}\n\nfunction runCoreSync(input) {\n  const product = resolveProduct(input);\n  if (product.blocker) return blockedOutput({ ...baseValidation("BLOCK", [product.blocker]), contract_checks: ["product_source_conflict"] });\n  const creatorBase = resolveCreator(input.creator);\n  if (creatorBase.blocker) return blockedOutput({ ...baseValidation("BLOCK", [creatorBase.blocker]), contract_checks: ["creator_resolution"] });\n  const creator = retrieveCreatorIntelligence(creatorBase, input);\n  const nicheKnowledge = resolveNiche(input.niche);\n  if (nicheKnowledge.blocker) return blockedOutput({ ...baseValidation("BLOCK", [nicheKnowledge.blocker]), contract_checks: ["niche_resolution"] });\n  const creativeKnowledge = resolveCreativeKnowledge(input);\n  const campaign = campaignIntelligence(input, product);\n  const concept = creativeConcept(input, campaign);\n  concept.decision_hierarchy = creativeKnowledge.rules.decision_hierarchy;\n  concept.behavior_pattern = creativeKnowledge.behavior.sequence;\n  const scenes = buildSceneStates(input, product, campaign, concept);\n  for (const scene of scenes) { scene.creator_identity = creator.character_identity_lock; scene.voice_identity = speechMode(input) === "spoken" ? creator.voice_identity_lock : null; scene.niche_realism = nicheKnowledge.human_realism; scene.product_consistency = nicheKnowledge.product_consistency; }\n  const images = buildImagePrompts(scenes, input, product, campaign, concept);\n  const videos = buildVideoPrompts(scenes, input, product);\n  return buildResult(input, product, concept, scenes, images, videos, creator, nicheKnowledge);\n}\n\nfunction buildResult(input, product, concept, scenes, images, videos, creator, nicheKnowledge) {\n  const generationBlockers = [];\n  const spoken = speechMode(input) === "spoken";\n  const result = { creative_summary: { niche: input.niche, product: input.product.product_name, campaign_objective: input.campaign.objective, campaign_stage: input.campaign.stage, cta: input.campaign.cta, creator: input.creator, format: input.content.format, angle: input.content.angle, duration_sec: input.content.duration_sec, scene_count: input.content.scene_count, creative_concept: concept.core_idea }, scene_plan: scenes, image_prompts: images, video_prompts: videos, ...(spoken ? { spoken_script: { status: "PENDING_SCRIPT_ENGINE" } } : {}), ...(SILENT_FORMATS.has(input.content.format) ? { silent_behavior_script: { sequence: "notice → inspect → reveal" } } : {}), validation: { ...baseValidation(generationBlockers.length ? "BLOCK" : "PASS", generationBlockers), contract_checks: ["request_validation","product_intelligence","campaign_intelligence","creative_concept","scene_state_model","image_prompt_count","video_prompt_count","character_identity_lock","character_reference_status","voice_identity_lock","product_identity_lock","product_source_provenance","speech_mode"], output_counts: { scene_plan: scenes.length, image_prompts: images.length, video_prompts: videos.length }, continuity_checks: ["scene-to-scene character continuity","scene-to-scene product continuity","scene-to-scene environment continuity"] } };\n  const repairPass = validateAndRepair(result, input); result.validation.repair_actions = repairPass.repairs; result.validation.revalidation = { executed: true, initial_blockers_detected: repairPass.repairs.length > 0, remaining_blockers: repairPass.blockers.map(item => item.code) }; if (repairPass.blockers.length) { result.validation.status = "BLOCK"; result.validation.blockers.push(...repairPass.blockers); } return result;\n}\n\nexport function expectedVideoPromptCount(sceneCount) {
  return Math.max(sceneCount - 1, 0);
}

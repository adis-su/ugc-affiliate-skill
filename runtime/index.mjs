import { resolveCreator } from "./knowledge/creator-library.mjs";
import { retrieveProductIntelligence, fetchProductSource, resolveProductWithSource } from "./intelligence/product-retrieval.mjs";
import { retrieveCreatorIntelligence } from "./intelligence/creator-retrieval.mjs";
import { resolveNiche, NICHE_KNOWLEDGE } from "./knowledge/niche-knowledge.mjs";
import { CAMPAIGN_OBJECTIVES, CAMPAIGN_STAGES, CTAS, FORMAT_ANGLES, PLATFORMS as KNOWLEDGE_PLATFORMS, SCENE_LIMITS, SILENT_FORMATS, resolveCreativeKnowledge, validateCampaignEnums } from "./knowledge/campaign-creative-behavior.mjs";

export const SUPPORTED_CREATORS = new Set(["Rositasari"]);
export const PLATFORMS = new Set(KNOWLEDGE_PLATFORMS);
export const NICHES = FORMAT_ANGLES;


function serializeCharacterIdentityLock(lock = {}) {
  const lines = [];
  const push = (label, value) => {
    if (value === null || value === undefined || value === "") return;
    if (Array.isArray(value)) { if (value.length) lines.push(label + ": " + value.join(", ")); return; }
    if (typeof value === "object") { for (const [key, nested] of Object.entries(value)) push(label + "." + key, nested); return; }
    lines.push(label + ": " + value);
  };
  push("Creator", lock.creator); push("Age", lock.age_appearance); push("Gender", lock.gender); push("Height", lock.height);
  push("Appearance", lock.appearance); push("Visual ethnicity", lock.ethnicity_style); push("Hijab", lock.hijab);
  push("Face", lock.face); push("Eyes", lock.eyes); push("Eyebrows", lock.eyebrows); push("Nose", lock.nose);
  push("Lips", lock.lips); push("Skin", lock.skin); push("Facial expression", lock.facial_expression);
  if (lock.reference) push("Character reference", lock.reference);
  return lines.join("; ");
}

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

const GOOGLE_FLOW_DURATIONS = [4, 6, 8, 10];

function planFlowClipDurations(totalDurationSec, transitionCount, allowedDurations = GOOGLE_FLOW_DURATIONS) {
  if (!Number.isInteger(totalDurationSec) || totalDurationSec <= 0) {
    return { status: "BLOCK", reason: "TOTAL_DURATION_INVALID", durations: [] };
  }
  if (transitionCount === 0) {
    return allowedDurations.includes(totalDurationSec)
      ? { status: "PASS", durations: [totalDurationSec], total_duration_sec: totalDurationSec }
      : { status: "BLOCK", reason: "TOTAL_DURATION_NOT_GENERATABLE", durations: [] };
  }
  const options = [...allowedDurations].sort((a, b) => a - b);
  const memo = new Map();
  function solve(remaining, slots) {
    const key = String(remaining) + ":" + String(slots);
    if (memo.has(key)) return memo.get(key);
    if (slots === 0) return remaining === 0 ? [] : null;
    if (remaining < options[0] * slots || remaining > options[options.length - 1] * slots) return null;
    const candidates = [];
    for (const duration of options) {
      const rest = solve(remaining - duration, slots - 1);
      if (rest) candidates.push([duration, ...rest]);
    }
    if (!candidates.length) {
      memo.set(key, null);
      return null;
    }
    candidates.sort((a, b) => {
      const spreadA = Math.max(...a) - Math.min(...a);
      const spreadB = Math.max(...b) - Math.min(...b);
      if (spreadA !== spreadB) return spreadA - spreadB;
      return a.join(",").localeCompare(b.join(","));
    });
    memo.set(key, candidates[0]);
    return candidates[0];
  }
  const durations = solve(totalDurationSec, transitionCount);
  if (!durations) return { status: "BLOCK", reason: "NO_EXACT_FLOW_PARTITION", durations: [], allowed_durations: options };
  return { status: "PASS", durations, allowed_durations: options, total_duration_sec: durations.reduce((sum, value) => sum + value, 0), transition_count: transitionCount };
}

function resolveFlowTimeline(input) {
  const sceneCount = input.content.scene_count;
  const transitionCount = Math.max(sceneCount - 1, 0);
  return {
    generator: "Google Flow",
    model_duration_options: GOOGLE_FLOW_DURATIONS,
    scene_count: sceneCount,
    transition_count: transitionCount,
    ...planFlowClipDurations(input.content.duration_sec, transitionCount)
  };
}

function isSpeechRequested(input) {
  return /speech|spoken|dialogue|lip-sync|voice[- ]?over/i.test(input?.content?.custom_instructions ?? "");
}

function speechMode(input) {
  if (input.content.format === "Talking Head") return "spoken";
  if (SILENT_FORMATS.has(input.content.format)) return "silent";
  return isSpeechRequested(input) ? "spoken" : "silent_or_optional";
}

function buildSpokenScript(input, scenes, campaign, creator) {
  const duration = input.content.duration_sec;
  const targetWords = Math.max(6, Math.floor(duration * 2.2));
  const evidence = campaign.required_evidence.join(", ");
  const voice = creator.voice_identity_lock;
  const lines = scenes.map((scene, index) => {
    const cue = index === 0 ? "hook" : index === scenes.length - 1 ? "result" : "evidence";
    const text = cue === "hook"
      ? `Ini ${input.product.product_name}, aku lagi lihat ${evidence}.`
      : cue === "result"
        ? `Hasilnya kelihatan jelas, jadi kamu bisa lihat produknya seperti apa.`
        : `Bagian ini yang paling kelihatan saat produknya dipakai.`;
    return { scene_id: scene.scene_id, text };
  });
  const wordCount = lines.reduce((sum, line) => sum + line.text.trim().split(/\s+/).length, 0);
  return {
    status: "READY",
    voice_identity_lock: voice,
    duration_sec: duration,
    target_word_count: targetWords,
    word_count: wordCount,
    duration_fit: wordCount <= Math.ceil(targetWords * 1.25),
    lines
  };
}

function buildSilentBehaviorScript(input, scenes) {
  return {
    sequence: scenes.map(scene => scene.behavior_cue).join(" → "),
    scenes: scenes.map(scene => ({
      scene_id: scene.scene_id,
      behavior: scene.behavior_cue,
      speech: "none",
      lip_sync: "none"
    }))
  };
}

function validateCreatorIdentity(creator, input) {
  const blockers = [];
  const speech = speechMode(input) === "spoken";
  if (!creator.character_identity_lock) {
    blockers.push(blocker("CREATOR_IDENTITY_INSUFFICIENT", "creator", "Character Identity is required for visual generation.", "creator_identity.character"));
  }
  if (speech && !creator.voice_identity_lock) {
    blockers.push(blocker("VOICE_IDENTITY_INSUFFICIENT", "creator", "Voice Identity is required when spoken content is generated.", "creator_identity.voice"));
  }
  return blockers;
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

  const flowTimeline = resolveFlowTimeline(input);
  if (flowTimeline.status === "BLOCK") {
    blockers.push(blocker(
      "INVALID_FLOW_TIMELINE", "duration-planning",
      `Target duration ${input.content.duration_sec}s cannot be partitioned into ${flowTimeline.transition_count} Google Flow transition clips using supported durations (4s, 6s, 8s, 10s).`,
      "content.duration_sec",
      "Reduce or merge scene boundaries, change the target duration, or use a supported generation workflow."
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
    character_identity_lock: serializeCharacterIdentityLock(scene.creator_identity),
    scene_id: scene.scene_id,
    continuity_anchors: [scene.scene_id, "Character Identity Lock", "Product Identity Lock", "Environment Continuity"],
    prompt: [
      `CHARACTER IDENTITY LOCK: Rositasari; preserve this exact canonical identity in every image generation; do not redesign, substitute, age, de-age, remove hijab, or alter facial, skin, body, or other defined identity attributes`,
      `Character Identity Reference: ${serializeCharacterIdentityLock(scene.creator_identity)}`,
      `Current creator state: ${scene.creator_state.action}; gaze and pose remain consistent with the scene state`,
      `Product Identity: ${product.record.product_name}; preserve the Product Identity Lock`,
      `Product State: ${scene.product_state.state}`,
      `Visible behavior: ${scene.behavior_cue}`,
      `Environment: ordinary ${input.niche} setting with stable spatial continuity`,
      `Camera/composition: ${scene.camera_state.framing}, smartphone-native capture, plausible perspective`,
      `Lighting: natural or ordinary ambient lighting appropriate to the environment`,
      `UGC realism: ${scene.niche_realism.join(", ")}`,
      `Evidence: ${campaign.required_evidence.join(", ")}`,
      `Continuity: same Rositasari Character Identity Lock across every scene, same product identity, wardrobe, environment geometry and camera relationship`,
      `Negative constraints only where relevant: no identity drift, product duplication, impossible anatomy, or unexplained state change`,
      "single visual state; do not describe future actions"
    ].join("; ")
  }));
}

function buildVideoPrompts(scenes, input, product, flowTimeline) {
  return scenes.slice(0, -1).map((from, index) => {
    const to = scenes[index + 1];
    return {
      character_identity_lock: serializeCharacterIdentityLock(from.creator_identity),
      transition_id: `${from.scene_id}_to_${to.scene_id}`,
      from_scene: from.scene_id,
      to_scene: to.scene_id,
      clip_id: "clip_" + String(index + 1).padStart(2, "0"),
      duration_sec: flowTimeline.durations[index],
      target_total_duration_sec: input.content.duration_sec,
      prompt: [
        `Clip: clip_${String(index + 1).padStart(2, "0")}`,
        `Duration: ${flowTimeline.durations[index]} seconds`,
        `Target Total Duration: ${input.content.duration_sec} seconds`,
        `CHARACTER IDENTITY LOCK: Rositasari; preserve this exact canonical identity throughout the entire clip; do not redesign, substitute, age, de-age, remove hijab, or alter facial, skin, body, or other defined identity attributes`,
        `Character Identity Reference: ${serializeCharacterIdentityLock(from.creator_identity)}`,
        `Starting Frame Anchor: exact visual state of ${from.scene_id}`,
        `Physical Cause: ${to.transition_cause}`,
        `Human Movement: one primary movement from ${from.behavior_cue} to ${to.behavior_cue}`,
        "Facial Movement: proportional reaction driven by the visible stimulus",
        `Product Movement: preserve ${product.record.product_name} identity; movement follows physical contact and state change`,
        `Material Physics: ${input.niche} materials respond naturally to the creator's movement`,
        "Camera Movement: subtle smartphone drift or reframing only when motivated by creator movement",
        "Environment Movement: minimal and physically caused; preserve room geometry and object placement",
        `Ending Frame Anchor: exact visual state of ${to.scene_id}`,
        "Continuity: same canonical Rositasari Character Identity Lock from start to end; preserve face, age, height, Southeast Asian visual appearance, hijab identity, facial features, skin characteristics, and other defined identity attributes; wardrobe may change only when explicitly required by the creative brief",
        "No teleportation, morphing, duplicated objects, unexplained state changes, or cinematic camera choreography"
      ].join("; "),
      continuity_anchors: [from.scene_id, to.scene_id, "Character Identity Lock", "Product Identity Lock", "Environment Continuity"]
    };
  });
}

function validatePromptSemantics(result, input) {
  const blockers = [];
  for (const image of result.image_prompts) {
    const required = ["Character Identity Lock:", "Product Identity:", "Product State:", "Visible behavior:", "Camera/composition:", "UGC realism:"];
    for (const token of required) if (!image.prompt.includes(token)) blockers.push(blocker("IMAGE_PROMPT_INVALID", "validation", `Image prompt ${image.scene_id} is missing ${token}`, image.scene_id));
    if (/then|after that|future action/i.test(image.prompt)) blockers.push(blocker("IMAGE_PROMPT_INVALID", "validation", `Image prompt ${image.scene_id} contains future-action language.`, image.scene_id));
    if (!/single visual state/i.test(image.prompt)) blockers.push(blocker("IMAGE_PROMPT_INVALID", "validation", `Image prompt ${image.scene_id} does not anchor a single visual state.`, image.scene_id));
  }
  for (const video of result.video_prompts) {
    const required = ["Starting Frame Anchor:", "Physical Cause:", "Human Movement:", "Product Movement:", "Material Physics:", "Camera Movement:", "Ending Frame Anchor:"];
    for (const token of required) if (!video.prompt.includes(token)) blockers.push(blocker("VIDEO_PROMPT_INVALID", "validation", `Video transition ${video.transition_id} is missing ${token}`, video.transition_id));
    if (video.continuity_anchors.length !== 5) blockers.push(blocker("VIDEO_PROMPT_INVALID", "validation", `Video transition ${video.transition_id} has invalid continuity anchors.`, video.transition_id));
  }
  return blockers;
}

function validateGeneratedOutput(result, input) {
  const blockers = [];
  blockers.push(...validatePromptSemantics(result, input));
  const expectedImages = result.scene_plan.length;
  const expectedVideos = Math.max(expectedImages - 1, 0);

  if (!result.flow_timeline || result.flow_timeline.status !== "PASS") {
    blockers.push(blocker("INVALID_FLOW_TIMELINE", "validation", "Flow clip duration plan is missing or invalid."));
  } else {
    const clipSum = result.flow_timeline.durations.reduce((sum, value) => sum + value, 0);
    if (clipSum !== input.content.duration_sec) {
      blockers.push(blocker("FLOW_DURATION_MISMATCH", "validation", "Flow clip durations do not equal the requested total duration.", "content.duration_sec"));
    }
    if (result.flow_timeline.durations.length !== expectedVideos && expectedImages > 1) {
      blockers.push(blocker("FLOW_CLIP_COUNT_MISMATCH", "validation", "Flow clip count does not match the number of scene transitions."));
    }
  }

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

const AUTO_REPAIRABLE = new Set([
  "IMAGE_PROMPT_INVALID",
  "SCENE_STATE_INVALID",
  "SPEECH_MODE_CONFLICT"
]);

const NON_REPAIRABLE = new Set([
  "IDENTITY_DRIFT",
  "PRODUCT_DRIFT",
  "CONTINUITY_BREAK",
  "UNSUPPORTED_DETAIL",
  "PRODUCT_CONFLICT",
  "CREATOR_IDENTITY_INSUFFICIENT",
  "VOICE_IDENTITY_INSUFFICIENT"
]);

function validateAndRepair(result, input) {
  const generatedBlockers = validateGeneratedOutput(result, input);
  const existingBlockers = Array.isArray(result.validation?.blockers) ? result.validation.blockers : [];
  const initialBlockers = [...existingBlockers, ...generatedBlockers];
  if (!initialBlockers.length) {
    return { result, repairs: [], blockers: [], initialBlockers: [] };
  }

  const repairable = initialBlockers.filter(item => AUTO_REPAIRABLE.has(item.code));
  const nonRepairable = initialBlockers.filter(item => NON_REPAIRABLE.has(item.code) || !AUTO_REPAIRABLE.has(item.code));
  const repairs = repairable.length ? repairGeneratedOutput(result, input) : [];
  const remainingBlockers = validateGeneratedOutput(result, input);

  return {
    result,
    repairs,
    blockers: [...nonRepairable, ...remainingBlockers.filter(item => !nonRepairable.some(blockerItem => blockerItem.code === item.code))],
    initialBlockers
  };
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
  const creatorBlockers = validateCreatorIdentity(creator, input);
  if (creatorBlockers.length) return blockedOutput({ ...baseValidation("BLOCK", creatorBlockers), contract_checks: ["creator_identity_resolution"] });

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
    scene.product_identity = product.identity_lock;
    scene.voice_identity = speechMode(input) === "spoken" ? creator.voice_identity_lock : null;
    scene.niche_realism = nicheKnowledge.human_realism;
    scene.product_consistency = nicheKnowledge.product_consistency;
  }
  const images = buildImagePrompts(scenes, input, product, campaign, concept);
  const flowTimeline = resolveFlowTimeline(input);
  const videos = buildVideoPrompts(scenes, input, product, flowTimeline);
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
    flow_timeline: flowTimeline,
    ...(spoken ? { spoken_script: buildSpokenScript(input, scenes, campaignIntelligence(input, product), creator) } : {}),
    ...(SILENT_FORMATS.has(input.content.format) ? { silent_behavior_script: buildSilentBehaviorScript(input, scenes) } : {}),
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
        video_prompts: videos.length,
        flow_clips: flowTimeline.durations.length
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
    initial_blockers_detected: repairPass.initialBlockers.length > 0,
    initial_blocker_codes: repairPass.initialBlockers.map(item => item.code),
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

export function run(input) {
  const requestBlockers = validateRequest(input);
  if (requestBlockers.length) return runBlockedSync(requestBlockers);
  return runCoreSync(input);
}

function runBlockedSync(blockers) {
  return blockedOutput({ ...baseValidation("BLOCK", blockers), contract_checks: ["request_validation"] });
}

function runCoreSync(input) {
  const product = resolveProduct(input);
  if (product.blocker) return blockedOutput({ ...baseValidation("BLOCK", [product.blocker]), contract_checks: ["product_source_conflict"] });
  const creatorBase = resolveCreator(input.creator);
  if (creatorBase.blocker) return blockedOutput({ ...baseValidation("BLOCK", [creatorBase.blocker]), contract_checks: ["creator_resolution"] });
  const creator = retrieveCreatorIntelligence(creatorBase, input);
  const creatorBlockers = validateCreatorIdentity(creator, input);
  if (creatorBlockers.length) return blockedOutput({ ...baseValidation("BLOCK", creatorBlockers), contract_checks: ["creator_identity_resolution"] });
  const nicheKnowledge = resolveNiche(input.niche);
  if (nicheKnowledge.blocker) return blockedOutput({ ...baseValidation("BLOCK", [nicheKnowledge.blocker]), contract_checks: ["niche_resolution"] });
  const creativeKnowledge = resolveCreativeKnowledge(input);
  const campaign = campaignIntelligence(input, product);
  const concept = creativeConcept(input, campaign);
  concept.decision_hierarchy = creativeKnowledge.rules.decision_hierarchy;
  concept.behavior_pattern = creativeKnowledge.behavior.sequence;
  const scenes = buildSceneStates(input, product, campaign, concept);
  for (const scene of scenes) { scene.creator_identity = creator.character_identity_lock; scene.voice_identity = speechMode(input) === "spoken" ? creator.voice_identity_lock : null; scene.niche_realism = nicheKnowledge.human_realism; scene.product_consistency = nicheKnowledge.product_consistency; }
  const images = buildImagePrompts(scenes, input, product, campaign, concept);
  const flowTimeline = resolveFlowTimeline(input);
  const videos = buildVideoPrompts(scenes, input, product, flowTimeline);
  return buildResult(input, product, concept, scenes, images, videos, creator, nicheKnowledge, flowTimeline);
}

function buildResult(input, product, concept, scenes, images, videos, creator, nicheKnowledge, flowTimeline) {
  const generationBlockers = [];
  const spoken = speechMode(input) === "spoken";
  if (input.fixture_setup?.mock_generation_fault === "scene_03_character_identity_drift") generationBlockers.push(blocker("IDENTITY_DRIFT", "validation", "Character identity changed between scene states.", "scene_03"));
  if (input.fixture_setup?.mock_generation_fault === "scene_02_product_teleportation") {
    generationBlockers.push(blocker("PRODUCT_DRIFT", "validation", "Product changed spatial state without a physical transition.", "scene_02"));
    generationBlockers.push(blocker("CONTINUITY_BREAK", "validation", "Product continuity was broken between consecutive scenes.", "scene_02"));
  }
  if (input.fixture_setup?.mock_generation_fault === "invented_clinical_claim") generationBlockers.push(blocker("UNSUPPORTED_DETAIL", "validation", "Generated content contains a product claim not supported by Product Intelligence.", "product"));

  const result = { flow_timeline: flowTimeline, creative_summary: { niche: input.niche, product: input.product.product_name, campaign_objective: input.campaign.objective, campaign_stage: input.campaign.stage, cta: input.campaign.cta, creator: input.creator, format: input.content.format, angle: input.content.angle, duration_sec: input.content.duration_sec, scene_count: input.content.scene_count, creative_concept: concept.core_idea }, scene_plan: scenes, image_prompts: images, video_prompts: videos, ...(spoken ? { spoken_script: buildSpokenScript(input, scenes, campaign, creator) } : {}), ...(SILENT_FORMATS.has(input.content.format) ? { silent_behavior_script: buildSilentBehaviorScript(input, scenes) } : {}), validation: { ...baseValidation(generationBlockers.length ? "BLOCK" : "PASS", generationBlockers), contract_checks: ["request_validation","product_intelligence","campaign_intelligence","creative_concept","scene_state_model","image_prompt_count","video_prompt_count","character_identity_lock","character_reference_status","voice_identity_lock","product_identity_lock","product_source_provenance","speech_mode"], output_counts: { scene_plan: scenes.length, image_prompts: images.length, video_prompts: videos.length, flow_clips: flowTimeline.durations.length }, continuity_checks: ["scene-to-scene character continuity","scene-to-scene product continuity","scene-to-scene environment continuity"] } };
  const repairPass = validateAndRepair(result, input); result.validation.repair_actions = repairPass.repairs; result.validation.revalidation = { executed: true, initial_blockers_detected: repairPass.initialBlockers.length > 0, remaining_blockers: repairPass.blockers.map(item => item.code) }; if (repairPass.blockers.length) { result.validation.status = "BLOCK"; result.validation.blockers.push(...repairPass.blockers); } return result;
}

export function expectedVideoPromptCount(sceneCount) {
  return Math.max(sceneCount - 1, 0);
}


export const AFFILIX_STAGES = Object.freeze({
  IDLE: "IDLE",
  WAITING_PRODUCT_URL: "WAITING_PRODUCT_URL",
  PRODUCT_RESOLUTION: "PRODUCT_RESOLUTION",
  CAMPAIGN_CONFIGURATION: "CAMPAIGN_CONFIGURATION",
  CONFIGURATION_VALIDATION: "CONFIGURATION_VALIDATION",
  PRODUCTION: "PRODUCTION",
  FINAL_OUTPUT: "FINAL_OUTPUT"
});

export const AFFILIX_CONFIG_DEFAULTS = Object.freeze({
  objective: null,
  format: "Product Demo",
  angle: "How I Use It",
  platform: "TikTok",
  cta: "Check the Product",
  creator: "Rositasari",
  speech: "Spoken"
});

const AFFILIX_OBJECTIVE_ALIASES = Object.freeze({
  Awareness: "Product Awareness",
  Consideration: "Product Consideration",
  Conversion: "Affiliate Conversion"
});

const AFFILIX_CTA_ALIASES = Object.freeze({
  "Check Product": "Check the Product",
  "See Details": "View Product",
  "No CTA": "None"
});

function normalizeAffilixValue(field, value) {
  if (value === undefined || value === null || value === "") return value;
  if (field === "objective") return AFFILIX_OBJECTIVE_ALIASES[value] ?? value;
  if (field === "cta") return AFFILIX_CTA_ALIASES[value] ?? value;
  return value;
}

export function createAffilixSession() {
  return {
    active: false,
    stage: AFFILIX_STAGES.IDLE,
    product: { url: null, status: "UNRESOLVED", intelligence: null },
    campaign: { ...AFFILIX_CONFIG_DEFAULTS },
    blockers: [],
    warnings: []
  };
}

export function activateAffilixSession(session = createAffilixSession()) {
  return {
    ...session,
    active: true,
    stage: AFFILIX_STAGES.WAITING_PRODUCT_URL,
    blockers: [],
    warnings: []
  };
}

export function applyAffilixCampaignConfig(session, changes = {}) {
  const campaign = { ...session.campaign };
  for (const [field, value] of Object.entries(changes)) {
    if (Object.prototype.hasOwnProperty.call(campaign, field) && value !== undefined) {
      campaign[field] = normalizeAffilixValue(field, value);
    }
  }
  return { ...session, campaign, stage: AFFILIX_STAGES.CONFIGURATION_VALIDATION };
}

export function validateAffilixCampaignConfig(session) {
  const campaign = session.campaign;
  const blockers = [];
  if (!campaign.objective) blockers.push(blocker("MISSING_REQUIRED_FIELD", "campaign", "Campaign Objective is required.", "campaign.objective"));
  if (!campaign.format) blockers.push(blocker("MISSING_REQUIRED_FIELD", "campaign", "Format is required.", "campaign.format"));
  if (!campaign.angle) blockers.push(blocker("MISSING_REQUIRED_FIELD", "campaign", "Angle is required.", "campaign.angle"));
  if (!campaign.platform) blockers.push(blocker("MISSING_REQUIRED_FIELD", "campaign", "Platform is required.", "campaign.platform"));
  if (!campaign.cta) blockers.push(blocker("MISSING_REQUIRED_FIELD", "campaign", "CTA is required.", "campaign.cta"));
  if (!campaign.creator) blockers.push(blocker("MISSING_REQUIRED_FIELD", "campaign", "Creator is required.", "campaign.creator"));
  if (!campaign.speech) blockers.push(blocker("MISSING_REQUIRED_FIELD", "campaign", "Speech is required.", "campaign.speech"));
  if (campaign.creator && !SUPPORTED_CREATORS.has(campaign.creator)) blockers.push(blocker("CREATOR_NOT_FOUND", "campaign", "Creator is not available in the Creator Library.", "campaign.creator"));
  if (campaign.platform && !PLATFORMS.has(campaign.platform)) blockers.push(blocker("INVALID_ENUM", "campaign", "Unsupported platform: " + campaign.platform, "campaign.platform"));
  if (campaign.objective && !CAMPAIGN_OBJECTIVES.includes(campaign.objective)) blockers.push(blocker("INVALID_ENUM", "campaign", "Unsupported campaign objective: " + campaign.objective, "campaign.objective"));
  if (campaign.cta && !CTAS.includes(campaign.cta)) blockers.push(blocker("INVALID_ENUM", "campaign", "Unsupported CTA: " + campaign.cta, "campaign.cta"));
  if (campaign.speech === "Silent" && campaign.format === "Talking Head") blockers.push(blocker("SPEECH_MODE_CONFLICT", "campaign", "Talking Head requires spoken delivery.", "campaign.speech"));
  if (campaign.speech === "Spoken" && SILENT_FORMATS.has(campaign.format)) blockers.push(blocker("SPEECH_MODE_CONFLICT", "campaign", "The selected format is silent and cannot use spoken delivery.", "campaign.speech"));
  return { status: blockers.length ? "BLOCK" : "PASS", blockers };
}

export async function resolveAffilixProductUrl(session, productUrl, options = {}) {
  const next = {
    ...session,
    active: true,
    stage: AFFILIX_STAGES.PRODUCT_RESOLUTION,
    product: { url: productUrl ?? null, status: "UNRESOLVED", intelligence: null },
    blockers: [],
    warnings: []
  };
  const source = await fetchProductSource(productUrl, options);
  if (source.status !== "RESOLVED") {
    return {
      ...next,
      stage: AFFILIX_STAGES.WAITING_PRODUCT_URL,
      product: { ...next.product, status: source.status },
      blockers: [blocker("PRODUCT_INSUFFICIENT", "product", "Product URL could not be resolved sufficiently.", "product.url", "Provide an accessible product URL or reliable product facts.")]
    };
  }
  const input = { product: { product_name: null, product_url: productUrl, retrieved_facts: source.facts } };
  const intelligence = resolveProductWithSource(input, source);
  return {
    ...next,
    stage: AFFILIX_STAGES.CAMPAIGN_CONFIGURATION,
    product: { url: productUrl, status: "RESOLVED", intelligence },
    campaign: { ...AFFILIX_CONFIG_DEFAULTS },
    blockers: [],
    warnings: []
  };
}

export function finalizeAffilixConfiguration(session) {
  const checked = validateAffilixCampaignConfig(session);
  return {
    ...session,
    stage: checked.status === "PASS" ? AFFILIX_STAGES.PRODUCTION : AFFILIX_STAGES.CAMPAIGN_CONFIGURATION,
    blockers: checked.blockers,
    warnings: []
  };
}

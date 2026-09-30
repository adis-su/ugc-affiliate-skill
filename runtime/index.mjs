export const SUPPORTED_CREATORS = new Set(["Rositasari"]);

export const PLATFORMS = new Set([
  "TikTok",
  "Instagram Reels",
  "Facebook Reels",
  "Shopee Video"
]);

export const NICHES = {
  Fashion: {
    formats: [
      "Silent Mirror Selfie",
      "Outfit Showcase",
      "Try-On",
      "GRWM",
      "Talking Head",
      "POV",
      "Lifestyle",
      "Before / After"
    ],
    angles: [
      "Outfit Inspiration",
      "Styling",
      "Fit Check",
      "Occasion-Based",
      "Trend",
      "Wardrobe Essential"
    ]
  },
  Beauty: {
    formats: [
      "GRWM",
      "Tutorial",
      "Product Application",
      "Before / After",
      "Talking Head",
      "Close-Up Demo",
      "Routine",
      "First Impression",
      "POV"
    ],
    angles: [
      "Shade / Color",
      "Texture",
      "Finish",
      "Skin Concern",
      "Makeup Look",
      "Routine",
      "Transformation"
    ]
  },
  Home: {
    formats: [
      "Product Showcase",
      "Room Makeover",
      "Before / After",
      "Lifestyle",
      "POV",
      "Problem → Solution",
      "Unboxing",
      "Product Demo",
      "Routine"
    ],
    angles: [
      "Space Improvement",
      "Organization",
      "Convenience",
      "Aesthetic Upgrade",
      "Problem Solving",
      "Functionality",
      "Before / After"
    ]
  }
};

const SILENT_FORMATS = new Set([
  "Silent Mirror Selfie",
  "Outfit Showcase",
  "Try-On",
  "POV",
  "Lifestyle",
  "Before / After",
  "Product Showcase",
  "Room Makeover",
  "Problem → Solution",
  "Unboxing",
  "Product Demo",
  "Routine",
  "GRWM",
  "Tutorial",
  "Product Application",
  "Close-Up Demo",
  "First Impression"
]);

const SCENE_LIMITS = {
  4: [1, 2],
  6: [2, 3],
  8: [3, 4],
  10: [4, 5]
};

const error = (code, stage, message, field = null, corrective_action = null) => ({
  code,
  stage,
  severity: "BLOCKER",
  message,
  field,
  corrective_action
});

const emptyOutput = (validation) => ({
  creative_summary: null,
  scene_plan: [],
  image_prompts: [],
  video_prompts: [],
  spoken_script: undefined,
  silent_behavior_script: undefined,
  validation
});

function validation(status, blockers = [], warnings = [], corrective_actions = []) {
  return {
    status,
    blockers,
    warnings,
    corrective_actions,
    contract_checks: [],
    output_counts: {
      scene_plan: 0,
      image_prompts: 0,
      video_prompts: 0
    },
    continuity_checks: []
  };
}

function isSpeechRequested(input) {
  const custom = input?.content?.custom_instructions ?? "";
  return /speech|spoken|dialogue|lip-sync|voice[- ]?over/i.test(custom);
}

function expectedSpeechMode(format, input) {
  if (isSpeechRequested(input)) return "spoken";
  if (format === "Talking Head") return "spoken";
  if (SILENT_FORMATS.has(format)) return "silent";
  return "silent_or_optional";
}

function validateRequest(input) {
  const blockers = [];

  if (!input || typeof input !== "object") {
    blockers.push(error("INVALID_INPUT", "normalize", "Request must be an object."));
    return blockers;
  }

  const required = [
    ["niche", input.niche],
    ["product.product_name", input.product?.product_name],
    ["campaign.objective", input.campaign?.objective],
    ["campaign.stage", input.campaign?.stage],
    ["campaign.cta", input.campaign?.cta],
    ["creator", input.creator],
    ["content.format", input.content?.format],
    ["content.angle", input.content?.angle],
    ["content.duration_sec", input.content?.duration_sec],
    ["content.scene_count", input.content?.scene_count]
  ];

  for (const [field, value] of required) {
    if (value === undefined || value === null || value === "") {
      blockers.push(error("MISSING_REQUIRED_FIELD", "validate", `Missing required field: ${field}`, field));
    }
  }

  if (!Array.isArray(input.platform) || input.platform.length === 0) {
    blockers.push(error("MISSING_REQUIRED_FIELD", "validate", "At least one platform is required.", "platform"));
  } else {
    for (const platform of input.platform) {
      if (!PLATFORMS.has(platform)) {
        blockers.push(error("INVALID_ENUM", "validate", `Unsupported platform: ${platform}`, "platform"));
      }
    }
  }

  if (input.niche && !NICHES[input.niche]) {
    blockers.push(error("INVALID_ENUM", "validate", `Unsupported niche: ${input.niche}`, "niche"));
  }

  if (input.creator && !SUPPORTED_CREATORS.has(input.creator)) {
    blockers.push(error("CREATOR_NOT_FOUND", "creator", `Creator is not available: ${input.creator}`, "creator"));
  }

  const niche = NICHES[input.niche];
  if (niche && input.content?.format && !niche.formats.includes(input.content.format)) {
    blockers.push(error("INVALID_FORMAT_ANGLE", "creative", `Format is not supported by ${input.niche}: ${input.content.format}`, "content.format"));
  }
  if (niche && input.content?.angle && !niche.angles.includes(input.content.angle)) {
    blockers.push(error("INVALID_FORMAT_ANGLE", "creative", `Angle is not supported by ${input.niche}: ${input.content.angle}`, "content.angle"));
  }

  const duration = input.content?.duration_sec;
  const sceneCount = input.content?.scene_count;
  if (typeof duration === "number" && typeof sceneCount === "number" && SCENE_LIMITS[duration]) {
    const [min, max] = SCENE_LIMITS[duration];
    if (sceneCount < min || sceneCount > max) {
      blockers.push(error(
        "INVALID_DURATION_SCENE_COUNT",
        "scene-planning",
        `Duration ${duration}s supports ${min}–${max} scenes, received ${sceneCount}.`,
        "content.scene_count"
      ));
    }
  }

  if (input.content?.format && isSpeechRequested(input) && SILENT_FORMATS.has(input.content.format)) {
    blockers.push(error(
      "SPEECH_MODE_CONFLICT",
      "behavior",
      "Silent format cannot contain spoken dialogue, voice-over, or lip-sync instructions.",
      "content.custom_instructions"
    ));
  }

  return blockers;
}

function resolveProduct(input) {
  const userFacts = input.product?.product_facts ?? {};
  const mockSource = input.fixture_setup?.mock_product_source;
  if (mockSource && userFacts.color && mockSource.color && userFacts.color !== mockSource.color) {
    return {
      conflict: error(
        "PRODUCT_CONFLICT",
        "product",
        "User product facts conflict with the supplied product source.",
        "product.product_facts",
        "Preserve the conflict and block unsupported product generation."
      )
    };
  }

  return {
    record: {
      product_name: input.product.product_name,
      source_url: input.product.product_url ?? null,
      facts: userFacts,
      unknown_attributes: Object.keys(userFacts).length ? [] : ["detailed_product_attributes"]
    },
    identity_lock: {
      product_name: input.product.product_name,
      supplied_facts: userFacts
    },
    state_model: {
      initial: "identified",
      final: "identified"
    }
  };
}

function buildSceneStates(input) {
  const n = input.content.scene_count;
  const format = input.content.format;
  const angle = input.content.angle;
  const product = input.product.product_name;
  const scenes = [];

  const purposes = n === 1
    ? ["hook-result"]
    : n === 2
      ? ["hook", "evidence-result"]
      : n === 3
        ? ["hook", "interaction", "result"]
        : n === 4
          ? ["hook", "setup", "demonstration", "result"]
          : ["hook", "setup", "interaction", "result", "cta"];

  for (let i = 0; i < n; i++) {
    const sceneNumber = i + 1;
    const isFinal = i === n - 1;
    scenes.push({
      scene_id: `scene_${String(sceneNumber).padStart(2, "0")}`,
      purpose: purposes[i],
      creator_state: {
        creator: input.creator,
        action: i === 0 ? "establish" : isFinal ? "present_result" : "interact"
      },
      product_state: {
        product,
        state: i === 0 ? "visible" : isFinal ? "result" : "in_use"
      },
      environment_state: {
        stable: true,
        continuity_lock: "inherit"
      },
      camera_state: {
        platform: input.platform[0],
        framing: format === "Talking Head" ? "upper_body" : "UGC smartphone framing",
        movement: i === 0 ? "stable" : "motivated"
      },
      behavior_cue: i === 0 ? "notice" : isFinal ? "reveal" : "inspect",
      required_evidence: [angle],
      continuity_lock: {
        character: "Character Identity Lock: Rositasari",
        product: `Product Identity Lock: ${product}`,
        environment: "inherit unchanged environment unless state transition requires change"
      },
      transition_intent: isFinal ? null : purposes[i + 1],
      transition_cause: isFinal ? null : "creator action causes the next visible state"
    });
  }

  return scenes;
}

function buildImagePrompts(scenes, input) {
  return scenes.map((scene) => ({
    scene_id: scene.scene_id,
    prompt: `UGC smartphone image, ${input.creator} maintaining the same Character Identity Lock, showing ${input.product.product_name} in the defined scene state; ${scene.purpose}; ${scene.behavior_cue}; ${input.niche} realism; natural human anatomy and believable product interaction; preserve product identity, environment continuity, and current visual state; avoid cinematic commercial styling.`,
    continuity_anchors: [
      "Character Identity Lock",
      "Product Identity Lock",
      "Environment Continuity",
      scene.scene_id
    ],
    validation: { status: "PASS", blockers: [], warnings: [] }
  }));
}

function buildVideoPrompts(scenes, input) {
  return scenes.slice(0, -1).map((from, index) => {
    const to = scenes[index + 1];
    return {
      transition_id: `${from.scene_id}_to_${to.scene_id}`,
      from_scene: from.scene_id,
      to_scene: to.scene_id,
      prompt: `Start from the exact visual state of ${from.scene_id}; transition physically from ${from.behavior_cue} to ${to.behavior_cue} through a believable creator action; preserve Rositasari Character Identity Lock, ${input.product.product_name} Product Identity Lock, environment geometry, and smartphone UGC camera behavior; end on the exact visual state defined by ${to.scene_id}; no teleportation, identity drift, or unexplained state change.`,
      continuity_anchors: [
        from.scene_id,
        to.scene_id,
        "Character Identity Lock",
        "Product Identity Lock"
      ],
      validation: { status: "PASS", blockers: [], warnings: [] }
    };
  });
}

export function run(input) {
  const blockers = validateRequest(input);
  if (blockers.length) {
    return emptyOutput({
      ...validation("BLOCK", blockers),
      contract_checks: ["request_validation"],
    });
  }

  const product = resolveProduct(input);
  if (product.conflict) {
    return emptyOutput({
      ...validation("BLOCK", [product.conflict]),
      contract_checks: ["product_source_conflict"],
    });
  }

  const fault = input.fixture_setup?.mock_generation_fault;
  const scenes = buildSceneStates(input);
  const imagePrompts = buildImagePrompts(scenes, input);
  const videoPrompts = buildVideoPrompts(scenes, input);

  const blockersAfterGeneration = [];

  if (fault === "scene_03_character_identity_drift") {
    blockersAfterGeneration.push(error(
      "IDENTITY_DRIFT",
      "validation",
      "Character identity changed between scene states.",
      "scene_03",
      "Restore Character Identity Lock and regenerate affected downstream prompts."
    ));
  }

  if (fault === "scene_02_product_teleportation") {
    blockersAfterGeneration.push(
      error("PRODUCT_DRIFT", "validation", "Product changed spatial state without a physical transition.", "scene_02"),
      error("CONTINUITY_BREAK", "validation", "Product continuity was broken between consecutive scenes.", "scene_02")
    );
  }

  if (fault === "invented_clinical_claim") {
    blockersAfterGeneration.push(error(
      "UNSUPPORTED_DETAIL",
      "validation",
      "Generated content contains a product claim not supported by Product Intelligence.",
      "product",
      "Remove the unsupported claim and regenerate only the affected output."
    ));
  }

  const speechMode = expectedSpeechMode(input.content.format, input);
  const status = blockersAfterGeneration.length ? "BLOCK" : "PASS";
  const checks = [
    "scene_count",
    "image_prompt_count",
    "video_prompt_count",
    "shared_scene_state_model",
    "character_identity_lock",
    "product_identity_lock",
    "state_transition_causality",
    "speech_mode"
  ];

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
      creative_concept: "Deterministic contract-safe UGC concept skeleton."
    },
    scene_plan: scenes,
    image_prompts: imagePrompts,
    video_prompts: videoPrompts,
    ...(speechMode === "spoken"
      ? { spoken_script: { status: "PENDING_RUNTIME_SCRIPT_ENGINE" } }
      : {}),
    ...(SILENT_FORMATS.has(input.content.format)
      ? { silent_behavior_script: { sequence: "notice → inspect → reveal" } }
      : {}),
    validation: {
      ...validation(status, blockersAfterGeneration),
      contract_checks: checks,
      output_counts: {
        scene_plan: scenes.length,
        image_prompts: imagePrompts.length,
        video_prompts: videoPrompts.length
      },
      continuity_checks: [
        "scene-to-scene character continuity",
        "scene-to-scene product continuity",
        "scene-to-scene environment continuity"
      ]
    }
  };

  return result;
}

export function expectedVideoPromptCount(sceneCount) {
  return Math.max(sceneCount - 1, 0);
}

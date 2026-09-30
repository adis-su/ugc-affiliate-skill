const RETRYABLE_CODES = new Set([
  "REQUEST_FAILED",
  "RESPONSE_INVALID",
  "ASSET_MISSING",
  "PACING_DRIFT",
  "PROSODY_DRIFT",
  "PRONUNCIATION_DRIFT",
  "SYNTHETIC_ARTIFACT",
  "VOICE_CONTINUITY_BREAK"
]);

const NON_RETRYABLE_CODES = new Set([
  "VOICE_REFERENCE_INVALID",
  "VOICE_IDENTITY_DRIFT"
]);

export function classifyVoiceRegeneration(blockers = []) {
  const codes = blockers.map((item) => item?.code).filter(Boolean);
  if (codes.some((code) => NON_RETRYABLE_CODES.has(code))) {
    return { retryable: false, reason: "NON_RETRYABLE_VOICE_CONTRACT_FAILURE", codes };
  }
  const retryableCodes = codes.filter((code) => RETRYABLE_CODES.has(code));
  return {
    retryable: retryableCodes.length > 0,
    reason: retryableCodes.length ? "VOICE_QUALITY_OR_TRANSIENT_FAILURE" : "NO_RETRYABLE_FAILURE",
    codes
  };
}

export function createVoiceRegenerationPlan({ request, validation, attempt = 1, max_retries = 2 } = {}) {
  const classification = classifyVoiceRegeneration(validation?.blockers ?? []);
  const canRetry = classification.retryable && attempt <= max_retries;

  return {
    status: canRetry ? "RETRY" : "FINAL_BLOCK",
    attempt,
    max_retries,
    classification,
    preserved: {
      request_id: request?.request_id ?? null,
      scene_id: request?.scene_id ?? null,
      text: request?.text ?? null,
      voice_reference_ids: (request?.references ?? [])
        .filter((reference) => reference?.type === "voice")
        .map((reference) => reference.id ?? reference.uri)
        .filter(Boolean)
    },
    blocker: canRetry ? null : {
      code: "VOICE_REGENERATION_EXHAUSTED",
      stage: "voice_regeneration",
      severity: "BLOCKER",
      message: "Voice generation failed validation and no further retry is permitted."
    }
  };
}

export async function generateVoiceWithRetry({ generate, validate, request, max_retries = 2 } = {}) {
  if (typeof generate !== "function" || typeof validate !== "function") {
    return {
      status: "BLOCK",
      error: {
        code: "VOICE_REGENERATION_PIPELINE_INVALID",
        stage: "voice_regeneration",
        severity: "BLOCKER",
        message: "Voice retry pipeline requires generate and validate functions."
      }
    };
  }

  for (let attempt = 1; attempt <= max_retries + 1; attempt += 1) {
    const asset = await generate({ ...request, attempt });
    const validation = await validate(asset, request);

    if (validation?.status === "PASS") {
      return { status: "ACCEPTED", attempt, asset, validation };
    }

    const plan = createVoiceRegenerationPlan({ request, validation, attempt, max_retries });
    if (plan.status === "FINAL_BLOCK") {
      return { status: "BLOCK", attempt, asset: null, validation, regeneration: plan };
    }
  }

  return {
    status: "BLOCK",
    error: {
      code: "VOICE_REGENERATION_EXHAUSTED",
      stage: "voice_regeneration",
      severity: "BLOCKER",
      message: "Voice generation retry limit was exhausted."
    }
  };
}

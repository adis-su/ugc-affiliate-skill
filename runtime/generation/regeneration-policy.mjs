const RETRYABLE_CODES = new Set([
  "REQUEST_FAILED",
  "RESPONSE_INVALID",
  "ASSET_MISSING",
  "REFERENCE_MISSING",
  "PROVIDER_MISMATCH"
]);

const NON_RETRYABLE_CODES = new Set([
  "IDENTITY_DRIFT",
  "PRODUCT_DRIFT",
  "CONTINUITY_BREAK",
  "UNSUPPORTED_DETAIL",
  "GENERATION_CHARACTER_REFERENCE_MISSING"
]);

export function classifyRegeneration(blockers = []) {
  const codes = blockers.map((blocker) => blocker?.code).filter(Boolean);
  if (codes.some((code) => NON_RETRYABLE_CODES.has(code))) {
    return { retryable: false, reason: "NON_RETRYABLE_CONTRACT_FAILURE", codes };
  }
  const retryableCodes = codes.filter((code) => RETRYABLE_CODES.has(code));
  return {
    retryable: retryableCodes.length > 0,
    reason: retryableCodes.length ? "TRANSIENT_GENERATION_FAILURE" : "NO_RETRYABLE_FAILURE",
    codes
  };
}

export function createRegenerationPlan({ request, validation, attempt = 1, max_retries = 2 } = {}) {
  const classification = classifyRegeneration(validation?.blockers ?? []);
  const canRetry = classification.retryable && attempt <= max_retries;

  return {
    status: canRetry ? "RETRY" : "FINAL_BLOCK",
    attempt,
    max_retries,
    classification,
    preserved: {
      request_id: request?.request_id ?? null,
      scene_id: request?.scene_id ?? null,
      from_scene_id: request?.from_scene_id ?? null,
      to_scene_id: request?.to_scene_id ?? null,
      prompt: request?.prompt ?? null,
      reference_ids: (request?.references ?? []).map((reference) => reference.id ?? reference.uri).filter(Boolean)
    },
    blocker: canRetry
      ? null
      : {
          code: "REGENERATION_EXHAUSTED",
          stage: "regeneration",
          severity: "BLOCKER",
          message: "Generation failed validation and no further retry is permitted."
        }
  };
}

export async function generateWithRetry({ generate, validate, request, max_retries = 2 } = {}) {
  if (typeof generate !== "function" || typeof validate !== "function") {
    return {
      status: "BLOCK",
      error: {
        code: "REGENERATION_PIPELINE_INVALID",
        stage: "regeneration",
        severity: "BLOCKER",
        message: "Retry pipeline requires generate and validate functions."
      }
    };
  }

  for (let attempt = 1; attempt <= max_retries + 1; attempt += 1) {
    const asset = await generate({ ...request, attempt });
    const validation = await validate(asset, request);

    if (validation?.status === "PASS") {
      return { status: "ACCEPTED", attempt, asset, validation };
    }

    const plan = createRegenerationPlan({ request, validation, attempt, max_retries });
    if (plan.status === "FINAL_BLOCK") {
      return { status: "BLOCK", attempt, asset: null, validation, regeneration: plan };
    }
  }

  return {
    status: "BLOCK",
    error: {
      code: "REGENERATION_EXHAUSTED",
      stage: "regeneration",
      severity: "BLOCKER",
      message: "Generation retry limit was exhausted."
    }
  };
}

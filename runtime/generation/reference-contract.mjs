const ALLOWED_REFERENCE_TYPES = new Set(["character", "product", "environment", "voice"]);
const REQUIRED_VISUAL_REFERENCE_TYPE = "character";

export function createReference({ type, id = null, uri = null, role = null, required = false, source = "runtime" } = {}) {
  return { type, id, uri, role, required, source };
}

export function validateReference(reference, { requiredType = null } = {}) {
  if (!reference || typeof reference !== "object") {
    return { valid: false, code: "GENERATION_REFERENCE_INVALID", message: "Reference must be an object." };
  }

  if (!ALLOWED_REFERENCE_TYPES.has(reference.type)) {
    return { valid: false, code: "GENERATION_REFERENCE_TYPE_INVALID", message: `Unsupported reference type: ${reference.type}` };
  }

  if (!reference.id && !reference.uri) {
    return { valid: false, code: "GENERATION_REFERENCE_SOURCE_MISSING", message: "Reference requires an id or uri." };
  }

  if (requiredType && reference.type !== requiredType) {
    return { valid: false, code: "GENERATION_REFERENCE_TYPE_MISMATCH", message: `Expected a ${requiredType} reference.` };
  }

  return { valid: true };
}

export function resolveCharacterReference(scene, references = []) {
  const sceneReference = scene?.creator_identity?.reference ?? null;
  if (sceneReference) {
    const candidate = typeof sceneReference === "string"
      ? createReference({ type: REQUIRED_VISUAL_REFERENCE_TYPE, uri: sceneReference, role: "character_identity", required: true, source: "scene" })
      : { ...sceneReference, type: sceneReference.type ?? REQUIRED_VISUAL_REFERENCE_TYPE, required: true };

    const validation = validateReference(candidate, { requiredType: REQUIRED_VISUAL_REFERENCE_TYPE });
    if (validation.valid) return candidate;
  }

  const candidate = references.find((reference) => reference?.type === REQUIRED_VISUAL_REFERENCE_TYPE && (reference.id || reference.uri));
  return candidate ?? null;
}

export function validateRequiredCharacterReference(scene, references = []) {
  const reference = resolveCharacterReference(scene, references);
  if (!reference) {
    return {
      valid: false,
      error: {
        code: "GENERATION_CHARACTER_REFERENCE_MISSING",
        stage: "reference",
        severity: "BLOCKER",
        message: "Visual generation requires an approved Character Reference.",
        field: "references.character"
      }
    };
  }

  const validation = validateReference(reference, { requiredType: REQUIRED_VISUAL_REFERENCE_TYPE });
  if (!validation.valid) {
    return {
      valid: false,
      error: {
        code: validation.code,
        stage: "reference",
        severity: "BLOCKER",
        message: validation.message,
        field: "references.character"
      }
    };
  }

  return { valid: true, reference };
}

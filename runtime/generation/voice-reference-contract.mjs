const REQUIRED_REFERENCE_TYPE = "voice";

export function createVoiceReference({ id = null, uri = null, role = "voice_identity", required = false, source = "runtime" } = {}) {
  return { type: REQUIRED_REFERENCE_TYPE, id, uri, role, required, source };
}

export function validateVoiceReferenceContract(reference) {
  if (!reference || typeof reference !== "object") {
    return { valid: true, reference: null };
  }

  if (reference.type && reference.type !== REQUIRED_REFERENCE_TYPE) {
    return { valid: false, code: "VOICE_REFERENCE_TYPE_INVALID", message: "Voice Reference must have type 'voice'." };
  }

  if (!reference.id && !reference.uri) {
    return { valid: false, code: "VOICE_REFERENCE_SOURCE_MISSING", message: "Voice Reference requires an id or uri." };
  }

  return { valid: true, reference: { ...reference, type: REQUIRED_REFERENCE_TYPE, required: false } };
}

export function resolveVoiceReference(voiceIdentity, references = []) {
  const candidate = voiceIdentity?.reference ?? references.find((reference) => reference?.type === REQUIRED_REFERENCE_TYPE && (reference.id || reference.uri));
  const validation = validateVoiceReferenceContract(candidate);
  return validation.valid ? validation : { valid: false, error: { code: validation.code, stage: "voice_reference", severity: "BLOCKER", message: validation.message, field: "references.voice" } };
}

export function attachVoiceReference(request = {}, voiceIdentity, references = []) {
  const resolved = resolveVoiceReference(voiceIdentity, references);
  if (!resolved.valid) {
    return { status: "BLOCK", error: resolved.error };
  }

  const existing = Array.isArray(request.references) ? request.references : [];
  const withoutVoice = existing.filter((reference) => reference?.type !== REQUIRED_REFERENCE_TYPE);
  return {
    status: "READY",
    request: {
      ...request,
      references: resolved.reference ? [resolved.reference, ...withoutVoice] : withoutVoice
    },
    voice_reference: resolved.reference ?? null
  };
}

const ALLOWED_VOICE_FIELDS = new Set([
  "age_range",
  "gender_presentation",
  "language",
  "accent",
  "pitch",
  "timbre",
  "tempo",
  "prosody",
  "articulation",
  "breathing",
  "pausing",
  "emotion",
  "disfluency",
  "realism_constraints"
]);

export function createVoiceIdentityLock({
  id = null,
  age_range = null,
  gender_presentation = null,
  language = "id-ID",
  accent = "native Indonesian conversational",
  pitch = "medium",
  timbre = "warm, soft, lightly textured, natural",
  tempo = "conversational with natural variation",
  prosody = "meaning-led, subtle, non-theatrical",
  articulation = "clear but not over-enunciated",
  breathing = "natural micro-breaths at plausible phrase boundaries",
  pausing = "natural micro-pauses and occasional hesitation",
  emotion = "subtle and context-driven",
  disfluency = "minimal, natural when contextually appropriate",
  realism_constraints = [
    "avoid robotic timing",
    "avoid perfectly uniform pacing",
    "avoid exaggerated enthusiasm",
    "avoid synthetic-sounding pauses",
    "avoid over-pronunciation",
    "preserve consistent speaker identity"
  ],
  reference = null
} = {}) {
  return {
    id,
    age_range,
    gender_presentation,
    language,
    accent,
    pitch,
    timbre,
    tempo,
    prosody,
    articulation,
    breathing,
    pausing,
    emotion,
    disfluency,
    realism_constraints,
    reference
  };
}

export function validateVoiceIdentityLock(lock) {
  if (!lock || typeof lock !== "object") {
    return { valid: false, code: "VOICE_IDENTITY_MISSING", message: "Voice Identity Lock is required." };
  }

  const unknownFields = Object.keys(lock).filter((field) => !ALLOWED_VOICE_FIELDS.has(field) && field !== "id" && field !== "reference");
  if (unknownFields.length) {
    return { valid: false, code: "VOICE_IDENTITY_FIELD_INVALID", message: "Voice Identity Lock contains unsupported fields.", fields: unknownFields };
  }

  if (!lock.language) {
    return { valid: false, code: "VOICE_LANGUAGE_MISSING", message: "Voice Identity Lock requires a language." };
  }

  return { valid: true };
}

export function validateVoiceReference(reference) {
  if (!reference) {
    return {
      valid: false,
      code: "VOICE_REFERENCE_MISSING",
      stage: "voice_generation",
      severity: "BLOCKER",
      message: "Spoken generation requires an approved Voice Reference."
    };
  }

  if (typeof reference !== "object" || (!reference.id && !reference.uri)) {
    return {
      valid: false,
      code: "VOICE_REFERENCE_INVALID",
      stage: "voice_generation",
      severity: "BLOCKER",
      message: "Voice Reference must contain an approved id or uri."
    };
  }

  return { valid: true, reference };
}

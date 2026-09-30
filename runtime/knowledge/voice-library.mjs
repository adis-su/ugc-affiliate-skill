import { createVoiceIdentityLock } from "../generation/voice-identity-contract.mjs";

export const ROSITASARI_VOICE_IDENTITY = createVoiceIdentityLock({
  id: "rositasari-voice-profile-v1",
  age_range: "young adult",
  gender_presentation: "female",
  language: "id-ID",
  accent: "native Indonesian conversational",
  pitch: "medium, natural variation",
  timbre: "warm, soft, lightly textured, natural",
  tempo: "conversational with natural variation",
  prosody: "meaning-led, subtle, non-theatrical",
  articulation: "clear but not over-enunciated",
  breathing: "natural micro-breaths at plausible phrase boundaries",
  pausing: "natural micro-pauses and occasional context-appropriate hesitation",
  emotion: "subtle, approachable, context-driven",
  disfluency: "minimal and natural when contextually appropriate",
  realism_constraints: [
    "avoid robotic timing",
    "avoid perfectly uniform pacing",
    "avoid exaggerated enthusiasm",
    "avoid synthetic-sounding pauses",
    "avoid over-pronunciation",
    "preserve consistent speaker identity",
    "do not invent a different Rositasari voice identity"
  ],
  reference: null
});

export const ROSITASARI_VOICE_PROFILE_STATUS = {
  reference_status: "OPTIONAL",
  generation_status: "READY_FROM_IDENTITY",
  profile_version: "v1"
};

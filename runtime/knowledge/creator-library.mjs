export const CREATOR_LIBRARY = {
  Rositasari: {
    character_identity: {
      age_appearance: "25",
      gender: "female",
      height: "165 cm",
      appearance: "young adult",
      ethnicity_style: "Southeast Asian visual appearance",
      hijab: "yes; hijab is part of stable visual identity",
      face: {
        shape: "oval-rounded",
        forehead: "moderately wide and smooth",
        cheeks: "soft and naturally rounded",
        jawline: "soft and rounded",
        chin: "short-to-medium and rounded"
      },
      eyes: {
        size: "medium",
        shape: "almond-round",
        iris_color: "very dark brown",
        gaze: "natural and direct",
        eyelids: "natural",
        eyelashes: "subtle",
        eye_spacing: "balanced"
      },
      eyebrows: {
        color: "very dark brown",
        thickness: "medium",
        shape: "natural soft arch",
        density: "moderately full",
        tail: "slightly tapered"
      },
      nose: {
        size: "medium",
        bridge: "relatively straight",
        width: "narrow-to-medium",
        tip: "rounded",
        nostrils: "small-to-medium",
        appearance: "natural"
      },
      lips: {
        size: "medium",
        upper_lip: "medium-thin",
        lower_lip: "slightly fuller",
        cupid_bow: "soft and defined",
        color: "natural muted pink",
        corners: "neutral"
      },
      skin: {
        tone: "light-medium",
        undertone: "warm-neutral",
        texture: "natural",
        pores: "subtle",
        facial_marks: "subtle natural marks",
        finish: "natural skin",
        makeup: "minimal"
      },
      facial_expression: {
        default: "calm neutral",
        personality: "approachable",
        gaze: "natural",
        smile: "subtle when required"
      },
      hair: null,
      body: null,
      style: null,
      reference: null
    },
    voice_identity: {
      voice_characteristics: "warm, soft, lightly textured, natural",
      tone: "subtle, approachable, context-driven",
      pitch: "medium, natural variation",
      speaking_style: "native Indonesian conversational",
      speech_pace: "conversational with natural variation",
      accent: "native Indonesian conversational",
      energy: "natural, restrained, non-theatrical",
      language: "id-ID",
      prosody: "meaning-led, subtle, non-theatrical",
      breathing: "natural micro-breaths at plausible phrase boundaries",
      pausing: "natural micro-pauses and occasional context-appropriate hesitation",
      disfluency: "minimal and natural when contextually appropriate",
      realism_constraints: [
        "avoid robotic timing",
        "avoid perfectly uniform pacing",
        "avoid exaggerated enthusiasm",
        "avoid synthetic-sounding pauses",
        "avoid over-pronunciation",
        "preserve consistent speaker identity"
      ],
      voice_reference: null
    }
  }
};

export function resolveCreator(name) {
  const creator = CREATOR_LIBRARY[name];
  if (!creator) {
    return {
      blocker: {
        code: "CREATOR_NOT_FOUND",
        stage: "creator",
        severity: "BLOCKER",
        message: `Creator is not available: ${name}`,
        field: "creator"
      }
    };
  }

  return {
    creator_name: name,
    character_identity: creator.character_identity,
    voice_identity: creator.voice_identity,
    character_identity_lock: {
      source: "Creator Library",
      creator: name,
      reference: creator.character_identity.reference
    },
    voice_identity_lock: {
      source: "Creator Library",
      creator: name,
      reference: creator.voice_identity.voice_reference
    }
  };
}

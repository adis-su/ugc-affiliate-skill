export const CREATOR_LIBRARY = {
  Rositasari: {
    character_identity: {
      age_appearance: null,
      face: null,
      hair: null,
      skin: null,
      body: null,
      style: null,
      reference: null
    },
    voice_identity: {
      voice_characteristics: null,
      tone: null,
      pitch: null,
      speaking_style: null,
      speech_pace: null,
      accent: null,
      energy: null,
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

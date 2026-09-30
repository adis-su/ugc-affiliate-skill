const CHARACTER_FIELDS = [
  "age_appearance", "gender", "height", "appearance", "ethnicity_style", "hijab",
  "face", "eyes", "eyebrows", "nose", "lips", "skin", "facial_expression",
  "hair", "body", "style", "reference"
];

const VOICE_FIELDS = [
  "voice_characteristics", "tone", "pitch", "speaking_style",
  "speech_pace", "accent", "energy", "voice_reference"
];

function mergeIdentity(base = {}, supplied = {}, fields) {
  const result = { ...base };
  for (const field of fields) {
    if (supplied?.[field] !== undefined && supplied[field] !== null && supplied[field] !== "") {
      result[field] = supplied[field];
    }
  }
  return result;
}

function unknownFields(record, fields) {
  return fields.filter((field) => record[field] === null || record[field] === undefined || record[field] === "");
}

export function retrieveCreatorIntelligence(resolvedCreator, input) {
  const suppliedCharacter = input.creator_identity?.character ?? input.creator_reference?.character ?? {};
  const suppliedVoice = input.creator_identity?.voice ?? input.creator_reference?.voice ?? {};

  const character = mergeIdentity(resolvedCreator.character_identity, suppliedCharacter, CHARACTER_FIELDS);
  const voice = mergeIdentity(resolvedCreator.voice_identity, suppliedVoice, VOICE_FIELDS);

  const characterUnknown = unknownFields(character, CHARACTER_FIELDS);
  const voiceUnknown = unknownFields(voice, VOICE_FIELDS);

  const characterReference = character.reference ?? null;
  const voiceReference = voice.voice_reference ?? null;

  return {
    creator_name: resolvedCreator.creator_name,
    character_identity: character,
    character_reference_status: characterReference ? "available" : "unavailable",
    character_identity_lock: {
      ...resolvedCreator.character_identity_lock,
      reference: characterReference,
      source: suppliedCharacter.reference ? "creator_input_reference" : resolvedCreator.character_identity_lock.source
    },
    voice_identity: voice,
    voice_reference_status: voiceReference ? "available" : "unavailable",
    voice_identity_lock: {
      ...resolvedCreator.voice_identity_lock,
      reference: voiceReference,
      source: suppliedVoice.voice_reference ? "creator_input_reference" : resolvedCreator.voice_identity_lock.source
    },
    unknown_attributes: {
      character: characterUnknown,
      voice: voiceUnknown
    },
    conflict_notes: []
  };
}

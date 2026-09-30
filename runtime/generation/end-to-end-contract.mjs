import { validateRequiredCharacterReference, validateProductReference } from "./reference-contract.mjs";
import { resolveVoiceReference } from "./voice-reference-contract.mjs";

export function validateGenerationIdentityContract({ scene, references = [], speech_required = false } = {}) {
  const blockers = [];

  const character = validateRequiredCharacterReference(scene, references);
  if (!character.valid) blockers.push(character.error);

  const product = validateProductReference(scene, references);
  if (scene?.product_identity?.required && !product.valid) {
    blockers.push({
      code: "PRODUCT_REFERENCE_MISSING",
      stage: "reference",
      severity: "BLOCKER",
      message: "Required Product Reference is missing.",
      field: "references.product"
    });
  }

  if (speech_required) {
    const voice = resolveVoiceReference(scene?.creator_identity?.voice_identity_lock ?? scene?.voice_identity, references);
    if (!voice.valid) blockers.push(voice.error);
  }

  return {
    status: blockers.length ? "BLOCK" : "READY",
    blockers,
    references: {
      character: character.reference ?? null,
      product: product.reference ?? null
    }
  };
}

export function buildGenerationRequest({ scene, prompt, references = [], speech_required = false, request_id } = {}) {
  const identity = validateGenerationIdentityContract({ scene, references, speech_required });
  if (identity.status === "BLOCK") {
    return { status: "BLOCK", request_id, blockers: identity.blockers };
  }

  return {
    status: "READY",
    request_id,
    scene_id: scene?.scene_id ?? null,
    prompt,
    references,
    identity_locks: {
      character: scene?.creator_identity ?? null,
      product: scene?.product_identity ?? null,
      voice: scene?.voice_identity ?? scene?.creator_identity?.voice_identity_lock ?? null
    }
  };
}

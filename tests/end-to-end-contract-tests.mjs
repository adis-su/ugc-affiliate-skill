import test from "node:test";
import assert from "node:assert/strict";
import { buildGenerationRequest, validateGenerationIdentityContract } from "../runtime/generation/end-to-end-contract.mjs";

const scene = {
  scene_id: "scene_01",
  creator_identity: {
    creator: "Rositasari",
    reference: "approved://character/rositasari-v1",
    voice_identity_lock: { reference: { type: "voice", id: "rositasari-voice-v1" } }
  },
  product_identity: {
    product_name: "Example Product",
    visual_reference: { type: "product", id: "product-v1" }
  }
};

test("visual generation requires character identity and can carry product identity", () => {
  const result = validateGenerationIdentityContract({
    scene,
    references: [
      { type: "character", id: "rositasari-character-v1" },
      { type: "product", id: "product-v1" }
    ]
  });
  assert.equal(result.status, "READY");
});

test("spoken generation uses voice identity without requiring a voice reference", () => {
  const result = validateGenerationIdentityContract({
    scene,
    speech_required: true,
    references: [
      { type: "character", id: "rositasari-character-v1" },
      { type: "product", id: "product-v1" }
    ]
  });
  assert.equal(result.status, "READY");
});

test("end-to-end request preserves all identity locks", () => {
  const result = buildGenerationRequest({
    request_id: "e2e-001",
    scene,
    prompt: "Validated generation prompt",
    speech_required: true,
    references: [
      { type: "character", id: "rositasari-character-v1" },
      { type: "product", id: "product-v1" },
      { type: "voice", id: "rositasari-voice-v1" }
    ]
  });

  assert.equal(result.status, "READY");
  assert.equal(result.identity_locks.character.creator, "Rositasari");
  assert.equal(result.identity_locks.product.product_name, "Example Product");
  assert.equal(result.identity_locks.voice.reference.id, "rositasari-voice-v1");
});

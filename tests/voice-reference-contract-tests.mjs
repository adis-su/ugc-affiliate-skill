import test from "node:test";
import assert from "node:assert/strict";
import { attachVoiceReference, createVoiceReference, resolveVoiceReference, validateVoiceReferenceContract } from "../runtime/generation/voice-reference-contract.mjs";

test("approved voice reference is accepted", () => {
  const reference = createVoiceReference({ id: "rositasari-voice-v1" });
  const result = validateVoiceReferenceContract(reference);
  assert.equal(result.valid, true);
  assert.equal(result.reference.type, "voice");
  assert.equal(result.reference.required, true);
});

test("unapproved voice reference is blocked", () => {
  const result = validateVoiceReferenceContract({ type: "voice", id: "draft-voice", source: "generated" });
  assert.equal(result.valid, false);
  assert.equal(result.code, "VOICE_REFERENCE_NOT_APPROVED");
});

test("voice reference can resolve from voice identity", () => {
  const result = resolveVoiceReference({ reference: { id: "approved-voice" } });
  assert.equal(result.valid, true);
  assert.equal(result.reference.type, "voice");
});

test("missing voice reference blocks request attachment", () => {
  const result = attachVoiceReference({ prompt: "spoken line" }, {});
  assert.equal(result.status, "BLOCK");
  assert.equal(result.error.code, "VOICE_REFERENCE_MISSING");
});

test("attachment preserves approved voice identity", () => {
  const result = attachVoiceReference(
    { prompt: "spoken line", references: [{ type: "product", id: "product-1" }] },
    { reference: { id: "voice-1" } }
  );
  assert.equal(result.status, "READY");
  assert.equal(result.request.references[0].type, "voice");
  assert.equal(result.request.references[0].id, "voice-1");
  assert.equal(result.request.references[1].type, "product");
});

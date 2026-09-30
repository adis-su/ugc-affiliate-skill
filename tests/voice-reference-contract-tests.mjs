import test from "node:test";
import assert from "node:assert/strict";
import { attachVoiceReference, createVoiceReference, resolveVoiceReference, validateVoiceReferenceContract } from "../runtime/generation/voice-reference-contract.mjs";

test("approved voice reference is accepted", () => {
  const reference = createVoiceReference({ id: "rositasari-voice-v1" });
  const result = validateVoiceReferenceContract(reference);
  assert.equal(result.valid, true);
  assert.equal(result.reference.type, "voice");
  assert.equal(result.reference.required, false);
});

test("voice reference does not require an approval source", () => {
  const result = validateVoiceReferenceContract({ type: "voice", id: "draft-voice", source: "generated" });
  assert.equal(result.valid, true);
});

test("voice reference can resolve from voice identity", () => {
  const result = resolveVoiceReference({ reference: { id: "approved-voice" } });
  assert.equal(result.valid, true);
  assert.equal(result.reference.type, "voice");
});

test("missing voice reference does not block request attachment", () => {
  const result = attachVoiceReference({ prompt: "spoken line" }, {});
  assert.equal(result.status, "READY");
  assert.equal(result.voice_reference, null);
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

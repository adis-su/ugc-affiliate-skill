import test from "node:test";
import assert from "node:assert/strict";
import { createVoiceIdentityLock, validateVoiceIdentityLock, validateVoiceReference } from "../runtime/generation/voice-identity-contract.mjs";

test("Rositasari voice lock defaults to natural Indonesian conversational delivery", () => {
  const lock = createVoiceIdentityLock({ age_range: "young adult", gender_presentation: "female" });
  assert.equal(lock.language, "id-ID");
  assert.equal(lock.accent, "native Indonesian conversational");
  assert.match(lock.timbre, /warm/i);
  assert.match(lock.realism_constraints.join(" "), /robotic/i);
});

test("voice identity lock validates required language", () => {
  const result = validateVoiceIdentityLock({ language: "" });
  assert.equal(result.valid, false);
  assert.equal(result.code, "VOICE_LANGUAGE_MISSING");
});

test("missing voice reference blocks spoken generation", () => {
  const result = validateVoiceReference(null);
  assert.equal(result.valid, false);
  assert.equal(result.code, "VOICE_REFERENCE_MISSING");
});

test("approved voice reference is accepted", () => {
  const result = validateVoiceReference({ id: "rositasari-voice-v1" });
  assert.equal(result.valid, true);
});

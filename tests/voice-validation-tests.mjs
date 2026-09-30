import test from "node:test";
import assert from "node:assert/strict";
import { validateVoiceAsset } from "../runtime/generation/voice-validation.mjs";

const baseAsset = {
  status: "READY",
  provider: "real-voice",
  asset_uri: "https://cdn.invalid/voice.wav",
  voice_reference_ids: ["rositasari-voice-v1"]
};

test("accepts a validated natural voice asset", () => {
  const result = validateVoiceAsset(baseAsset, {
    provider: "real-voice",
    required_voice_reference_ids: ["rositasari-voice-v1"],
    checks: {
      identity_match: true,
      pronunciation_match: true,
      prosody_natural: true,
      pacing_natural: true,
      synthetic_artifacts: false
    }
  });
  assert.equal(result.status, "PASS");
});

test("blocks missing audio asset", () => {
  const result = validateVoiceAsset({ status: "READY", voice_reference_ids: ["rositasari-voice-v1"] });
  assert.equal(result.status, "BLOCK");
  assert.equal(result.blockers[0].code, "AUDIO_MISSING");
});

test("blocks voice identity drift", () => {
  const result = validateVoiceAsset(baseAsset, { checks: { identity_match: false } });
  assert.equal(result.status, "BLOCK");
  assert.equal(result.blockers[0].code, "VOICE_IDENTITY_DRIFT");
});

test("blocks unnatural pacing and synthetic artifacts", () => {
  const result = validateVoiceAsset(baseAsset, {
    checks: { pacing_natural: false, synthetic_artifacts: true }
  });
  assert.equal(result.status, "BLOCK");
  assert.deepEqual(result.blockers.map((item) => item.code), ["PACING_DRIFT", "SYNTHETIC_ARTIFACT"]);
});

test("accepts a voice asset without a reference when Voice Identity validation passes", () => {
  const result = validateVoiceAsset({ ...baseAsset, voice_reference_ids: [] }, {
    checks: { identity_match: true, pronunciation_match: true, prosody_natural: true, pacing_natural: true, synthetic_artifacts: false }
  });
  assert.equal(result.status, "PASS");
});

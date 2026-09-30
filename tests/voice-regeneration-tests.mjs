import test from "node:test";
import assert from "node:assert/strict";
import { classifyVoiceRegeneration, createVoiceRegenerationPlan, generateVoiceWithRetry } from "../runtime/generation/voice-regeneration-policy.mjs";

test("voice pacing drift is retryable", () => {
  const result = classifyVoiceRegeneration([{ code: "PACING_DRIFT" }]);
  assert.equal(result.retryable, true);
});

test("missing approved voice reference is not retryable", () => {
  const result = classifyVoiceRegeneration([{ code: "VOICE_REFERENCE_MISSING" }]);
  assert.equal(result.retryable, false);
});

test("regeneration preserves the approved voice reference", () => {
  const plan = createVoiceRegenerationPlan({
    request: {
      request_id: "voice-1",
      scene_id: "scene_01",
      text: "Hai, ini Rositasari.",
      references: [{ type: "voice", id: "rositasari-voice-v1" }]
    },
    validation: { blockers: [{ code: "SYNTHETIC_ARTIFACT" }] },
    attempt: 1,
    max_retries: 2
  });

  assert.equal(plan.status, "RETRY");
  assert.deepEqual(plan.preserved.voice_reference_ids, ["rositasari-voice-v1"]);
});

test("voice regeneration accepts a later passing attempt", async () => {
  let calls = 0;
  const result = await generateVoiceWithRetry({
    max_retries: 2,
    request: {
      request_id: "voice-2",
      scene_id: "scene_01",
      text: "Hai.",
      references: [{ type: "voice", id: "voice-v1" }]
    },
    generate: async () => {
      calls += 1;
      return { status: "READY", asset_uri: calls === 2 ? "https://cdn.invalid/voice.wav" : null };
    },
    validate: async (asset) => asset.asset_uri
      ? { status: "PASS", blockers: [] }
      : { status: "BLOCK", blockers: [{ code: "ASSET_MISSING" }] }
  });

  assert.equal(result.status, "ACCEPTED");
  assert.equal(result.attempt, 2);
});

test("voice regeneration stops after retry exhaustion", async () => {
  const result = await generateVoiceWithRetry({
    max_retries: 1,
    request: {
      request_id: "voice-3",
      scene_id: "scene_01",
      text: "Hai.",
      references: [{ type: "voice", id: "voice-v1" }]
    },
    generate: async () => ({ status: "READY", asset_uri: "https://cdn.invalid/voice.wav" }),
    validate: async () => ({ status: "BLOCK", blockers: [{ code: "SYNTHETIC_ARTIFACT" }] })
  });

  assert.equal(result.status, "BLOCK");
  assert.equal(result.regeneration.blocker.code, "VOICE_REGENERATION_EXHAUSTED");
});

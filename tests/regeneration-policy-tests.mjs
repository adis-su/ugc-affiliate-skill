import test from "node:test";
import assert from "node:assert/strict";
import { classifyRegeneration, createRegenerationPlan, generateWithRetry } from "../runtime/generation/regeneration-policy.mjs";

test("transient provider failure is retryable", () => {
  const result = classifyRegeneration([{ code: "REQUEST_FAILED" }]);
  assert.equal(result.retryable, true);
});

test("identity drift is not retryable", () => {
  const result = classifyRegeneration([{ code: "IDENTITY_DRIFT" }]);
  assert.equal(result.retryable, false);
});

test("retry plan preserves identity and product references", () => {
  const plan = createRegenerationPlan({
    request: {
      request_id: "r1",
      scene_id: "scene_01",
      prompt: "validated prompt",
      references: [
        { type: "character", uri: "approved://character/rositasari-v1" },
        { type: "product", uri: "approved://product/v1" }
      ]
    },
    validation: { blockers: [{ code: "ASSET_MISSING" }] },
    attempt: 1,
    max_retries: 2
  });

  assert.equal(plan.status, "RETRY");
  assert.equal(plan.preserved.reference_ids.length, 2);
});

test("retry pipeline accepts a later passing generation", async () => {
  let calls = 0;
  const result = await generateWithRetry({
    max_retries: 2,
    request: { request_id: "r2", scene_id: "scene_01", prompt: "test", references: [] },
    generate: async () => {
      calls += 1;
      return { status: "READY", asset_uri: calls === 2 ? "https://cdn.invalid/image.png" : null };
    },
    validate: async (asset) => asset.asset_uri
      ? { status: "PASS", blockers: [] }
      : { status: "BLOCK", blockers: [{ code: "ASSET_MISSING" }] }
  });

  assert.equal(result.status, "ACCEPTED");
  assert.equal(result.attempt, 2);
});

test("retry pipeline stops after retry limit", async () => {
  const result = await generateWithRetry({
    max_retries: 1,
    request: { request_id: "r3", scene_id: "scene_01", prompt: "test", references: [] },
    generate: async () => ({ status: "READY", asset_uri: null }),
    validate: async () => ({ status: "BLOCK", blockers: [{ code: "ASSET_MISSING" }] })
  });

  assert.equal(result.status, "BLOCK");
  assert.equal(result.regeneration.blocker.code, "REGENERATION_EXHAUSTED");
});

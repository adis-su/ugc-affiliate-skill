import test from "node:test";
import assert from "node:assert/strict";
import { RealImageProviderAdapter } from "../runtime/generation/real-image-provider.mjs";

const refs = [
  { type: "character", uri: "approved://character/rositasari-v1" },
  { type: "product", uri: "approved://product/example-v1" }
];

test("real image adapter blocks when provider configuration is missing", async () => {
  const adapter = new RealImageProviderAdapter({ api_key: null, api_url: null });
  const result = await adapter.generateImage({ request_id: "r1", scene_id: "s1", prompt: "test", references: refs });
  assert.equal(result.status, "BLOCK");
  assert.equal(result.error.code, "CONFIG_MISSING");
});

test("real image adapter normalizes a successful provider response", async () => {
  const adapter = new RealImageProviderAdapter({
    provider: "test-provider",
    api_key: "test-key",
    api_url: "https://provider.invalid/generate",
    model: "test-model",
    fetch_impl: async () => ({ ok: true, status: 200, json: async () => ({ data: [{ url: "https://cdn.invalid/image.png" }] }) })
  });
  const result = await adapter.generateImage({ request_id: "r2", scene_id: "s1", prompt: "test", references: refs });
  assert.equal(result.status, "READY");
  assert.equal(result.asset_uri, "https://cdn.invalid/image.png");
  assert.deepEqual(result.reference_ids, refs.map((reference) => reference.uri));
});

test("real image adapter blocks provider success without an asset", async () => {
  const adapter = new RealImageProviderAdapter({
    api_key: "test-key",
    api_url: "https://provider.invalid/generate",
    fetch_impl: async () => ({ ok: true, status: 200, json: async () => ({}) })
  });
  const result = await adapter.generateImage({ request_id: "r3", scene_id: "s1", prompt: "test", references: refs });
  assert.equal(result.status, "BLOCK");
  assert.equal(result.error.code, "ASSET_MISSING");
});

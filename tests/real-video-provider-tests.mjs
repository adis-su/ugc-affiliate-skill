import test from "node:test";
import assert from "node:assert/strict";
import { RealVideoProviderAdapter } from "../runtime/generation/real-video-provider.mjs";

const refs = [
  { type: "character", uri: "approved://character/rositasari-v1" },
  { type: "product", uri: "approved://product/example-v1" }
];

test("real video adapter blocks when configuration is missing", async () => {
  const adapter = new RealVideoProviderAdapter({ api_key: null, api_url: null });
  const result = await adapter.generateVideo({ request_id: "v1", from_scene_id: "s1", to_scene_id: "s2", prompt: "test", references: refs });
  assert.equal(result.status, "BLOCK");
  assert.equal(result.error.code, "CONFIG_MISSING");
});

test("real video adapter normalizes transition and references", async () => {
  const adapter = new RealVideoProviderAdapter({
    provider: "test-video",
    api_key: "test-key",
    api_url: "https://provider.invalid/generate",
    model: "test-model",
    fetch_impl: async (_url, options) => {
      const body = JSON.parse(options.body);
      assert.equal(body.start_frame, "https://cdn.invalid/start.png");
      assert.equal(body.end_frame, "https://cdn.invalid/end.png");
      assert.equal(body.references.length, 2);
      return { ok: true, status: 200, json: async () => ({ data: [{ url: "https://cdn.invalid/video.mp4" }] }) };
    }
  });

  const result = await adapter.generateVideo({
    request_id: "v2",
    from_scene_id: "s1",
    to_scene_id: "s2",
    prompt: "validated transition",
    start_frame: "https://cdn.invalid/start.png",
    end_frame: "https://cdn.invalid/end.png",
    references: refs
  });

  assert.equal(result.status, "READY");
  assert.equal(result.asset_uri, "https://cdn.invalid/video.mp4");
  assert.deepEqual(result.reference_ids, refs.map((reference) => reference.uri));
});

test("real video adapter blocks provider success without an asset", async () => {
  const adapter = new RealVideoProviderAdapter({
    api_key: "test-key",
    api_url: "https://provider.invalid/generate",
    fetch_impl: async () => ({ ok: true, status: 200, json: async () => ({}) })
  });
  const result = await adapter.generateVideo({ request_id: "v3", from_scene_id: "s1", to_scene_id: "s2", prompt: "test", references: refs });
  assert.equal(result.status, "BLOCK");
  assert.equal(result.error.code, "ASSET_MISSING");
});

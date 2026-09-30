import test from "node:test";
import assert from "node:assert/strict";
import { ImageGenerationAdapter } from "../runtime/generation/image-adapter.mjs";
import { VideoGenerationAdapter } from "../runtime/generation/video-adapter.mjs";
import { validateGeneratedAsset } from "../runtime/generation/asset-validation.mjs";

test("image adapter preserves scene and prompt identity", async () => {
  const adapter = new ImageGenerationAdapter();
  const asset = await adapter.generateImage({
    request_id: "test-request",
    scene: { scene_id: "scene_01" },
    image_prompt: { prompt: "validated image prompt" },
    references: ["fixture://rositasari-character-v1"]
  });

  assert.equal(asset.status, "READY");
  assert.equal(asset.scene_id, "scene_01");
  assert.equal(asset.prompt, "validated image prompt");
  assert.deepEqual(asset.references, ["fixture://rositasari-character-v1"]);
});

test("video adapter preserves consecutive scene mapping", async () => {
  const adapter = new VideoGenerationAdapter();
  const asset = await adapter.generateVideo({
    request_id: "test-request",
    from_scene: { scene_id: "scene_01" },
    to_scene: { scene_id: "scene_02" },
    video_prompt: { prompt: "validated video prompt" }
  });

  assert.equal(asset.status, "READY");
  assert.equal(asset.from_scene_id, "scene_01");
  assert.equal(asset.to_scene_id, "scene_02");
});

test("generated asset validation blocks incorrect scene mapping", () => {
  const result = validateGeneratedAsset(
    { status: "READY", scene_id: "scene_02" },
    { scene_id: "scene_01" }
  );

  assert.equal(result.status, "BLOCK");
  assert.ok(result.blockers.some((item) => item.code === "CONTINUITY_BREAK"));
});

test("generated asset validation accepts a correctly mapped image asset", () => {
  const result = validateGeneratedAsset(
    { status: "READY", scene_id: "scene_01" },
    { scene_id: "scene_01" }
  );

  assert.equal(result.status, "PASS");
});

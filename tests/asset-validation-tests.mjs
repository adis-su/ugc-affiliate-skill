import test from "node:test";
import assert from "node:assert/strict";
import { validateGeneratedAsset, validateImageAsset, validateVideoAsset } from "../runtime/generation/asset-validation.mjs";

test("accepted image asset passes and is marked validated", () => {
  const result = validateImageAsset({
    status: "READY",
    provider: "test-image",
    scene_id: "scene_01",
    asset_uri: "https://cdn.invalid/image.png",
    reference_ids: ["character-v1", "product-v1"],
    validation: { status: "PENDING" }
  }, {
    provider: "test-image",
    scene_id: "scene_01",
    required_reference_ids: ["character-v1", "product-v1"]
  });
  assert.equal(result.status, "PASS");
  assert.equal(result.asset.validation.status, "PASSED");
});

test("ready asset without URI is blocked", () => {
  const result = validateGeneratedAsset({ status: "READY", scene_id: "scene_01" }, { scene_id: "scene_01" });
  assert.equal(result.status, "BLOCK");
  assert.equal(result.blockers[0].code, "ASSET_MISSING");
});

test("missing required reference is blocked", () => {
  const result = validateGeneratedAsset({
    status: "READY",
    scene_id: "scene_01",
    asset_uri: "https://cdn.invalid/image.png",
    reference_ids: ["character-v1"]
  }, { scene_id: "scene_01", required_reference_ids: ["character-v1", "product-v1"] });
  assert.equal(result.status, "BLOCK");
  assert.equal(result.blockers.some((b) => b.code === "REFERENCE_MISSING"), true);
});

test("wrong video transition is blocked", () => {
  const result = validateVideoAsset({
    status: "READY",
    from_scene_id: "scene_01",
    to_scene_id: "scene_03",
    asset_uri: "https://cdn.invalid/video.mp4",
    reference_ids: ["character-v1"]
  }, { from_scene_id: "scene_01", to_scene_id: "scene_02" });
  assert.equal(result.status, "BLOCK");
  assert.equal(result.blockers.some((b) => b.code === "CONTINUITY_BREAK"), true);
});

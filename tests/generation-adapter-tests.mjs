import test from "node:test";
import assert from "node:assert/strict";
import { ImageGenerationAdapter } from "../runtime/generation/image-adapter.mjs";
import { VideoGenerationAdapter } from "../runtime/generation/video-adapter.mjs";
import { validateGeneratedAsset } from "../runtime/generation/asset-validation.mjs";
import { validateRequiredCharacterReference } from "../runtime/generation/reference-contract.mjs";

const productReference = {
  type: "product",
  uri: "approved://product/example-v1",
  role: "product_identity",
  required: false
};

const characterReference = {
  type: "character",
  uri: "approved://rositasari/character-v1",
  role: "character_identity",
  required: true
};

test("image adapter preserves scene, prompt, and character reference identity", async () => {
  const adapter = new ImageGenerationAdapter();
  const scene = { scene_id: "scene_01", creator_identity: { reference: characterReference } };
  const asset = await adapter.generateImage({
    request_id: "test-request",
    scene,
    image_prompt: { prompt: "validated image prompt" },
    references: []
  });

  assert.equal(asset.status, "READY");
  assert.equal(asset.scene_id, "scene_01");
  assert.equal(asset.prompt, "validated image prompt");
  assert.deepEqual(asset.references[0], characterReference);
  assert.equal(asset.references.some((reference) => reference.type === "product"), false);
});

test("image adapter blocks when character reference is missing", async () => {
  const adapter = new ImageGenerationAdapter();
  const asset = await adapter.generateImage({
    request_id: "test-request",
    scene: { scene_id: "scene_01", creator_identity: { reference: null } },
    image_prompt: { prompt: "validated image prompt" }
  });

  assert.equal(asset.status, "BLOCK");
  assert.equal(asset.error.code, "GENERATION_CHARACTER_REFERENCE_MISSING");
});

test("video adapter preserves consecutive scene mapping and character reference", async () => {
  const adapter = new VideoGenerationAdapter();
  const fromScene = { scene_id: "scene_01", creator_identity: { reference: characterReference } };
  const asset = await adapter.generateVideo({
    request_id: "test-request",
    from_scene: fromScene,
    to_scene: { scene_id: "scene_02" },
    video_prompt: { prompt: "validated video prompt" }
  });

  assert.equal(asset.status, "READY");
  assert.equal(asset.from_scene_id, "scene_01");
  assert.equal(asset.to_scene_id, "scene_02");
  assert.deepEqual(asset.references[0], characterReference);
});

test("video adapter blocks when character reference is missing", async () => {
  const adapter = new VideoGenerationAdapter();
  const asset = await adapter.generateVideo({
    request_id: "test-request",
    from_scene: { scene_id: "scene_01", creator_identity: { reference: null } },
    to_scene: { scene_id: "scene_02" },
    video_prompt: { prompt: "validated video prompt" }
  });

  assert.equal(asset.status, "BLOCK");
  assert.equal(asset.error.code, "GENERATION_CHARACTER_REFERENCE_MISSING");
});

test("reference contract validates character references", () => {
  const result = validateRequiredCharacterReference(
    { creator_identity: { reference: characterReference } },
    []
  );
  assert.equal(result.valid, true);
  assert.deepEqual(result.reference, characterReference);
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


test("image adapter attaches a product reference without replacing character reference", async () => {
  const adapter = new ImageGenerationAdapter();
  const scene = {
    scene_id: "scene_01",
    creator_identity: { reference: characterReference },
    product_identity: { visual_reference: productReference }
  };
  const asset = await adapter.generateImage({
    request_id: "test-request",
    scene,
    image_prompt: { prompt: "validated image prompt" }
  });

  assert.equal(asset.status, "READY");
  assert.deepEqual(asset.references[0], characterReference);
  assert.deepEqual(asset.references[1], productReference);
});

test("video adapter carries product reference across a transition", async () => {
  const adapter = new VideoGenerationAdapter();
  const fromScene = {
    scene_id: "scene_01",
    creator_identity: { reference: characterReference },
    product_identity: { visual_reference: productReference }
  };
  const asset = await adapter.generateVideo({
    request_id: "test-request",
    from_scene: fromScene,
    to_scene: { scene_id: "scene_02" },
    video_prompt: { prompt: "validated video prompt" }
  });

  assert.equal(asset.status, "READY");
  assert.deepEqual(asset.references[0], characterReference);
  assert.deepEqual(asset.references[1], productReference);
});

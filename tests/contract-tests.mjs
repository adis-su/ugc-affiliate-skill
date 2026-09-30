import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { run, expectedVideoPromptCount } from "../runtime/index.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const fixturePath = path.join(here, "fixtures", "contract-fixtures.json");
const { fixtures } = JSON.parse(fs.readFileSync(fixturePath, "utf8"));

assert.ok(Array.isArray(fixtures), "fixtures must be an array");

function errorCodes(result) {
  return result.validation.blockers.map((item) => item.code);
}

function assertOutputCounts(result, expected) {
  assert.equal(result.scene_plan.length, expected.scene_count);
  assert.equal(result.image_prompts.length, expected.image_prompt_count);
  assert.equal(result.video_prompts.length, expected.video_prompt_count);
  assert.equal(
    result.video_prompts.length,
    expectedVideoPromptCount(result.scene_plan.length)
  );
  assert.deepEqual(result.validation.output_counts, {
    scene_plan: expected.scene_count,
    image_prompts: expected.image_prompt_count,
    video_prompts: expected.video_prompt_count
  });
}

function assertSceneContracts(result) {
  for (const [index, scene] of result.scene_plan.entries()) {
    assert.ok(scene.scene_id, "scene_id is required");
    assert.ok(scene.purpose, `${scene.scene_id}: purpose is required`);
    assert.ok(scene.creator_state, `${scene.scene_id}: creator_state is required`);
    assert.ok(scene.product_state, `${scene.scene_id}: product_state is required`);
    assert.ok(scene.environment_state, `${scene.scene_id}: environment_state is required`);
    assert.ok(scene.camera_state, `${scene.scene_id}: camera_state is required`);
    assert.ok(scene.continuity_lock, `${scene.scene_id}: continuity_lock is required`);

    if (index < result.scene_plan.length - 1) {
      assert.ok(scene.transition_intent, `${scene.scene_id}: transition_intent is required`);
      assert.ok(scene.transition_cause, `${scene.scene_id}: transition_cause is required`);
    }
  }
}

function assertIntelligenceContracts(result) {
  assert.ok(result.scene_plan.every((scene) => scene.creator_identity?.source));
  assert.ok(result.scene_plan.every((scene) => scene.continuity_lock?.product));
}

function assertPromptContracts(result) {
  for (const prompt of result.image_prompts) {
    assert.ok(prompt.scene_id);
    assert.ok(prompt.prompt);
    assert.ok(Array.isArray(prompt.continuity_anchors));
  }

  for (const [index, prompt] of result.video_prompts.entries()) {
    assert.equal(prompt.from_scene, result.scene_plan[index].scene_id);
    assert.equal(prompt.to_scene, result.scene_plan[index + 1].scene_id);
    assert.ok(prompt.prompt);
    assert.ok(Array.isArray(prompt.continuity_anchors));
  }
}

for (const fixture of fixtures) {
  test(`contract fixture: ${fixture.id}`, () => {
    const result = run(fixture.input);

    assert.equal(result.validation.status, fixture.expected.status);

    const actualCodes = errorCodes(result);
    for (const expectedCode of fixture.expected.errors ?? []) {
      assert.ok(
        actualCodes.includes(expectedCode),
        `${fixture.id}: expected error ${expectedCode}, got [${actualCodes.join(", ")}]`
      );
    }

    if (fixture.expected.status === "BLOCK" && fixture.expected.errors?.length) {
      assert.ok(result.validation.blockers.length > 0);
    }

    assertOutputCounts(result, fixture.expected);

    if (fixture.expected.status === "PASS") {
      assertSceneContracts(result);
      assertIntelligenceContracts(result);
      assertPromptContracts(result);
    }

    if (fixture.expected.speech_mode) {
      const hasSpoken = "spoken_script" in result;
      const hasSilent = "silent_behavior_script" in result;

      if (fixture.expected.speech_mode === "spoken") {
        assert.equal(hasSpoken, true);
        assert.equal(hasSilent, false);
      }

      if (fixture.expected.speech_mode === "silent") {
        assert.equal(hasSpoken, false);
        assert.equal(hasSilent, true);
      }
    }
  });
}

test("fixture IDs are unique", () => {
  const ids = fixtures.map((fixture) => fixture.id);
  assert.equal(new Set(ids).size, ids.length);
});

test("deterministic structural contract", () => {
  const positive = fixtures.find((fixture) => fixture.type === "positive");
  assert.ok(positive);

  const first = run(positive.input);
  const second = run(positive.input);

  assert.deepEqual(first.validation.status, second.validation.status);
  assert.deepEqual(first.validation.output_counts, second.validation.output_counts);
  assert.deepEqual(
    first.scene_plan.map((scene) => scene.scene_id),
    second.scene_plan.map((scene) => scene.scene_id)
  );
});

test("blocked requests do not enter generation", () => {
  const blocked = fixtures.find((fixture) => fixture.id === "negative-missing-creator");
  assert.ok(blocked);

  const result = run(blocked.input);

  assert.equal(result.validation.status, "BLOCK");
  assert.equal(result.scene_plan.length, 0);
  assert.equal(result.image_prompts.length, 0);
  assert.equal(result.video_prompts.length, 0);
});

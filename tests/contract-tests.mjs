import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { run, runAsync, expectedVideoPromptCount } from "../runtime/index.mjs";
import { resolveProductWithSource, fetchProductSource } from "../runtime/intelligence/product-retrieval.mjs";
import { resolveCreator } from "../runtime/knowledge/creator-library.mjs";

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
    assert.equal(prompt.continuity_anchors.length, 4);
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

test("sync and async runtimes preserve the same structural contract", async () => {
  const fixture = fixtures.find((item) => item.id === "positive-fashion-silent-mirror");
  assert.ok(fixture);
  const sync = run(fixture.input);
  const asyncResult = await runAsync(fixture.input, {
    retrieved_product_source: { status: "UNRESOLVED", source_url: null, facts: {} }
  });
  assert.equal(asyncResult.validation.status, sync.validation.status);
  assert.deepEqual(asyncResult.validation.output_counts, sync.validation.output_counts);
  assert.deepEqual(
    asyncResult.scene_plan.map((scene) => scene.scene_id),
    sync.scene_plan.map((scene) => scene.scene_id)
  );
});

test("generation fault codes are preserved in the initial blocker audit", () => {
  const fixture = fixtures.find((item) => item.id === "negative-character-drift");
  assert.ok(fixture);
  const result = run(fixture.input);
  assert.equal(result.validation.status, "BLOCK");
  assert.ok(result.validation.initial_blocker_codes.includes("IDENTITY_DRIFT"));
});

test("product source merge preserves explicit facts and provenance", () => {
  const input = {
    product: {
      product_name: "Example",
      product_url: "https://example.com/product",
      product_facts: { color: "red" }
    }
  };
  const result = resolveProductWithSource(input, {
    status: "RESOLVED",
    source_url: input.product.product_url,
    facts: { brand: "Example Brand", color: "blue", finish: "glossy" }
  });

  assert.equal(result.record.facts.color, "red");
  assert.equal(result.record.facts.brand, "Example Brand");
  assert.equal(result.record.facts.finish, "glossy");
  assert.equal(result.record.source_status, "retrieved_product_url");
  assert.ok(result.conflict_notes.some((item) => item.field === "color"));
});

test("product URL adapter validates invalid URLs without throwing", async () => {
  const result = await fetchProductSource("not-a-url");
  assert.equal(result.status, "UNRESOLVED");
  assert.deepEqual(result.errors, ["PRODUCT_URL_INVALID"]);
});

test("async runtime can consume an injected retrieved product source", async () => {
  const fixture = fixtures.find((item) => item.id === "positive-product-retrieval-provenance");
  assert.ok(fixture);
  const result = await runAsync(fixture.input, {
    retrieved_product_source: { status: "RESOLVED", source_url: fixture.input.product.product_url, facts: fixture.input.product.retrieved_facts }
  });
  assert.equal(result.validation.status, "PASS");
  assert.equal(result.validation.contract_checks.includes("product_source_provenance"), true);
});


test("creator reference is required for visual generation", () => {
  const fixture = fixtures.find((item) => item.id === "positive-fashion-silent-mirror");
  assert.ok(fixture);
  const input = { ...fixture.input, creator_identity: undefined };
  const result = run(input);
  assert.equal(result.validation.status, "BLOCK");
  assert.ok(result.validation.blockers.some((b) => b.code === "CREATOR_IDENTITY_INSUFFICIENT"));
});


test("spoken formats produce a voice-locked, duration-fit script", () => {
  const fixture = fixtures.find((item) => item.id === "positive-creator-reference-injection");
  assert.ok(fixture);
  const input = { ...fixture.input, content: { ...fixture.input.content, format: "Talking Head", custom_instructions: "spoken dialogue" } };
  const result = run(input);
  assert.equal(result.validation.status, "PASS");
  assert.equal(result.spoken_script.status, "READY");
  assert.equal(result.spoken_script.voice_identity_lock.creator, "Rositasari");
  assert.equal(result.spoken_script.duration_fit, true);
});

test("silent formats produce behavior script without speech", () => {
  const fixture = fixtures.find((item) => item.id === "positive-creator-reference-injection");
  assert.ok(fixture);
  const result = run(fixture.input);
  assert.equal(result.validation.status, "PASS");
  assert.equal(result.spoken_script, undefined);
  assert.equal(result.silent_behavior_script.scenes.every((scene) => scene.speech === "none"), true);
});


test("generation faults remain blocking and are not auto-repaired", () => {
  for (const id of ["negative-character-drift", "negative-product-teleportation", "negative-unsupported-detail"]) {
    const fixture = fixtures.find((item) => item.id === id);
    assert.ok(fixture);
    const result = run(fixture.input);
    assert.equal(result.validation.status, "BLOCK");
    assert.equal(result.validation.initial_blocker_codes.some((code) => fixture.expected.errors.includes(code)), true);
  }
});

test("repairable prompt defects are recorded separately from generation blockers", () => {
  const fixture = fixtures.find((item) => item.id === "positive-fashion-silent-mirror");
  assert.ok(fixture);
  const result = run(fixture.input);
  assert.equal(result.validation.revalidation.executed, true);
  assert.ok(Array.isArray(result.validation.initial_blocker_codes));
  assert.ok(Array.isArray(result.validation.repair_actions));
});


test("every generated image and video prompt carries the canonical Rositasari identity lock", () => {
  const fixture = fixtures.find((item) => item.id === "positive-creator-reference-injection");
  assert.ok(fixture);
  const result = run(fixture.input);
  assert.ok(result.image_prompts.length > 0);
  assert.ok(result.video_prompts.length > 0);
  for (const prompt of result.image_prompts) {
    assert.match(prompt.prompt, /CHARACTER IDENTITY LOCK: Rositasari/);
    assert.match(prompt.prompt, /Hijab/);
    assert.match(prompt.prompt, /Face\.shape: oval-rounded/);
    assert.match(prompt.prompt, /Skin\.tone: light-medium/);
  }
  for (const prompt of result.video_prompts) {
    assert.match(prompt.prompt, /CHARACTER IDENTITY LOCK: Rositasari/);
    assert.match(prompt.prompt, /Hijab/);
    assert.match(prompt.prompt, /Face\.shape: oval-rounded/);
    assert.match(prompt.prompt, /Skin\.tone: light-medium/);
  }
});

test("Rositasari character library preserves the hijab identity lock", () => {
  const creator = resolveCreator("Rositasari");
  assert.equal(creator.character_identity.hijab, "yes; hijab is part of stable visual identity");
  assert.equal(creator.character_identity.age_appearance, "25");
  assert.equal(creator.character_identity.ethnicity_style, "Southeast Asian visual appearance");
});


test("AFFILIX activation starts at the Product URL gate", async () => {
  const { createAffilixSession, activateAffilixSession, AFFILIX_STAGES, AFFILIX_CONFIG_DEFAULTS } = await import("../runtime/index.mjs");
  const activated = activateAffilixSession(createAffilixSession());
  assert.equal(activated.active, true);
  assert.equal(activated.stage, AFFILIX_STAGES.WAITING_PRODUCT_URL);
  assert.deepEqual(activated.campaign, AFFILIX_CONFIG_DEFAULTS);
});

test("AFFILIX campaign configuration preserves defaults when only one field changes", async () => {
  const { createAffilixSession, activateAffilixSession, applyAffilixCampaignConfig, AFFILIX_STAGES } = await import("../runtime/index.mjs");
  let session = activateAffilixSession(createAffilixSession());
  session = applyAffilixCampaignConfig(session, { objective: "Conversion" });
  assert.equal(session.stage, AFFILIX_STAGES.CONFIGURATION_VALIDATION);
  assert.equal(session.campaign.objective, "Affiliate Conversion");
  assert.equal(session.campaign.format, "Product Demo");
  assert.equal(session.campaign.angle, "How I Use It");
  assert.equal(session.campaign.platform, "TikTok");
  assert.equal(session.campaign.cta, "Check the Product");
  assert.equal(session.campaign.creator, "Rositasari");
  assert.equal(session.campaign.speech, "Spoken");
});

test("AFFILIX rejects a silent-format and spoken-mode conflict", async () => {
  const { createAffilixSession, activateAffilixSession, applyAffilixCampaignConfig, validateAffilixCampaignConfig } = await import("../runtime/index.mjs");
  let session = activateAffilixSession(createAffilixSession());
  session = applyAffilixCampaignConfig(session, {
    objective: "Conversion",
    format: "Silent Mirror Selfie",
    angle: "How I Use It",
    speech: "Spoken"
  });
  const checked = validateAffilixCampaignConfig(session);
  assert.equal(checked.status, "BLOCK");
  assert.ok(checked.blockers.some((item) => item.code === "SPEECH_MODE_CONFLICT"));
});


test("AFFILIX input router advances activation and preserves campaign state", async () => {
  const { createAffilixSession, handleAffilixInput, AFFILIX_STAGES, isAffilixConfigurationReady } = await import("../runtime/index.mjs");
  let session = handleAffilixInput(createAffilixSession(), { command: "/Affilix" });
  assert.equal(session.stage, AFFILIX_STAGES.WAITING_PRODUCT_URL);
  session = handleAffilixInput(session, { product_url: "https://example.com/product" });
  assert.equal(session.stage, AFFILIX_STAGES.PRODUCT_RESOLUTION);
  session = { ...session, stage: AFFILIX_STAGES.CAMPAIGN_CONFIGURATION };
  session = handleAffilixInput(session, { campaign: {
    objective: "Conversion",
    format: "Product Demo",
    angle: "How I Use It",
    platform: "TikTok",
    cta: "Check Product",
    creator: "Rositasari",
    speech: "Spoken"
  }});
  assert.equal(session.campaign.objective, "Affiliate Conversion");
  assert.equal(session.campaign.cta, "Check the Product");
  assert.equal(isAffilixConfigurationReady(session), true);
});

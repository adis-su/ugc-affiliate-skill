import test from "node:test";
import assert from "node:assert/strict";
import { ROSITASARI_VOICE_IDENTITY, ROSITASARI_VOICE_PROFILE_STATUS } from "../runtime/knowledge/voice-library.mjs";

test("Rositasari voice profile is Indonesian and conversational", () => {
  assert.equal(ROSITASARI_VOICE_IDENTITY.id, "rositasari-voice-profile-v1");
  assert.equal(ROSITASARI_VOICE_IDENTITY.language, "id-ID");
  assert.equal(ROSITASARI_VOICE_IDENTITY.gender_presentation, "female");
  assert.match(ROSITASARI_VOICE_IDENTITY.tempo, /conversational/i);
  assert.match(ROSITASARI_VOICE_IDENTITY.timbre, /warm/i);
});

test("Rositasari profile does not fabricate a voice reference", () => {
  assert.equal(ROSITASARI_VOICE_IDENTITY.reference, null);
  assert.equal(ROSITASARI_VOICE_PROFILE_STATUS.reference_status, "MISSING");
  assert.equal(ROSITASARI_VOICE_PROFILE_STATUS.generation_status, "BLOCKED_UNTIL_APPROVED_REFERENCE");
});

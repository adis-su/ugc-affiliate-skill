import test from "node:test";
import assert from "node:assert/strict";
import { RealVoiceProviderAdapter } from "../runtime/generation/real-voice-provider.mjs";

const request = {
  request_id: "voice-001",
  scene_id: "scene_01",
  text: "Hai, ini Rositasari.",
  voice_identity: { language: "id-ID", prosody: "conversational" },
  references: [{ type: "voice", id: "rositasari-voice-v1" }]
};

test("blocks when provider config is missing", async () => {
  const provider = new RealVoiceProviderAdapter({ api_key: null, api_url: null });
  const result = await provider.generateVoice(request);
  assert.equal(result.status, "BLOCK");
  assert.equal(result.error.code, "CONFIG_MISSING");
});

test("blocks invalid request without voice reference", async () => {
  const provider = new RealVoiceProviderAdapter({ api_key: "key", api_url: "https://voice.invalid" });
  const result = await provider.generateVoice({ ...request, references: [] });
  assert.equal(result.status, "BLOCK");
  assert.equal(result.error.code, "REQUEST_INVALID");
});

test("normalizes a valid provider response", async () => {
  const provider = new RealVoiceProviderAdapter({
    api_key: "key",
    api_url: "https://voice.invalid",
    fetch_impl: async () => ({
      ok: true,
      json: async () => ({ audio_url: "https://cdn.invalid/rositasari.wav", duration_ms: 2400, format: "wav" })
    })
  });

  const result = await provider.generateVoice(request);
  assert.equal(result.status, "READY");
  assert.equal(result.asset_uri, "https://cdn.invalid/rositasari.wav");
  assert.deepEqual(result.voice_reference_ids, ["rositasari-voice-v1"]);
});

test("returns structured request failure", async () => {
  const provider = new RealVoiceProviderAdapter({
    api_key: "key",
    api_url: "https://voice.invalid",
    fetch_impl: async () => ({ ok: false, status: 503 })
  });

  const result = await provider.generateVoice(request);
  assert.equal(result.status, "BLOCK");
  assert.equal(result.error.code, "REQUEST_FAILED");
});

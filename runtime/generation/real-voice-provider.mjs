const REQUIRED_CONFIG = ["api_key", "api_url"];

export class RealVoiceProviderAdapter {
  constructor(config = {}) {
    this.provider = config.provider ?? "real-voice";
    this.apiKey = config.api_key ?? process.env.VOICE_API_KEY ?? null;
    this.apiUrl = config.api_url ?? process.env.VOICE_API_URL ?? null;
    this.model = config.model ?? process.env.VOICE_MODEL ?? null;
    this.fetchImpl = config.fetch_impl ?? globalThis.fetch;
  }

  configStatus() {
    const missing = REQUIRED_CONFIG.filter((key) => key === "api_key" ? !this.apiKey : !this.apiUrl);
    return missing.length ? { valid: false, code: "CONFIG_MISSING", missing } : { valid: true };
  }

  normalizeResponse(payload, request) {
    const assetUri = payload?.asset_uri ?? payload?.output?.url ?? payload?.audio_url ?? payload?.data?.[0]?.url ?? null;
    if (!assetUri) return { status: "BLOCK", provider: this.provider, request_id: request.request_id, scene_id: request.scene_id ?? null, model: this.model, error: { code: "ASSET_MISSING", stage: "voice_generation", severity: "BLOCKER", message: "Voice provider response did not contain a usable audio asset URI." } };
    return { status: "READY", provider: this.provider, request_id: request.request_id, scene_id: request.scene_id ?? null, model: this.model, text: request.text, voice_reference_ids: request.references.map((reference) => reference.id ?? reference.uri).filter(Boolean), asset_uri: assetUri, duration_ms: payload?.duration_ms ?? payload?.output?.duration_ms ?? null, format: payload?.format ?? payload?.output?.format ?? null, validation: { status: "PENDING" } };
  }

  async generateVoice(request) {
    const config = this.configStatus();
    if (!config.valid) return { status: "BLOCK", provider: this.provider, request_id: request?.request_id, error: { code: config.code, stage: "voice_generation", severity: "BLOCKER", message: "Real voice provider configuration is incomplete.", missing: config.missing } };
    if (!request?.request_id || !request?.text || !Array.isArray(request.references)) return { status: "BLOCK", provider: this.provider, error: { code: "REQUEST_INVALID", stage: "voice_generation", severity: "BLOCKER", message: "Real voice generation requires request_id, text, and a voice identity." } };
    try {
      const response = await this.fetchImpl(this.apiUrl, { method: "POST", headers: { "content-type": "application/json", authorization: "Bearer " + this.apiKey }, body: JSON.stringify({ model: this.model, text: request.text, voice_identity: request.voice_identity ?? null, references: request.references, options: request.options ?? {} }) });
      if (!response?.ok) return { status: "BLOCK", provider: this.provider, request_id: request.request_id, error: { code: "REQUEST_FAILED", stage: "voice_generation", severity: "BLOCKER", message: "Voice provider request failed with HTTP " + (response?.status ?? "unknown") + "." } };
      let payload;
      try { payload = await response.json(); } catch { return { status: "BLOCK", provider: this.provider, request_id: request.request_id, error: { code: "RESPONSE_INVALID", stage: "voice_generation", severity: "BLOCKER", message: "Voice provider returned a non-JSON response." } }; }
      return this.normalizeResponse(payload, request);
    } catch (error) {
      return { status: "BLOCK", provider: this.provider, request_id: request.request_id, error: { code: "REQUEST_FAILED", stage: "voice_generation", severity: "BLOCKER", message: error?.message ?? "Voice provider request failed." } };
    }
  }
}

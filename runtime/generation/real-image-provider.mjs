const REQUIRED_CONFIG = ["api_key", "api_url"];

export class RealImageProviderAdapter {
  constructor(config = {}) {
    this.provider = config.provider ?? "real-image";
    this.apiKey = config.api_key ?? process.env.IMAGE_API_KEY ?? null;
    this.apiUrl = config.api_url ?? process.env.IMAGE_API_URL ?? null;
    this.model = config.model ?? process.env.IMAGE_MODEL ?? null;
    this.fetchImpl = config.fetch_impl ?? globalThis.fetch;
  }

  configStatus() {
    const missing = REQUIRED_CONFIG.filter((key) => key === "api_key" ? !this.apiKey : !this.apiUrl);
    return missing.length ? { valid: false, code: "CONFIG_MISSING", missing } : { valid: true };
  }

  normalizeResponse(payload, request) {
    const assetUri = payload?.asset_uri ?? payload?.output?.url ?? payload?.data?.[0]?.url ?? null;
    if (!assetUri) {
      return { status: "BLOCK", provider: this.provider, request_id: request.request_id, scene_id: request.scene_id, model: this.model, error: { code: "ASSET_MISSING", stage: "image_generation", severity: "BLOCKER", message: "Provider response did not contain a usable image asset URI." } };
    }
    return { status: "READY", provider: this.provider, request_id: request.request_id, scene_id: request.scene_id, model: this.model, prompt: request.prompt, reference_ids: request.references.map((reference) => reference.id ?? reference.uri), asset_uri: assetUri, validation: { status: "PENDING" } };
  }

  async generateImage(request) {
    const config = this.configStatus();
    if (!config.valid) return { status: "BLOCK", provider: this.provider, request_id: request?.request_id, scene_id: request?.scene_id, error: { code: config.code, stage: "image_generation", severity: "BLOCKER", message: "Real image provider configuration is incomplete.", missing: config.missing } };
    if (!request?.request_id || !request?.scene_id || !request?.prompt) return { status: "BLOCK", provider: this.provider, error: { code: "REQUEST_INVALID", stage: "image_generation", severity: "BLOCKER", message: "Real image generation requires request_id, scene_id, and prompt." } };
    const references = Array.isArray(request.references) ? request.references : [];
    try {
      const response = await this.fetchImpl(this.apiUrl, { method: "POST", headers: { "content-type": "application/json", authorization: `Bearer ${this.apiKey}` }, body: JSON.stringify({ model: this.model, prompt: request.prompt, references, options: request.options ?? {} }) });
      if (!response?.ok) return { status: "BLOCK", provider: this.provider, request_id: request.request_id, scene_id: request.scene_id, error: { code: "REQUEST_FAILED", stage: "image_generation", severity: "BLOCKER", message: `Image provider request failed with HTTP ${response?.status ?? "unknown"}.` } };
      let payload;
      try { payload = await response.json(); } catch { return { status: "BLOCK", provider: this.provider, request_id: request.request_id, scene_id: request.scene_id, error: { code: "RESPONSE_INVALID", stage: "image_generation", severity: "BLOCKER", message: "Image provider returned a non-JSON response." } }; }
      return this.normalizeResponse(payload, { ...request, references });
    } catch (error) {
      return { status: "BLOCK", provider: this.provider, request_id: request.request_id, scene_id: request.scene_id, error: { code: "REQUEST_FAILED", stage: "image_generation", severity: "BLOCKER", message: error?.message ?? "Image provider request failed." } };
    }
  }
}

import { validateRequiredCharacterReference, validateProductReference } from "./reference-contract.mjs";

export class ImageGenerationAdapter {
  constructor(provider = "mock") {
    this.provider = provider;
  }

  async generateImage({ request_id, scene, image_prompt, references = [], options = {} }) {
    if (!scene?.scene_id) {
      return { status: "BLOCK", error: { code: "GENERATION_SCENE_MISSING", stage: "image_generation", severity: "BLOCKER", message: "Image generation requires a resolved scene." } };
    }

    if (!image_prompt?.prompt) {
      return { status: "BLOCK", error: { code: "GENERATION_PROMPT_MISSING", stage: "image_generation", severity: "BLOCKER", message: "Image generation requires a validated image prompt." } };
    }

    const characterReference = validateRequiredCharacterReference(scene, references);
    if (!characterReference.valid) {
      return { status: "BLOCK", provider: this.provider, request_id, scene_id: scene.scene_id, error: characterReference.error };
    }

    const productReference = validateProductReference(scene, references);

    return {
      status: "READY",
      provider: this.provider,
      request_id,
      scene_id: scene.scene_id,
      prompt: image_prompt.prompt,
      references: [characterReference.reference, ...(productReference.reference ? [productReference.reference] : []), ...references.filter((reference) => reference !== characterReference.reference && reference !== productReference.reference)],
      options,
      asset_uri: null,
      validation: { status: "PENDING" }
    };
  }
}

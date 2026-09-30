import { validateRequiredCharacterReference } from "./reference-contract.mjs";

export class VideoGenerationAdapter {
  constructor(provider = "mock") {
    this.provider = provider;
  }

  async generateVideo({ request_id, from_scene, to_scene, video_prompt, start_frame = null, end_frame = null, references = [], options = {} }) {
    if (!from_scene?.scene_id || !to_scene?.scene_id) {
      return { status: "BLOCK", error: { code: "GENERATION_SCENE_PAIR_MISSING", stage: "video_generation", severity: "BLOCKER", message: "Video generation requires a resolved consecutive scene pair." } };
    }

    if (!video_prompt?.prompt) {
      return { status: "BLOCK", error: { code: "GENERATION_PROMPT_MISSING", stage: "video_generation", severity: "BLOCKER", message: "Video generation requires a validated video prompt." } };
    }

    const characterReference = validateRequiredCharacterReference(from_scene, references);
    if (!characterReference.valid) {
      return { status: "BLOCK", provider: this.provider, request_id, from_scene_id: from_scene.scene_id, to_scene_id: to_scene.scene_id, error: characterReference.error };
    }

    return {
      status: "READY",
      provider: this.provider,
      request_id,
      from_scene_id: from_scene.scene_id,
      to_scene_id: to_scene.scene_id,
      prompt: video_prompt.prompt,
      start_frame,
      end_frame,
      references: [characterReference.reference, ...references.filter((reference) => reference !== characterReference.reference)],
      options,
      asset_uri: null,
      validation: { status: "PENDING" }
    };
  }
}

const BLOCKER_CODES = new Set([
  "IDENTITY_DRIFT",
  "PRODUCT_DRIFT",
  "CONTINUITY_BREAK",
  "UNSUPPORTED_DETAIL"
]);

export function validateGeneratedAsset(asset, expected = {}) {
  const blockers = [];

  if (!asset || asset.status === "BLOCK") {
    blockers.push({
      code: asset?.error?.code ?? "GENERATED_ASSET_MISSING",
      stage: "generation_validation",
      severity: "BLOCKER",
      message: asset?.error?.message ?? "Generated asset is missing."
    });
  }

  if (expected.scene_id && asset?.scene_id && asset.scene_id !== expected.scene_id) {
    blockers.push({
      code: "CONTINUITY_BREAK",
      stage: "generation_validation",
      severity: "BLOCKER",
      message: "Generated asset is mapped to the wrong scene."
    });
  }

  if (
    expected.from_scene_id &&
    expected.to_scene_id &&
    (
      asset?.from_scene_id !== expected.from_scene_id ||
      asset?.to_scene_id !== expected.to_scene_id
    )
  ) {
    blockers.push({
      code: "CONTINUITY_BREAK",
      stage: "generation_validation",
      severity: "BLOCKER",
      message: "Generated video asset is mapped to the wrong scene transition."
    });
  }

  for (const code of asset?.validation?.blockers ?? []) {
    if (BLOCKER_CODES.has(code)) {
      blockers.push({
        code,
        stage: "generation_validation",
        severity: "BLOCKER",
        message: `Generated asset reported blocker: ${code}`
      });
    }
  }

  return {
    status: blockers.length ? "BLOCK" : "PASS",
    blockers
  };
}

const BLOCKER_CODES = new Set([
  "IDENTITY_DRIFT",
  "PRODUCT_DRIFT",
  "CONTINUITY_BREAK",
  "UNSUPPORTED_DETAIL"
]);

function blocker(code, message, details = {}) {
  return { code, stage: "generation_validation", severity: "BLOCKER", message, ...details };
}

function referenceIds(asset) {
  return new Set((asset?.reference_ids ?? []).filter(Boolean));
}

function validateReferences(asset, expected) {
  const blockers = [];
  const actual = referenceIds(asset);
  for (const required of expected.required_reference_ids ?? []) {
    if (!actual.has(required)) blockers.push(blocker("REFERENCE_MISSING", "Generated asset is missing a required reference.", { reference_id: required }));
  }
  return blockers;
}

export function validateGeneratedAsset(asset, expected = {}) {
  const blockers = [];

  if (!asset || asset.status === "BLOCK") {
    blockers.push(blocker(asset?.error?.code ?? "GENERATED_ASSET_MISSING", asset?.error?.message ?? "Generated asset is missing."));
  }

  if (asset && asset.status === "READY" && !asset.asset_uri) {
    blockers.push(blocker("ASSET_MISSING", "Generated asset is marked READY without an asset URI."));
  }

  if (expected.provider && asset?.provider && asset.provider !== expected.provider) {
    blockers.push(blocker("PROVIDER_MISMATCH", "Generated asset came from an unexpected provider."));
  }

  if (expected.scene_id && asset?.scene_id && asset.scene_id !== expected.scene_id) {
    blockers.push(blocker("CONTINUITY_BREAK", "Generated asset is mapped to the wrong scene."));
  }

  if (expected.from_scene_id && expected.to_scene_id &&
      (asset?.from_scene_id !== expected.from_scene_id || asset?.to_scene_id !== expected.to_scene_id)) {
    blockers.push(blocker("CONTINUITY_BREAK", "Generated video asset is mapped to the wrong scene transition."));
  }

  blockers.push(...validateReferences(asset, expected));

  for (const code of asset?.validation?.blockers ?? []) {
    if (BLOCKER_CODES.has(code)) blockers.push(blocker(code, `Generated asset reported blocker: ${code}`));
  }

  return {
    status: blockers.length ? "BLOCK" : "PASS",
    blockers,
    asset: blockers.length ? null : { ...asset, validation: { ...(asset.validation ?? {}), status: "PASSED" } }
  };
}

export function validateImageAsset(asset, expected = {}) {
  return validateGeneratedAsset(asset, expected);
}

export function validateVideoAsset(asset, expected = {}) {
  return validateGeneratedAsset(asset, expected);
}

const BLOCKER_CODES = new Set([
  "VOICE_IDENTITY_DRIFT",
  "VOICE_REFERENCE_MISSING",
  "PRONUNCIATION_DRIFT",
  "PROSODY_DRIFT",
  "PACING_DRIFT",
  "SYNTHETIC_ARTIFACT",
  "AUDIO_MISSING",
  "VOICE_CONTINUITY_BREAK"
]);

function blocker(code, message, details = {}) {
  return { code, stage: "voice_validation", severity: "BLOCKER", message, ...details };
}

export function validateVoiceAsset(asset, expected = {}) {
  const blockers = [];

  if (!asset || asset.status === "BLOCK") {
    blockers.push(blocker(asset?.error?.code ?? "AUDIO_MISSING", asset?.error?.message ?? "Generated voice asset is missing."));
  }

  if (asset && asset.status === "READY" && !asset.asset_uri) {
    blockers.push(blocker("AUDIO_MISSING", "Voice asset is marked READY without an audio asset URI."));
  }

  if (expected.provider && asset?.provider && asset.provider !== expected.provider) {
    blockers.push(blocker("VOICE_CONTINUITY_BREAK", "Voice asset came from an unexpected provider."));
  }

  const actualReferences = new Set((asset?.voice_reference_ids ?? []).filter(Boolean));
  for (const required of expected.required_voice_reference_ids ?? []) {
    if (!actualReferences.has(required)) {
      blockers.push(blocker("VOICE_REFERENCE_MISSING", "Generated voice asset is missing the required Voice Reference.", { reference_id: required }));
    }
  }

  for (const code of asset?.validation?.blockers ?? []) {
    if (BLOCKER_CODES.has(code)) {
      blockers.push(blocker(code, "Generated voice asset reported a realism blocker."));
    }
  }

  const checks = expected.checks ?? {};
  if (checks.identity_match === false) blockers.push(blocker("VOICE_IDENTITY_DRIFT", "Speaker identity does not match the approved Voice Reference."));
  if (checks.pronunciation_match === false) blockers.push(blocker("PRONUNCIATION_DRIFT", "Pronunciation deviates from the expected language or delivery."));
  if (checks.prosody_natural === false) blockers.push(blocker("PROSODY_DRIFT", "Prosody does not match the natural conversational target."));
  if (checks.pacing_natural === false) blockers.push(blocker("PACING_DRIFT", "Speech pacing is unnaturally uniform or inconsistent."));
  if (checks.synthetic_artifacts === true) blockers.push(blocker("SYNTHETIC_ARTIFACT", "Audio contains detected synthetic-sounding artifacts."));

  return {
    status: blockers.length ? "BLOCK" : "PASS",
    blockers,
    asset: blockers.length ? null : { ...asset, validation: { ...(asset.validation ?? {}), status: "PASSED" } }
  };
}

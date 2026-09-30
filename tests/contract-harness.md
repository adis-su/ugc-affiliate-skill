# Contract Test Harness Specification

This document defines the first executable-test boundary for the UGC Affiliate Skill.

The fixture source is:

- `tests/fixtures/contract-fixtures.json`

The harness is intentionally structural. It tests runtime contracts, validation behavior, output counts, and continuity invariants. It must not inspect hidden reasoning or judge whether creative wording is aesthetically pleasing.

## 1. Runner Contract

A test runner loads every fixture and invokes the runtime with:

```
runtime.run(fixture.input)
```

For fixtures with `fixture_setup`, the runner may inject deterministic mock data or a controlled fault into the test runtime.

The runner then compares the runtime result with `fixture.expected`.

## 2. Required Assertions

For every fixture:

1. Runtime status matches `expected.status`.
2. Expected error codes are present.
3. No unexpected blocker codes are present unless explicitly allowed by the fixture.
4. Scene count matches when the runtime reaches scene planning.
5. Image prompt count matches.
6. Video prompt count matches.
7. Speech mode matches when specified.
8. Required structural invariants pass.

## 3. Count Rules

For a successful generation with N scenes:

```
scene_plan.length = N
image_prompts.length = N
video_prompts.length = max(N - 1, 0)
```

If a blocker occurs before scene planning:

```
scene_plan.length = 0
image_prompts.length = 0
video_prompts.length = 0
```

If a downstream blocker occurs after generation, the harness may assert the generated counts while requiring the final status to be BLOCK.

## 4. Error Matching

Error matching is code-based, not message-based.

Example:

```
expected.errors = ["CREATOR_NOT_FOUND"]
```

The harness passes when that error code is present, regardless of wording in the human-readable error message.

This keeps tests stable when error prose is improved.

## 5. Positive Fixtures

The initial positive suite covers:

- Fashion / Silent Mirror Selfie
- Beauty / Product Application
- Home / Problem → Solution
- Fashion / Talking Head

These fixtures verify:

- valid niche/format/angle combinations,
- duration and scene-count compatibility,
- creator resolution,
- output count contracts,
- silent/spoken mode separation,
- multi-platform input.

## 6. Negative Fixtures

The initial negative suite covers:

- missing creator,
- invalid format × angle,
- impossible duration density,
- silent format with speech instructions,
- product-source conflict,
- character identity drift,
- product teleportation / continuity break,
- unsupported product claim.

The suite should grow whenever a new blocker class is introduced.

## 7. Structural Invariant Assertions

The harness should expose reusable assertions:

### Request Assertions

- required fields exist,
- enum values are valid,
- creator resolves,
- at least one platform exists.

### Product Assertions

- product identity lock exists,
- product conflicts are not silently discarded,
- unsupported claims are blocked,
- product state changes have causes.

### Creator Assertions

- one creator identity source exists,
- Character Identity Lock is stable,
- Character Reference is stable when used,
- Voice Identity is present when speech is required,
- silent formats do not generate speech.

### Scene Assertions

- every scene has one dominant purpose,
- non-final scenes have transition intent and cause,
- continuity locks are inherited,
- scene state is complete enough for downstream prompt generation.

### Image Assertions

- one prompt per scene,
- one visual state per prompt,
- no future action sequences,
- identity/product locks preserved.

### Video Assertions

- one prompt per consecutive scene pair,
- start state matches previous image anchor,
- end state matches next image anchor,
- meaningful state changes have causes,
- product/material movement is plausible,
- no identity drift.

## 8. Repair Assertions

When a fixture represents a repairable downstream failure:

1. The validator identifies the failed contract.
2. The runtime performs the smallest valid repair.
3. Dependent output is regenerated.
4. The final validation result is rerun.
5. The repair does not silently mutate unrelated state.

A repair test should record:

```
failed_contract
→ repair_action
→ affected_stage
→ revalidation_result
```

## 9. Determinism Assertions

Run the same fixture twice with identical deterministic inputs.

Assert:

- same resolved niche,
- same format,
- same angle,
- same duration,
- same scene count,
- same output section structure,
- same validation status,
- same blocker/error codes.

Exact creative wording does not need to be byte-identical unless the eventual runtime explicitly guarantees deterministic text generation.

## 10. Fixture Naming

Use:

```
<positive|negative>-<domain>-<behavior>
```

Examples:

- `positive-fashion-silent-mirror`
- `negative-fashion-character-drift`

IDs must remain stable after publication because regression systems may reference them directly.

## 11. Exit Codes

A command-line implementation should use:

- `0` — all selected tests pass
- `1` — one or more assertions fail
- `2` — fixture or runner configuration error

A blocked generation is not itself a test failure when the fixture explicitly expects BLOCK.

## 12. Reporting

Minimum report:

```
Contract Test Report
--------------------
Total: X
Passed: X
Failed: X

Failures:
- fixture_id
  - assertion
  - expected
  - actual

Runtime Errors:
- fixture_id
  - code
  - stage
  - message
```

The report should separate:

- expected runtime blockers,
- unexpected runtime failures,
- harness failures.

## 13. Regression Rule

Every bug that reaches production-quality review should produce a fixture or assertion before the bug is considered closed.

Examples:

- character drift → identity-drift fixture,
- product teleportation → continuity fixture,
- silent speech injection → speech-mode fixture,
- unsupported product claim → unsupported-detail fixture,
- output count mismatch → count assertion.

## 14. Current Boundary

The repository now contains:

```
runtime/runtime-interface.md
        ↓
tests/fixtures/contract-fixtures.json
        ↓
this harness specification
```

The next implementation step is a concrete runner.

Because the repository does not yet define a runtime implementation language or executable generation module, the runner must be added only after that execution target is selected. The fixtures and assertions are deliberately language-neutral so they can become the contract tests for the actual runtime instead of becoming a second competing implementation.

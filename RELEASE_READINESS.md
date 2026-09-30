# v0.1.0 Release Readiness

## Release Scope

Version 0.1.0 establishes the contract-first foundation for UGC Affiliate Skill across Fashion, Beauty, and Home.

The release includes:

- canonical `SKILL.md` specification;
- direct ChatGPT execution guide;
- Rositasari creator identity contract;
- Product Intelligence and Product URL retrieval boundary;
- Campaign Intelligence;
- Creative Logic and Scene State Model;
- Content Behavior;
- Image Prompt Engine;
- Frame-to-Frame Video Prompt Engine;
- Human Realism and consistency constraints;
- executable Node.js contract runtime;
- machine-readable fixtures;
- executable regression tests;
- local repair boundaries.

## Release Gates

### 1. Specification

- [x] `SKILL.md` defines the core pipeline.
- [x] Output order and count invariants are documented.
- [x] Product and creator source-of-truth rules are documented.
- [x] Unsupported-detail rules are documented.
- [x] Silent/spoken behavior is documented.

### 2. ChatGPT Execution

- [x] `CHATGPT.md` exists.
- [x] Bootstrap prompt is documented.
- [x] File loading order is documented.
- [x] Input template is documented.
- [x] Output contract is documented.
- [x] ChatGPT mode is explicitly separated from Node runtime mode.

### 3. Runtime

- [x] Sync runtime exists.
- [x] Async runtime exists.
- [x] Product retrieval boundary exists.
- [x] Creator reference boundary exists.
- [x] Structural output counts are deterministic.
- [x] Validation runs after generation.
- [x] Repairable defects have a local repair boundary.
- [x] Generation blockers remain blocking.
- [x] Initial blocker codes and repair actions are recorded.

### 4. Test Coverage

- [x] Positive fixtures exist.
- [x] Negative fixtures exist.
- [x] Creator identity requirements are tested.
- [x] Product conflict/provenance behavior is tested.
- [x] Silent/spoken behavior is tested.
- [x] Generation faults are tested as non-repairable blockers.
- [x] Sync/async structural parity is covered.
- [x] Repair audit fields are covered.

### 5. Documentation Alignment

- [x] README points to the ChatGPT execution layer.
- [x] Integration audit reflects executable tests.
- [x] Beauty example matches the silent Product Application contract.
- [x] Examples preserve unsupported-detail constraints.

## Known Release Limitations

### Creator References

Rositasari's actual Character Reference and Voice Reference are intentionally not fabricated in the repository.

Character Identity and Voice Identity are sufficient for the corresponding generation paths. References are optional conditioning inputs and do not create approval gates.

### Live Product Retrieval

Product URL retrieval depends on network access and the target site's HTML/JSON-LD structure.

If retrieval fails, the runtime must use only supplied facts and keep unresolved attributes unknown.

### Creative Quality Evaluation

The executable tests verify structural and truth/continuity contracts. They do not establish subjective creative quality.

Real generation evaluation still needs model-output review against:

- human-looking UGC;
- natural behavior;
- believable product interaction;
- camera realism;
- material physics;
- continuity quality;
- platform-native feel.

## Release Command

Run from the repository root:

```bash
npm test
```

Do not label v0.1.0 test-green until the command completes successfully in a real Node.js environment.

## Definition of Ready

v0.1.0 is structurally ready when:

1. the test suite passes;
2. no release blocker remains;
3. optional creator references are supplied when stronger reference conditioning is desired;
4. representative generated outputs pass human realism and continuity review.

## Current Generation Integration Status

The repository now includes provider-neutral adapters plus real image, video, and voice provider boundaries, post-generation validation, and regeneration policies. Provider credentials and endpoints remain environment-specific.

The remaining production work is operational provider configuration and human review of representative generated assets. These steps must not weaken the identity, product, continuity, or unsupported-detail contracts.

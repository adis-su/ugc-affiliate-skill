# Runtime Interface Specification

This document defines the machine-oriented interfaces required to execute the UGC Affiliate Skill consistently.

The interface layer does not replace the creative specifications. It gives every stage a predictable contract so that an eventual runtime or test harness can execute the system without relying on prose interpretation.

## 1. Canonical Request

Every generation request is represented as:

```text
Request
├── niche
├── product
│   ├── product_name
│   ├── product_url
│   └── product_facts
├── campaign
│   ├── objective
│   ├── stage
│   └── cta
├── creator
├── content
│   ├── format
│   ├── angle
│   ├── duration_sec
│   ├── scene_count
│   └── custom_instructions
└── platform[]
```

### Required Fields

- `niche`
- `product.product_name`
- `campaign.objective`
- `campaign.stage`
- `campaign.cta`
- `creator`
- `content.format`
- `content.angle`
- `content.duration_sec`
- `content.scene_count`
- at least one `platform`

### Allowed Niche Values

- Fashion
- Beauty
- Home

### Creator

Currently supported:

- Rositasari

The runtime must resolve the creator from the Creator Library, then merge any explicit creator reference data without inventing missing identity attributes.

### Platform Values

- TikTok
- Instagram Reels
- Facebook Reels
- Shopee Video

Unknown enum values are blockers unless an explicit normalization rule exists.

## 2. Canonical Resolved Request

After normalization and validation, produce:

```text
ResolvedRequest
├── normalized_request
├── validation_status
├── resolved_niche
├── resolved_format
├── resolved_angle
├── resolved_creator
├── product_source_status
├── resolved_duration_sec
├── resolved_scene_count
├── platform[]
├── blockers[]
└── warnings[]
```

### Validation Status

Allowed:

- `PASS`
- `WARNING`
- `BLOCK`

A request with one or more blockers must not enter creative generation.

## 3. Stage Interface Contract

Every runtime stage follows:

```text
StageInput
    ↓
Stage Processing
    ↓
StageOutput
    ↓
Stage Validation
```

Every stage must declare:

- input contract,
- output contract,
- source of truth,
- validation rules,
- blocker conditions,
- repair behavior,
- downstream consumers.

A stage may transform information but must not silently redefine another stage's source of truth.

## 4. Product Intelligence Interface

### Input

- Product Name
- Product URL when supplied
- User Product Facts when supplied
- Retrieved Product Facts when supplied by an external retrieval adapter

### Output

```text
ProductIntelligence
├── record
├── identity_lock
├── state_model
├── supported_claims[]
├── unknown_attributes[]
├── source_notes[]
└── conflict_notes[]
```

### Required Invariants

- one product source of truth,
- no unsupported product claims,
- unknown attributes remain unknown,
- identity lock remains stable,
- state changes require cause.

## 5. Creator Intelligence Interface

### Input

- Creator name
- Creator Library record
- Character Reference when available
- Voice Reference when available
- Explicit creator identity overrides when supplied

### Output

```text
CreatorIntelligence
├── character_identity
├── character_reference_status
├── character_identity_lock
├── voice_identity
├── voice_reference_status
├── voice_identity_lock
├── unknown_attributes[]
└── conflict_notes[]
```

For silent formats, voice fields may be omitted from active generation state.

### Required Invariants

- creator resolves from Creator Library,
- Character Identity remains stable,
- Character Reference remains stable when used,
- Voice Identity remains stable when speech is used,
- no unsupported identity attributes are introduced.

## 6. Campaign Intelligence Interface

### Input

- objective
- stage
- CTA
- product intelligence
- format
- angle

### Output

```text
CampaignIntelligence
├── objective
├── stage
├── cta
├── product_role
├── viewer_takeaway
├── required_evidence[]
├── behavior_direction
├── cta_behavior
├── speech_requirement
├── campaign_constraints[]
└── unknowns[]
```

### Required Invariants

Campaign intent must become observable behavior.

No campaign field may silently change after this stage.

## 7. Creative Concept Interface

### Input

- Resolved Request
- Product Intelligence
- Creator Intelligence
- Campaign Intelligence
- Format
- Angle
- Duration
- Scene Count
- Platform

### Output

```text
CreativeConcept
├── core_idea
├── viewer_takeaway
├── product_role
├── creator_role
├── hook
├── evidence[]
├── behavioral_beat
├── cta_role
├── ending_state
└── ugc_guardrail
```

### Required Invariants

- one coherent concept,
- product truth preserved,
- campaign evidence represented,
- format behavior respected,
- no unsupported identity or product claims.

## 8. Scene State Interface

The Scene State Model is the central shared interface between planning and prompt generation.

### Output

```text
SceneState[]
├── scene_id
├── purpose
├── creator_state
├── product_state
├── environment_state
├── camera_state
├── behavior_cue
├── required_evidence[]
├── continuity_lock
├── transition_intent
├── transition_cause
└── speech_state
```

`transition_intent` and `transition_cause` are required for every non-final scene.

### Scene State Invariants

- one dominant purpose per scene,
- one defined visual state,
- all relevant product and creator states are explicit,
- every meaningful state change has a cause,
- continuity locks are inherited.

## 9. Content Behavior Interface

### Input

- Scene State
- Creative Concept
- Format
- Niche
- Creator Intelligence
- Product Intelligence

### Output

```text
BehaviorPlan
├── scene_id
├── intent
├── attention_target
├── primary_action
├── supporting_action
├── micro_behavior
├── product_interaction
├── reaction
├── camera_behavior
├── transition_behavior
├── speech_behavior
├── silent_behavior
└── behavior_constraints[]
```

### Required Invariants

- one primary action,
- gaze follows task,
- product interaction is physically plausible,
- micro-behavior is restrained,
- behavior causes the planned state transition,
- silent and spoken modes do not conflict.

## 10. Image Prompt Interface

### Input

- Scene State
- Behavior Plan
- Character Identity Lock
- Product Identity Lock
- Creative Concept
- Niche / Format / Angle

### Output

```text
ImagePrompt
├── scene_id
├── prompt
├── continuity_anchors[]
└── validation
```

### Required Invariants

- one scene → one image prompt,
- one prompt → one visual state,
- no future actions,
- required evidence visible,
- identity and product locks preserved,
- unsupported details absent.

## 11. Video Prompt Interface

### Input

- Scene State N
- Scene State N+1
- Behavior Plan N
- Behavior Plan N+1 when needed
- Image Prompt N
- Image Prompt N+1
- Identity and continuity locks

### Output

```text
VideoPrompt
├── transition_id
├── from_scene
├── to_scene
├── prompt
├── continuity_anchors[]
└── validation
```

### Required Invariants

- one consecutive scene pair → one video prompt,
- start state matches Scene N,
- end state matches Scene N+1,
- every meaningful state change has a physical cause,
- human movement is plausible,
- product/material movement is plausible,
- camera movement is motivated,
- no identity drift.

## 12. Validation Interface

Every stage may emit validation results, but the runtime also performs a final contract validation.

Canonical result:

```text
ValidationResult
├── status
├── blockers[]
├── warnings[]
├── corrective_actions[]
├── contract_checks[]
├── output_counts
└── continuity_checks[]
```

### Status Resolution

- any blocker → `BLOCK`
- no blocker + one or more warnings → `WARNING`
- no blocker + no warning → `PASS`

The runtime must never return `PASS` while a blocker remains.

## 13. Final Output Interface

The final output is:

```text
GenerationOutput
├── creative_summary
├── scene_plan[]
├── image_prompts[]
├── video_prompts[]
├── spoken_script?
├── silent_behavior_script?
└── validation
```

### Count Invariants

If scene count is N:

- `scene_plan.length = N`
- `image_prompts.length = N`
- `video_prompts.length = max(N - 1, 0)`

Speech fields:

- spoken format → spoken script allowed/required according to campaign and format,
- silent format → spoken script absent.

Silent behavior:

- silent format → silent behavior script present when useful,
- spoken format → silent behavior script absent.

## 14. Error Contract

Use structured errors:

```text
RuntimeError
├── code
├── stage
├── severity
├── message
├── field
└── corrective_action
```

### Severity

- `BLOCKER`
- `WARNING`

### Suggested Error Codes

- `INVALID_INPUT`
- `MISSING_REQUIRED_FIELD`
- `INVALID_ENUM`
- `CREATOR_NOT_FOUND`
- `CREATOR_IDENTITY_INSUFFICIENT`
- `VOICE_IDENTITY_INSUFFICIENT`
- `PRODUCT_INSUFFICIENT`
- `PRODUCT_CONFLICT`
- `PRODUCT_VARIANT_AMBIGUOUS`
- `INVALID_FORMAT_ANGLE`
- `INVALID_DURATION_SCENE_COUNT`
- `SCENE_STATE_INVALID`
- `BEHAVIOR_INVALID`
- `IMAGE_PROMPT_INVALID`
- `VIDEO_PROMPT_INVALID`
- `IDENTITY_DRIFT`
- `PRODUCT_DRIFT`
- `CONTINUITY_BREAK`
- `UNSUPPORTED_DETAIL`
- `SPEECH_MODE_CONFLICT`
- `OUTPUT_COUNT_MISMATCH`
- `VALIDATION_BLOCKED`

Error codes should remain stable so executable tests can assert against them.

## 15. Repair Contract

Repairs must be local.

```text
Validation Failure
      ↓
Identify Failed Contract
      ↓
Repair Smallest Affected State
      ↓
Re-run Dependent Stage(s)
      ↓
Revalidate
```

Examples:

### Character Drift

Repair:

- restore Character Identity Lock,
- regenerate affected Image / Video Prompt only.

Do not rebuild campaign concept unless necessary.

### Product Drift

Repair:

- restore Product Identity Lock,
- repair affected scene state and downstream prompts.

### Missing Physical Cause

Repair:

- update transition cause,
- update Behavior Plan,
- regenerate affected Video Prompt.

### Image Future Action

Repair:

- convert action sequence into current state,
- regenerate only affected Image Prompt.

## 16. Dependency Graph

```text
Request
  ↓
ResolvedRequest
  ├──────────────┐
  ↓              ↓
Product       Creator
  ↓              ↓
  └──────┬───────┘
         ↓
     Campaign
         ↓
   Creative Concept
         ↓
    Scene States
         ↓
   Content Behavior
      ┌──┴──┐
      ↓     ↓
   Image  Video
      └──┬──┘
         ↓
   Final Validation
         ↓
      Output
```

Image and Video engines must consume the same Scene State Model.

They must not independently reconstruct scene meaning.

## 17. Executable Test Harness Contract

The eventual test runner should accept:

```text
TestCase
├── id
├── input
├── expected_status
├── expected_errors[]
├── expected_scene_count
├── expected_image_prompt_count
├── expected_video_prompt_count
├── expected_speech_mode
├── expected_invariants[]
└── notes
```

### Positive Test

A positive test expects:

- status PASS or WARNING,
- correct output counts,
- no blocker,
- expected speech mode,
- all required invariants.

### Negative Test

A negative test expects:

- status BLOCK,
- one or more specific error codes,
- no final generation output when the blocker occurs before generation,
- or local repair when the failure is repairable downstream.

## 18. Determinism Contract

The runtime should be deterministic at the structural level.

Given the same:

- normalized request,
- product intelligence,
- creator intelligence,
- campaign intelligence,
- creative constraints,

the runtime must produce the same:

- resolved format,
- resolved scene count,
- scene count contract,
- output section structure,
- dependency mapping,
- validation logic.

Creative wording may vary between model executions, but structural contracts must not.

## 19. Observability Contract

For debugging and regression testing, the runtime should be able to expose stage status internally:

```text
StageTrace
├── stage
├── status
├── inputs_resolved
├── outputs_created
├── blockers
├── warnings
└── repair_actions
```

This trace is internal.

Do not expose hidden reasoning to the user by default.

## 20. Runtime Completion Gate

The runtime interface is considered ready for executable implementation when:

- canonical request is stable,
- every stage has explicit input/output contracts,
- source-of-truth ownership is explicit,
- validation status is deterministic,
- error codes are stable,
- repairs are local,
- output counts are deterministic,
- Image and Video consume the same Scene State Model,
- test cases can assert structural invariants without inspecting hidden reasoning.

## Next Implementation Dependency

After this interface is implemented, the next layer is an executable test harness.

The test harness should first implement the contract tests in `tests/integration-audit.md`, then expand into regression fixtures as the runtime gains executable generation components.


## Creator Reference Adapter

Creator identity is resolved at runtime through the Creator Library plus request-scoped references.

Flow:

```
Creator Library → request creator reference → Creator Intelligence → identity validation → Character / Voice Identity Lock
```

Rules:

- Visual generation requires an approved Character Reference.
- Spoken generation requires an approved Voice Reference.
- Silent formats do not require Voice Identity.
- Creator name alone never satisfies identity requirements.
- Missing references block generation with `CREATOR_IDENTITY_INSUFFICIENT` or `VOICE_IDENTITY_INSUFFICIENT`.
- Supplied identity fields may fill unknown library fields, but they do not silently invent missing references.


## Script Engine

Spoken output is generated only when speech mode is active. The Script Engine:

- uses Campaign Intelligence and required evidence as content constraints;
- binds output to the Creator Voice Identity Lock;
- targets approximately 2.2 words per second;
- exposes word count and duration-fit metadata;
- keeps spoken text out of image and video visual prompts.

Silent formats use a separate Silent Behavior Script. It contains observable behavior cues and explicitly disables speech and lip-sync.

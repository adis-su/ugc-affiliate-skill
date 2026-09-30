# UGC Affiliate Skill

A reusable AI skill for generating human-looking affiliate UGC across Fashion, Beauty, and Home.

## Creator

- Rositasari
  - Character Identity
  - Voice Identity

## Niches

- Fashion
- Beauty
- Home

## Primary Outputs

- Image Prompts
- Frame-to-Frame Video Prompts

## Core Objective

Generate UGC that feels like ordinary human-made smartphone content rather than polished advertising or cinematic AI content.

## Use Directly in ChatGPT

You can use this repository as the specification and knowledge base directly in ChatGPT without installing the Node.js runtime.

Start with the dedicated guide:

- `CHATGPT.md` — manual ChatGPT execution guide, loading order, input template, output contract, and validation rules.

Quick setup prompt:

```text
Use this repository as the specification and knowledge base for UGC Affiliate Skill:

https://github.com/adis-su/ugc-affiliate-skill

Read SKILL.md first, then load only the supporting files required for this request.

Do not merely summarize the repository. Execute the skill according to its pipeline, constraints, validation rules, identity rules, product intelligence rules, scene planning rules, image prompt engine, video prompt engine, and output contract.

Treat the repository as the source of truth.
Do not invent unsupported product or creator details.

I will provide the generation input next.
```

See `CHATGPT.md` for the complete workflow.

## Portable AI Skill Mode

AFFILIX is repository-portable. When this repository is supplied as an AI agent's workspace or project context, the agent can execute AFFILIX directly without installing a global skill or the Node.js runtime.

Repository entrypoints:

- `AGENTS.md` — automatic agent instructions for repository-aware hosts
- `AFFILIX.md` — portable AFFILIX activation and execution contract
- `SKILL.md` — canonical skill specification
- `CHATGPT.md` — manual execution guide for hosts that do not automatically load repository instructions

Use `/Affilix` as the canonical activation command. Native slash-command registration remains host-specific, but repository-based execution does not require copying AFFILIX into a global skills directory.

## End-to-End Architecture

```
INPUT
  ↓
UNDERSTANDING
  ├─ Input Validation
  ├─ Product Intelligence
  ├─ Creator Intelligence
  ├─ Campaign Intelligence
  └─ Content Understanding
  ↓
CREATIVE LOGIC
  ├─ Niche Logic
  ├─ Format × Angle
  ├─ Creative Concept
  ├─ Scene Planning
  └─ Generator Clip Duration Planning
  ↓
CONTENT BEHAVIOR
  ├─ Script / Silent Behavior
  ├─ Human Micro-Behavior
  └─ Product Interaction
  ↓
PROMPT ENGINES
  ├─ Image Prompt Engine
  └─ Video Prompt Engine
  ↓
VALIDATION + LOCAL REPAIR
  ↓
OUTPUT
  ├─ Image Prompts
  ├─ Frame-to-Frame Video Prompts
  └─ Spoken Script / Silent Behavior when applicable
```

## Specification Map

- `SKILL.md` — canonical skill specification and execution contract
- `CHATGPT.md` — direct ChatGPT execution layer
- `RELEASE_READINESS.md` — v0.1.0 release gates and known limitations
- `creators/rositasari.md` — Character and Voice Identity
- `niches/fashion.md` — Fashion-specific rules
- `niches/beauty.md` — Beauty-specific rules
- `niches/home.md` — Home-specific rules
- `campaigns/campaign-intelligence.md` — Campaign intent and viewer evidence
- `creative/creative-logic.md` — Creative concept resolution
- `creative/scene-planning.md` — Scene State Model, transitions, and generator-aware duration planning
- `behavior/content-behavior.md` — Human behavior and product interaction
- `prompts/image-prompt-engine.md` — Still-image generation engine
- `prompts/video-prompt-engine.md` — Frame-to-frame motion engine and Google Flow clip-duration contract
- `runtime/end-to-end-integration.md` — Runtime contract across all layers
- `runtime/runtime-interface.md` — Canonical runtime interfaces and executable contracts
- `runtime/index.mjs` — Executable contract-first runtime
- `tests/integration-audit.md` — Integration audit and contract test matrix
- `tests/fixtures/contract-fixtures.json` — Machine-readable positive/negative fixtures
- `tests/contract-harness.md` — Contract test harness specification
- `tests/contract-tests.mjs` — Executable Node contract tests

## Runtime Contract

The runtime uses one shared Scene State Model across both prompt engines.

```
Request
  ↓
Resolved Request
  ↓
Product + Creator + Campaign Intelligence
  ↓
Creative Concept
  ↓
Scene States
  ↓
Content Behavior
  ├──→ Image Prompts
  └──→ Video Prompts
  ↓
Final Validation
  ↓
Generation Output
```

Structural invariants are deterministic:

- N scenes → N Image Prompts
- N scenes → N−1 Scene Transition Prompts
- Flow clip durations exactly partition the requested total duration
- Scene count and generated clip count are separate
- one creator identity source of truth
- one product identity source of truth
- every meaningful state change has a cause
- silent formats contain no speech
- final output contains no unresolved blocker

## Executable Runtime

The repository includes a dependency-free Node.js runtime skeleton.

Run:

```bash
npm test
```

The runtime implements the contract boundary, validation, deterministic scene-state construction, prompt contract checks, retrieval boundaries, repair boundaries, and regression fixtures.

## Core Runtime Rule

Every final prompt must be traceable to one resolved Scene State.

Unknown information stays unknown. Unsupported details are never invented.

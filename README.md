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
  └─ Scene Planning
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

- `creators/rositasari.md` — Character and Voice Identity
- `niches/fashion.md` — Fashion-specific rules
- `niches/beauty.md` — Beauty-specific rules
- `niches/home.md` — Home-specific rules
- `campaigns/campaign-intelligence.md` — Campaign intent and viewer evidence
- `creative/creative-logic.md` — Creative concept resolution
- `creative/scene-planning.md` — Scene State Model and transitions
- `behavior/content-behavior.md` — Human behavior and product interaction
- `prompts/image-prompt-engine.md` — Still-image generation engine
- `prompts/video-prompt-engine.md` — Frame-to-frame motion engine
- `runtime/end-to-end-integration.md` — Runtime contract across all layers

## Core Runtime Rule

Every final prompt must be traceable to one resolved Scene State.

```
Creative Concept
      ↓
Scene State
      ↓
Content Behavior
      ↓
Image Prompt
      ↓
Video Transition
      ↓
Next Scene State
```

The system must preserve:

- Character Identity
- Product Identity
- Product State
- Environment Continuity
- Camera Continuity
- Human Realism
- Campaign Evidence

Unknown information stays unknown. Unsupported details are never invented.

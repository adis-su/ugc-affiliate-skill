# AFFILIX

**AI UGC Production System**

AFFILIX is an AI UGC production system that transforms product information into a structured and traceable production workflow, from **Product Truth** to **Image Prompts** and **Video Prompts**.

AFFILIX is not merely a prompt generator. The system separates creative decisions, product facts, character identity, visual state, timing, clips, references, audio, and generative outputs so production remains consistent and can be revised without destroying parts that are already correct.

## Pipeline

```text
PRODUCT → CONTENT STRATEGY → SCRIPT → DIALOGUE → CHARACTER → ENVIRONMENT → STORYBOARD → GLOBAL TIMELINE → CLIP → STATE → PRODUCTION SPEC → PROMPT OUTPUT → NATURALIZATION → AUDIO
```

Each stage has clear responsibilities, dependencies, outputs, and decisions. AFFILIX does not execute the entire production workflow at once by default.

## Core Principles

### Source of Truth Wins

Information lower in the production workflow must not replace a higher-level Source of Truth. Generated results do not automatically become Source of Truth.

### Product Identity ≠ Product State

Product Identity includes brand, name, variant, shape, color, packaging, material, logo, and physical details. Product State includes open/closed, held, location, orientation, visibility, and interaction. Identity is preserved unless explicitly instructed; State may change according to the story.

### Character Identity ≠ Character State

Character Identity defines who the character is. Character State defines pose, expression, gaze, gesture, body orientation, and movement. State changes must not alter identity.

### Voice Identity Is Separate

Voice Identity includes gender, perceived age, pitch, timbre, pace, rhythm, energy, emotion, delivery, breathing, pauses, emphasis, and natural imperfection.

### Script ≠ Dialogue

Script defines the message and communication structure. Dialogue defines how that message actually sounds when spoken by a human.

### Continuity = STATE → TRANSITION → STATE

Continuity is not treated as image → image → image. It is treated as START STATE → TRANSITION → END STATE.

## One Command → One Stage → One Decision → One Output

AFFILIX works incrementally. One command executes one stage, produces one primary output, and then stops at the decision point.

```text
/Affilix
/Affilix next
/Affilix approve
/Affilix revise
/Affilix regenerate
/Affilix status
/Affilix input
/Affilix reset
```

- `/Affilix` inspects the current project condition.
- `/Affilix next` advances exactly one stage.
- `/Affilix approve` approves the current stage output when it is ready for a decision.
- `/Affilix revise` revises the current stage.
- `/Affilix regenerate` performs targeted regeneration.
- `/Affilix status` displays status without executing production.
- `/Affilix input` provides information required by the current stage.
- `/Affilix reset` performs an explicit, scoped reset.

Approval does not automatically execute the next stage.

## Stage Lifecycle

```text
NOT_STARTED → IN_PROGRESS → READY_FOR_DECISION → APPROVED → LOCKED
```

If an upstream stage changes:

```text
LOCKED → STALE → REVISED → READY_FOR_DECISION → APPROVED → LOCKED
```

Execution conditions are tracked separately: READY, NEEDS INPUT, BLOCKED, UNKNOWN, UNVERIFIED, SOURCE UNAVAILABLE, DEPENDENCY INVALID, and STALE.

There is no separate validation stage.

## Product Truth

Product Truth is the source of product facts used by downstream stages. AFFILIX must not invent specifications, benefits, materials, dimensions, performance, quality, user experience, health claims, or commercial claims.

If information is unavailable or unverified, its status must remain visible. **Unavailable truth must never be turned into invented truth.**

## References and Continuity

Each reference is a state snapshot that can be used to maintain consistency across clips.

```text
R01 → R02 → R03 → R04
```

Each reference has a Reference State and an Image Prompt. Each clip has a start state, transition, end state, and Video Prompt.

Continuity rule:

```text
END STATE OF CLIP N = START STATE OF CLIP N+1
```

The last reference of a clip becomes the bridge/reference for the next clip when required.

## Global Timeline vs Clip

**Global Timeline** controls narrative timing, scene duration, and event order.

**Clip** is a production/generation unit.

A storytelling scene may have a longer duration and be split into multiple clips at logical transition points. Clip duration follows the relevant platform configuration, including Google Flow.

## Naturalization

Naturalization makes AI-generated motion feel more human without changing required identity or state. Examples include blinking, eye movement, breathing, micro-expressions, weight shifting, finger repositioning, speech rhythm, subtle camera movement, and autofocus behavior.

Naturalization must not change character identity, product identity, required state, or continuity.

## Audio

Audio is a production layer that runs in parallel with visuals and may include voice identity, dialogue delivery, breathing, pauses, emphasis, room tone, ambience, foley, product sounds, music, and timing.

Audio still follows AFFILIX dependency and decision controls.

## Repository Structure

```text
AFFILIX/
├── MASTER-SKILL.md
├── 00_KNOWLEDGE/
├── 01_PRODUCT/
├── 02_CONTENT-STRATEGY/
├── 03_SCRIPT/
├── 04_CHARACTER/
├── 05_ENVIRONMENT/
├── 06_STORYBOARD/
├── 07_GLOBAL-TIMELINE/
├── 08_CLIP/
├── 09_STATE/
├── 10_PRODUCTION-SPEC/
├── 11_OUTPUT/
├── 12_AUDIO/
├── 13_SYSTEM/
└── 14_PROJECT-STATE/
```

`00_KNOWLEDGE/` contains reusable knowledge for categories, platforms, formats, and safety. The other folders contain production modules, system controls, and project state.

## Dependency System

AFFILIX uses dependency-driven production. Dependencies may be hard, soft, source, derived, or configuration dependencies.

When an upstream stage changes, only affected downstream parts need to become stale or be regenerated.

> Regenerate only the smallest affected part.

AFFILIX does not perform full regeneration by default.

## Failure Handling

Conditions such as BLOCKED, NEEDS INPUT, UNKNOWN, UNVERIFIED, SOURCE UNAVAILABLE, DEPENDENCY INVALID, and STALE must be stated explicitly.

The system must not hide dependency failures or resolve them through guessing. Unaffected artifacts must remain intact.

## Targeted Regeneration

Regeneration is dependency-aware. If only Video Prompt for Clip 03 changes, AFFILIX does not need to rebuild the entire project.

If Product Truth changes, AFFILIX traces dependencies and determines the earliest affected artifacts. Generated outputs remain downstream results and do not automatically become Source of Truth.

## Decision Log and Change Log

**Decision Log** records user decisions, approvals, revision decisions, lock decisions, and important artifact decisions.

**Change Log** records changes to the system, artifacts, dependencies, configuration, and project state.

Both preserve traceability.

## Project Status

AFFILIX is developed as a modular system focused on production workflow, dependency management, state management, continuity, prompt generation, targeted regeneration, and project traceability.

This repository contains the system definitions and knowledge required to run the AFFILIX workflow.

## Non-Negotiable Principles

1. Source of Truth wins.
2. Identity must not change without explicit instruction.
3. State may change according to story requirements.
4. Unavailable truth must not be filled with assumptions presented as facts.
5. Generated output is not Source of Truth.
6. One project has one primary Current Stage.
7. `/Affilix next` advances exactly one stage.
8. Approval must be explicit.
9. No silent stage skipping.
10. No silent downstream stage execution.
11. No silent regeneration.
12. Hard dependencies must be satisfied.
13. Stale dependencies must not be treated as current truth.
14. Clip continuity must be preserved.
15. Regeneration must be targeted.
16. Audio is a controlled layer.
17. There is no separate validation stage.

## Main Documentation

Start with `MASTER-SKILL.md`.

For system execution:

```text
13_SYSTEM/WORKFLOW.md
13_SYSTEM/DEPENDENCY.md
13_SYSTEM/STATE-MACHINE.md
13_SYSTEM/STAGE-EXECUTION.md
13_SYSTEM/FAILURE-HANDLING.md
13_SYSTEM/REGENERATION.md
```

For project state:

```text
14_PROJECT-STATE/PROJECT-STATE.md
14_PROJECT-STATE/CURRENT-STAGE.md
14_PROJECT-STATE/DECISION-LOG.md
14_PROJECT-STATE/CHANGE-LOG.md
```

## Repository

Repository: https://github.com/adis-su/ugc-skill

AFFILIX is designed as a traceable production system that can be revised in a controlled manner and evolved without losing the relationship between facts, creative decisions, state, and generative outputs.

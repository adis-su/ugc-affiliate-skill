# ChatGPT Execution Guide

## Purpose

This guide defines how to use the UGC Affiliate Skill directly inside ChatGPT without installing the Node.js runtime.

The repository is the **specification and knowledge base**. ChatGPT acts as the operator that reads the relevant files, applies the rules, and returns the final Generation Output.

This mode is useful for creative generation and prompt production. The executable Node runtime remains the deterministic contract/test layer.

## Quick Start

Paste this into a new ChatGPT conversation:

```text
Use this repository as the specification and knowledge base for UGC Affiliate Skill:

https://github.com/adis-su/ugc-affiliate-skill

Read SKILL.md first, then load only the supporting files required for this request.

Do not merely summarize the repository. Execute the skill according to its pipeline, constraints, validation rules, identity rules, product intelligence rules, scene planning rules, image prompt engine, video prompt engine, and output contract.

Treat the repository as the source of truth.
Do not invent unsupported product or creator details.

I will provide the generation input next.
```

## How ChatGPT Should Load the Skill

Do not blindly dump every repository file into context. Humans already invented enough ways to waste context windows.

Use this order:

1. `SKILL.md`
2. `creators/rositasari.md`
3. The relevant niche file:
   - `niches/fashion.md`
   - `niches/beauty.md`
   - `niches/home.md`
4. `campaigns/campaign-intelligence.md`
5. `creative/creative-logic.md`
6. `creative/scene-planning.md`
7. `behavior/content-behavior.md`
8. `prompts/image-prompt-engine.md`
9. `prompts/video-prompt-engine.md`
10. Runtime documentation only when validating or debugging execution behavior:
   - `runtime/end-to-end-integration.md`
   - `runtime/runtime-interface.md`

The executable JavaScript under `runtime/` is not required for normal manual ChatGPT generation.

## Input Template

Use this structure for generation requests:

```text
Niche:
Fashion | Beauty | Home

Product:
- Product Name:
- Product URL:

Campaign:
- Objective:
- Stage:
- CTA:

Creator:
- Rositasari

Content:
- Format:
- Angle:
- Duration:
- Scene Count:

Platform:
- TikTok
- Instagram Reels
- Facebook Reels
- Shopee Video

Additional Constraints:
- ...
```

If a field is intentionally unknown, leave it unknown. Do not replace missing facts with guesses.

## Product URL Behavior

When a Product URL is supplied:

1. Retrieve the product page when the environment allows it.
2. Extract only supportable product facts.
3. Separate retrieved facts from creative inference.
4. Preserve unknown attributes as unknown.
5. Flag material conflicts instead of silently choosing one.
6. Never infer detailed product properties from the product name alone.

If the URL cannot be retrieved, continue only when the supplied product facts are sufficient. Otherwise block the generation rather than fabricating product intelligence.

## Creator Identity Behavior

Rositasari is the creator identity package.

Use:

- Character Identity for visual generation.
- Voice Identity for spoken content.
- Character Reference as the visual anchor when available.
- Voice Reference as the audio anchor when available.

Do not invent facial, body, hair, skin, age, accent, pitch, or other identity attributes.

If the required creator identity is insufficient for the requested generation, treat that as a blocker rather than filling the gaps with generic AI-human soup.

## Execution Pipeline

Run the conceptual pipeline in this order:

```text
User Input
→ Normalize Input
→ Validate Required Input
→ Retrieve Product Intelligence
→ Retrieve Creator Identity
→ Resolve Format × Angle
→ Resolve Duration × Scene Count
→ Build Creative Concept
→ Build Scene State Model
→ Build Content Behavior
→ Assemble Image Prompts
→ Assemble Video Prompts
→ Assemble Speech / Silent Behavior
→ Validate
→ Repair locally repairable defects
→ Validate again
→ Return Final Output
```

The final result must obey the repository's output contract.

## Output Contract

Return results in this order:

### 1. Creative Summary

Include:

- Niche
- Product
- Campaign Objective
- Campaign Stage
- CTA
- Creator
- Format
- Angle
- Duration
- Scene Count
- Creative Concept

### 2. Scene Plan

For every scene include:

- Scene
- Purpose
- State
- Creator Action
- Product Interaction
- Behavior Cue
- Environment
- Camera State
- Continuity Lock
- Transition Intent

### 3. Image Prompts

Generate exactly **one Image Prompt per scene**.

Each Image Prompt must represent one single visual state.

It must not describe a sequence of future actions.

Use the repository's image prompt assembly rules and preserve:

- Character Identity Lock
- Product Identity Lock
- Current product state
- Current creator state
- Environment continuity
- Camera/composition
- Lighting
- UGC realism

### 4. Frame-to-Frame Video Prompts

Generate exactly **N − 1 Video Prompts for N scenes**.

Each Video Prompt must describe the physical transition from one scene to the next.

The transition should preserve unchanged attributes and explain changed attributes through a believable physical cause.

### 5. Spoken Script

Include this only when the selected format uses speech.

The script must:

- fit the requested duration,
- use the defined Voice Identity,
- remain conversational,
- use only supported product claims,
- stay separate from visual prompts.

### 6. Silent Behavior Script

Include this for silent formats when useful.

It should describe compact visual behavior such as:

```text
notice → inspect → adjust → reveal
```

No dialogue, voice-over, or lip-sync should be introduced.

## Validation Rules

Before returning the result, verify:

- Input is valid.
- Format × Angle is compatible.
- Duration × Scene Count is plausible.
- Scene states are internally consistent.
- Every Image Prompt maps to exactly one scene.
- Every Video Prompt maps to exactly one consecutive scene pair.
- Product identity remains stable.
- Character identity remains stable.
- Voice identity remains stable when speech is used.
- Environment continuity is preserved.
- Every meaningful state change has a physical or intentional cause.
- No unsupported product or creator details were invented.
- Silent formats contain no speech.
- Spoken content is not duplicated inside visual prompts.
- CTA behavior is only included when relevant.
- Output counts match the scene count.

## Human Realism Rules

Human realism is a cross-cutting requirement, not a final decorative pass.

Prefer:

- natural anatomy,
- believable posture,
- restrained micro-movements,
- realistic hand behavior,
- proportional facial reactions,
- smartphone camera behavior,
- plausible exposure and lighting,
- natural material physics,
- imperfect but believable framing.

Avoid:

- cinematic camera choreography,
- excessive beauty retouching,
- impossible poses,
- random gestures,
- floating or teleporting products,
- sudden wardrobe changes,
- generic "ultra realistic" filler,
- AI-perfect symmetry,
- actions that cannot physically connect the two frames.

The target is ordinary human-made UGC.

## Manual Execution Example

After the setup prompt, send an input such as:

```text
Niche: Fashion

Product:
- Product Name: [name]
- Product URL: [url]

Campaign:
- Objective: Product Consideration
- Stage: Consideration
- CTA: Soft CTA

Creator:
- Rositasari

Content:
- Format: Silent Mirror Selfie
- Angle: Styling
- Duration: 8 sec
- Scene Count: 3

Platform:
- TikTok
- Instagram Reels
```

ChatGPT should then execute the repository rules and return the complete Generation Output, not merely explain what the repository contains.

## ChatGPT Mode vs Node Runtime

These are two execution surfaces for the same specification:

| Surface | Purpose |
|---|---|
| ChatGPT | Creative execution, product/creator reasoning, prompt generation |
| Node runtime | Deterministic contracts, validation, fixtures, regression testing |
| Repository | Shared source of truth |

The ChatGPT mode does **not** mean the repository has been installed as a native ChatGPT skill. The URL provides access to the specification and implementation files. ChatGPT must read those files and follow them.

## Recommended Working Pattern

For repeated use, keep one conversation focused on UGC generation and use the repository URL as the source of truth.

For each new request:

1. Provide the repository URL.
2. Instruct ChatGPT to read `SKILL.md`.
3. Provide the generation input.
4. Let ChatGPT load the relevant niche and supporting files.
5. Review blockers or unknowns before generation.
6. Use the final Image Prompts and Frame-to-Frame Video Prompts as the production artifacts.

When the repository changes materially, tell ChatGPT to reread the current files rather than relying on an older conversation context.

## Important Boundary

This document defines the **manual ChatGPT execution layer**.

It does not replace:

- `SKILL.md`
- the runtime contract,
- executable tests,
- product retrieval implementation,
- creator retrieval implementation.

Those remain the canonical specification and implementation layers.

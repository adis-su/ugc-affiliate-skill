# UGC Affiliate Skill — ChatGPT Project Runtime

Use this repository as the source of truth for the UGC Affiliate Skill.

## Project Role

This skill generates production-ready:
- Image Prompts
- Frame-to-Frame Video Prompts
- Spoken Voice Generation Requests when speech is required

The output should feel like ordinary human-made smartphone UGC, not polished advertising or cinematic AI content.

## Source-of-Truth Hierarchy

Always resolve information in this order:

1. Explicit user input
2. Approved Product Reference / retrieved product facts
3. Creator Identity Lock
4. Approved Character Reference
5. Voice Identity Lock
6. Approved Voice Reference
7. Scene State and continuity locks
8. Creative inference only when it does not create unsupported factual claims

Never invent identity details or approved references.

## Identity → Prompt Binding

Character Identity is the source of truth for visual identity and must influence every Image Prompt and Video Prompt.

Voice Identity is the source of truth for spoken delivery and must influence every Voice Generation Request.

Product Identity is the source of truth for product appearance and must influence every relevant Image Prompt and Video Prompt.

The generation chain is:

Character/Product Identity + Scene State → Image Prompt
Character/Product/Environment Identity + Start/End State → Video Prompt
Voice Identity + Approved Voice Reference + Spoken Script → Voice Generation Request

Identity is upstream of prompt assembly. It is not metadata appended after prompt generation.

## Rositasari

Rositasari is the supported creator.

Character Identity:
- 25-year-old young adult female
- Southeast Asian visual appearance
- approximately 165 cm
- hijab is a stable visual identity attribute
- oval-rounded face
- soft rounded cheeks and jawline
- short-to-medium rounded chin
- medium almond-round very dark brown eyes
- natural medium eyebrows with soft arch
- medium relatively straight nose with rounded tip
- medium lips with slightly fuller lower lip
- light-medium warm-neutral skin
- natural skin texture
- minimal makeup
- calm, approachable expression

Do not independently redesign Rositasari.

Voice Identity:
- id-ID
- native Indonesian conversational
- female young-adult presentation
- medium pitch with natural variation
- warm, soft, lightly textured timbre
- conversational tempo with natural variation
- meaning-led, subtle, non-theatrical prosody
- clear but not over-enunciated articulation
- natural micro-breaths
- natural micro-pauses
- minimal context-appropriate disfluency
- subtle, approachable emotion
- avoid robotic timing, uniform pacing, exaggerated enthusiasm, synthetic pauses, and over-pronunciation

An actual approved Character Reference and Voice Reference must be supplied before their corresponding generation paths are allowed to proceed. Never fabricate an approved reference.

## Required Workflow

1. Validate user input.
2. Resolve product intelligence and Product Identity Lock.
3. Resolve creator identity.
4. Determine spoken vs silent behavior.
5. Build campaign and creative logic.
6. Plan scene states.
7. Bind Character/Product/Environment Identity to Image Prompts.
8. Bind Character/Product/Environment continuity to Video Prompts.
9. If spoken, bind Voice Identity + Voice Reference to Voice Generation Request.
10. Validate generated assets against identity and continuity contracts.
11. Regenerate only when the failure is retryable.
12. Return structured blockers when required references or inputs are missing.

## Silent Content

Silent formats must not receive invented dialogue, voice-over, or lip-sync.

## Spoken Content

Spoken formats require an approved Voice Reference. Voice Identity alone is not sufficient for production generation.

## Output Contract

For each scene return:
- scene id
- Image Prompt

For each consecutive scene pair return:
- from scene
- to scene
- Frame-to-Frame Video Prompt

For spoken content additionally return:
- scene id
- spoken script
- Voice Generation Request

Prompts should be concise enough to be operational but detailed enough to preserve identity, product consistency, physical continuity, and human realism.

## Project Usage

When this file is attached to a ChatGPT Project, treat it as the project-level execution contract.

The repository remains the implementation source of truth. Runtime modules and tests define the executable reference behavior. This document defines how the skill should be used conversationally inside the ChatGPT Project.

Do not claim a provider has generated an asset unless an actual generation tool/provider has returned the asset.

Do not claim tests pass unless they have actually been executed.

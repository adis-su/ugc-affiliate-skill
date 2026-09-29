# AFFILIX — Image Spec

IMAGE-SPEC.md mendefinisikan **apa yang wajib terlihat dan bagaimana sebuah reference image harus merepresentasikan state yang sudah ditetapkan**.

Image Spec adalah jembatan:

PRODUCTION SPEC
→ IMAGE SPEC
→ IMAGE PROMPT

Image Spec menjawab:

> **Apa yang harus terlihat pada image agar reference tersebut merepresentasikan state dengan benar?**

Image Spec bukan:
- Image Prompt
- Reference Image
- Character Identity
- Product Identity
- Visual State
- Camera Movement
- validation stage

## 1. Purpose

Image Spec digunakan untuk:
- menerjemahkan Production Spec menjadi visual requirements
- mendefinisikan isi wajib reference image
- mengunci identity dan state continuity
- menentukan framing dan visibility requirements
- menyediakan input terstruktur untuk Image Prompt
- mencegah prompt menambahkan detail yang tidak berasal dari upstream

Image Spec harus cukup spesifik untuk produksi, tetapi tidak berubah menjadi prose prompt.

## 2. Core Principle

Image Spec menjawab **WHAT**.

Image Prompt menjawab **HOW**.

Contoh:

Image Spec:
> Product is open, held in Rositasari's right hand, front label visible.

Image Prompt:
> rendering instructions for generating that exact visual.

Image Prompt tidak boleh mengubah Image Spec.

## 3. Image Spec Record

Gunakan struktur:

### Image Spec Record

- Image Spec ID:
- Reference ID:
- Scene ID:
- Clip ID:
- Purpose:
- Reference Role:
- Source State:
- Character Requirements:
- Product Requirements:
- Environment Requirements:
- Camera Requirements:
- Lighting Requirements:
- Composition Requirements:
- Visibility Requirements:
- Spatial Relationships:
- Continuity Anchors:
- Identity Constraints:
- Prohibited Changes:
- Naturalization-Relevant Constraints:
- Audio-Sync Visual Dependencies:
- Output Requirements:
- Source References:
- Status:

## 4. Source State

Image Spec harus dapat ditelusuri ke:

- Reference State
- Character State
- Product State
- Environment State
- Camera State
- Production Spec

Jika state berubah, Image Spec dapat menjadi STALE.

Image Spec tidak boleh membuat state baru.

## 5. Purpose

Setiap Image Spec harus menjelaskan kenapa image tersebut dibutuhkan.

Contoh:

- Clip Start Reference
- Clip End Reference
- Bridge Reference
- Product state change anchor
- Character state change anchor
- Camera state change anchor

Purpose membantu menentukan level detail yang diperlukan.

## 6. Reference Role

Reference role dapat berupa:

- Start
- End
- Bridge
- Standalone

Role menentukan bagaimana image akan digunakan downstream.

## 7. Character Requirements

Character Requirements dapat mencakup:

- character identity
- body position
- pose
- posture
- body orientation
- head orientation
- gaze
- facial expression
- hand position
- product interaction
- wardrobe continuity
- hijab coverage

Untuk Rositasari:
- established face must remain consistent
- hijab must remain present
- hair must remain fully covered

Image Spec tidak boleh redefine facial identity.

## 8. Product Requirements

Product Requirements dapat mencakup:

- product identity
- open/closed state
- held/placed state
- position
- orientation
- visibility
- occlusion
- quantity
- character interaction
- environment relationship

Product Identity dan Product Truth tetap authoritative.

## 9. Environment Requirements

Image Spec dapat menentukan:

- location
- spatial arrangement
- visible background anchors
- surface
- relevant objects
- environment state
- lighting environment

Jangan menambahkan background details hanya untuk membuat image terlihat "lebih hidup".

## 10. Camera Requirements

Image Spec dapat menentukan:

- shot size
- framing
- camera position
- camera height
- camera angle
- perspective relationship
- focus target
- subject scale
- visible field

Image Spec tidak menentukan movement sequence.

## 11. Lighting Requirements

Lighting Requirements dapat mencakup:

- source direction
- softness
- exposure relationship
- shadow direction
- color temperature character
- consistency with previous reference

Lighting requirement harus mengikuti Environment State dan Visual Language.

## 12. Composition Requirements

Composition menjelaskan bagaimana elemen ditempatkan dalam frame.

Contoh:

> Rositasari occupies the central frame, product visible near lower center, enough headroom, table edge visible.

Composition bukan visual style.

## 13. Visibility Requirements

Visibility requirements menjelaskan apa yang harus terlihat.

Contoh:

- face clearly visible
- product front label readable
- right hand visible
- product not fully occluded
- critical environment anchor visible

Visibility requirements harus berasal dari continuity atau content needs.

## 14. Spatial Relationships

Image Spec harus mempertahankan critical spatial relationships.

Contoh:

> product held at chest height relative to character.

> character seated behind table.

> camera directly facing subject.

Relasi lebih penting daripada arbitrary coordinates jika exact coordinates tidak diperlukan.

## 15. Continuity Anchors

Critical anchors dapat mencakup:

- face identity
- hijab coverage
- wardrobe
- product packaging
- product orientation
- hand relationship
- character position
- camera side
- shot size
- environment anchor
- lighting direction

Image Spec harus mempertahankan anchor yang relevan dengan reference role.

## 16. Identity Constraints

Identity constraints harus eksplisit untuk high-risk elements.

Character:
> preserve established facial identity and permanent hijab.

Product:
> preserve established packaging, logo, shape, color identity, and variant.

Image Spec tidak boleh mengubah identity demi composition.

## 17. Prohibited Changes

Image Spec dapat menetapkan:

### Character
- no facial identity change
- no hair visibility
- no wardrobe drift

### Product
- no packaging redesign
- no logo change
- no unsupported color change
- no unsupported contents

### Environment
- no spatial teleportation
- no object duplication

### Camera
- no unsupported reframing
- no unsupported camera-side change

## 18. Image Spec and Image Prompt

Relationship:

> Image Spec = WHAT

> Image Prompt = HOW

Image Spec:
> medium close-up, Rositasari centered, product open in right hand, front label visible.

Image Prompt:
> detailed generation instruction implementing those requirements.

Prompt wording may vary.

Required state may not.

## 19. Image Spec and Reference State

Reference State defines the state.

Image Spec defines what must be visible to represent that state.

Example:

Reference State:
> product open in right hand, front-facing.

Image Spec:
> show open product in right hand with front label visible and hand-product relationship clear.

## 20. Image Spec and Visual Language

Visual Language defines:
> overall visual character.

Image Spec defines:
> required visual content and composition.

Example:

Visual Language:
> natural smartphone UGC.

Image Spec:
> medium close-up, eye-level, product and face both visible.

Image Spec must respect Visual Language but should not duplicate its entire style definition.

## 21. Image Spec and Naturalization

Naturalization primarily applies to video, but Image Spec may identify visual conditions that must remain stable.

Example:

> hands must maintain stable product grip.

Image generation should represent the required state without adding motion artifacts.

## 22. Audio-Sync Visual Dependencies

Image Spec may include audio-sync visual dependencies when the image represents a timing anchor.

Examples:

- mouth expression consistent with dialogue moment
- hand position corresponding to spoken action
- product state corresponding to sound cue timing

Audio authority remains in AUDIO-DESIGN.md.

## 23. Image Composition Priority

When frame space is limited, use explicit priority:

1. required character identity
2. required product identity/state
3. critical interaction
4. required camera framing
5. critical environment anchors
6. secondary background detail

Priority determines what must remain visible.

It is not a quality ranking.

## 24. Specificity Control

Image Spec should be:

- specific where continuity risk is high
- concise where detail is irrelevant
- explicit for identity-critical elements
- relative where absolute measurements are unnecessary

Avoid:
- decorative over-specification
- unsupported physical details
- arbitrary camera numbers
- invented product characteristics

## 25. Missing Data

If a required image attribute is unknown:

- mark UNKNOWN
- preserve known constraints
- do not invent
- block image generation if ambiguity materially affects continuity

Example:

If product orientation is unknown and label direction matters, do not guess.

## 26. Common Failure Modes

### Prompt Drift

Image Prompt adds requirements not present in Image Spec.

Correction:
> restore Image Spec as upstream constraint.

### State Drift

Generated image represents a different state.

Correction:
> update/regenerate affected image based on declared Reference State.

### Identity Drift

Face, hijab, product package, logo, or color changes.

Correction:
> restore identity constraints.

### Composition Conflict

Required product is cropped or hidden.

Correction:
> update composition and visibility requirements.

### Background Overload

Unnecessary background details reduce subject clarity.

Correction:
> preserve only relevant environment anchors.

### Over-Specification

Image Spec becomes a giant prompt.

Correction:
> keep WHAT separate from HOW.

## 27. Change Propagation

Image Spec depends on:

- Production Spec
- Reference State
- Character State
- Product State
- Environment State
- Camera State
- Visual Language
- Storyboard
- Timeline
- Clip

Changes may make Image Spec STALE.

Examples:

Character State change:
→ affected Image Spec stale.

Product State change:
→ affected Image Spec stale.

Camera State change:
→ affected Image Spec stale.

Production Spec change:
→ affected Image Spec stale.

## 28. Targeted Regeneration

Image Spec supports targeted regeneration.

Examples:

Product orientation change:
→ update affected Image Spec and Image Prompt.

Gaze change:
→ update affected Image Spec.

Framing change:
→ update affected Image Spec.

Unrelated references remain unchanged.

## 29. Status

Image Spec follows the project state machine:

- NOT_STARTED
- IN_PROGRESS
- READY_FOR_DECISION
- APPROVED
- LOCKED
- STALE
- REVISED

LOCKED Image Spec becomes a constraint for Image Prompt generation.

## 30. Source of Truth

Image Spec is authoritative for required visual content of its image output.

Upstream sources remain authoritative for their domains.

Image Prompt must follow Image Spec.

Generated images do not automatically replace Image Spec.

## 31. Boundary with Image Prompt

Image Spec:
> what must be present.

Image Prompt:
> instructions for generating it.

Image Spec should be stable even if prompt wording is rewritten.

## 32. Boundary with Video Spec

Image Spec:
> snapshot requirements.

Video Spec:
> transition requirements between snapshots.

Image Spec should not contain movement sequences.

## 33. Boundary with Reference State

Reference State:
> declared snapshot state.

Image Spec:
> visual requirements needed to represent that snapshot.

## 34. Boundary with Production Spec

Production Spec:
> production requirements across output types.

Image Spec:
> image-specific implementation requirements.

## 35. Non-Negotiable Rules

1. Image Spec defines WHAT must be visible.
2. Image Prompt defines HOW to generate it.
3. Image Spec must trace to Reference State and Production Spec.
4. Image Spec cannot create unsupported identity or product facts.
5. Character identity must remain consistent.
6. Product identity must remain consistent.
7. Required state must remain consistent.
8. Critical spatial relationships must be preserved.
9. Missing critical data must not be fabricated.
10. Image Spec must respect Visual Language.
11. Image Spec must not contain movement sequences.
12. Generated images do not become Source of Truth automatically.
13. Changes propagate downstream through dependency rules.
14. Regeneration must be targeted.
15. No separate validation stage is introduced.

# AFFILIX — Image Prompt

IMAGE-PROMPT.md mendefinisikan aturan untuk mengubah Image Spec menjadi prompt gambar yang siap digunakan oleh image generation system.

Pipeline:

REFERENCE STATE
→ PRODUCTION SPEC
→ IMAGE SPEC
→ IMAGE PROMPT
→ GENERATED IMAGE

Image Prompt adalah **generation instruction**, bukan Source of Truth.

## 1. Purpose

Image Prompt digunakan untuk:
- menerjemahkan Image Spec menjadi instruksi generasi
- mempertahankan character identity
- mempertahankan product identity
- merepresentasikan required state
- menerapkan camera, composition, environment, lighting, dan visual language
- menjaga continuity dengan reference lain
- menghindari penambahan fakta yang tidak didukung upstream

## 2. Core Principle

Image Spec menjawab:

> WHAT must be visible?

Image Prompt menjawab:

> HOW should the image generation system produce it?

Image Prompt tidak boleh mengubah:
- Product Truth
- Product Identity
- Character Identity
- Reference State
- declared visual requirements

Prompt wording dapat berubah.

Production requirements tidak boleh berubah.

## 3. Image Prompt Record

Gunakan struktur:

### Image Prompt Record

- Prompt ID:
- Image Spec ID:
- Reference ID:
- Scene ID:
- Clip ID:
- Prompt Purpose:
- Identity Block:
- State Block:
- Character Block:
- Product Block:
- Environment Block:
- Camera Block:
- Composition Block:
- Lighting Block:
- Visual Language Block:
- Continuity Block:
- Negative Constraints:
- Source References:
- Status:

## 4. Prompt Assembly Order

Urutan default:

1. generation objective
2. character identity
3. product identity
4. current state
5. character state
6. product state
7. environment
8. camera
9. composition
10. lighting
11. visual language
12. continuity anchors
13. prohibited changes

Urutan dapat disesuaikan jika generator memiliki format khusus, tetapi semantic priority harus tetap sama.

## 5. Identity Block

Identity Block berisi identity yang harus stabil.

### Character

Untuk Rositasari, preserve:
- female young adult identity
- established facial structure
- established eyes, brows, nose, lips, and proportions
- light-medium warm-neutral skin characteristics
- permanent hijab
- hair fully covered
- established wardrobe when applicable

Identity block harus berasal dari Character Identity.

Jangan mengganti identity dengan descriptor generik seperti:
> beautiful Indonesian woman.

Descriptor generik tidak cukup untuk identity continuity.

### Product

Preserve:
- brand
- product name
- variant
- packaging
- shape
- color
- logo
- material or physical details only when documented

Product identity harus berasal dari Product Truth / Product Identity.

## 6. State Block

State Block menjelaskan kondisi saat image diambil.

Contoh:
- seated
- gaze toward camera
- product held in right hand
- product open
- camera at eye level
- medium close-up

State Block harus mengikuti Reference State dan Image Spec.

Jangan mengubah state menjadi action sequence.

## 7. Character Block

Character Block dapat mencakup:
- pose
- posture
- body orientation
- head orientation
- gaze
- facial expression
- hand position
- gesture
- product interaction

Character Block tidak boleh redefine Character Identity.

## 8. Product Block

Product Block dapat mencakup:
- open/closed state
- position
- orientation
- visibility
- occlusion
- quantity
- interaction with character
- relationship to environment

Jangan menambahkan:
- unsupported product contents
- unsupported material behavior
- unsupported performance
- unsupported benefits

## 9. Environment Block

Environment Block menerjemahkan Environment requirements.

Gunakan:
- location
- relevant surfaces
- key spatial anchors
- relevant objects
- lighting environment
- depth relationship

Hindari decorative invention.

Environment harus cukup detail untuk menjaga continuity tanpa mengubah scene.

## 10. Camera Block

Camera Block dapat mencakup:
- shot size
- camera height
- camera position
- camera angle
- framing
- perspective relationship
- focus target
- depth of field when specified

Camera Block harus mengikuti Camera State.

Jangan menambahkan camera movement pada static image prompt.

## 11. Composition Block

Composition Block menjelaskan layout visual.

Contoh:
- character centered
- product clearly visible near chest
- sufficient headroom
- both hands visible when required
- relevant table edge visible
- product not cropped

Composition harus memprioritaskan identity dan state-critical elements.

## 12. Lighting Block

Lighting Block dapat mencakup:
- light direction
- softness
- exposure
- shadow character
- color temperature
- natural window light
- consistency with previous reference

Lighting harus konsisten dengan Environment dan Visual Language.

Jangan menciptakan dramatic lighting jika visual language membutuhkan natural smartphone UGC.

## 13. Visual Language Block

Visual Language diterapkan sebagai rendering direction.

Contoh:
- natural smartphone UGC
- realistic skin texture
- natural imperfections
- believable exposure
- non-cinematic framing
- authentic handheld visual character when appropriate

Visual Language tidak boleh override required state.

## 14. Continuity Block

Continuity Block menjaga hubungan dengan:
- previous reference
- next reference
- same clip
- same scene
- same character
- same product
- same environment
- same camera relationship

Contoh:

> maintain the same character identity, wardrobe, hijab coverage, product identity, environment layout, and camera relationship as the previous reference.

Hanya masukkan anchors yang relevan.

## 15. Negative Constraints

Negative constraints digunakan untuk melindungi high-risk requirements.

Contoh:
- no facial identity drift
- no visible hair
- no packaging redesign
- no logo alteration
- no unsupported product contents
- no extra product units
- no unexplained environment change
- no arbitrary camera reframing

Negative constraints bukan tempat untuk menulis daftar panjang hal yang tidak relevan.

## 16. Prompt Specificity

Prompt harus:
- specific on identity-critical elements
- specific on state-critical elements
- concise on low-risk details
- grounded in upstream sources
- free from unsupported assumptions

Terlalu generik:
> woman holding product in a nice room.

Terlalu bebas:
> luxurious modern apartment with expensive marble, premium materials, designer furniture...

Jika detail tersebut tidak berasal dari source, jangan mengarangnya.

## 17. Natural UGC Rendering

Jika Visual Language membutuhkan UGC realism, prompt dapat mempertahankan:
- realistic skin texture
- natural facial asymmetry
- subtle imperfections
- believable smartphone exposure
- realistic depth
- ordinary environmental detail
- restrained processing

Jangan mengartikan UGC sebagai:
- random distortion
- artificial blur
- excessive noise
- fake imperfections
- cinematic grading

Authenticity harus tetap believable.

## 18. Claim Safety

Image Prompt tidak boleh membuat visual yang menambahkan unsupported factual claims.

Contoh berisiko:
- product visibly repairing damage without evidence
- exaggerated before/after
- visual effect implying guaranteed performance
- invented product contents
- invented mechanism

Visual generation tetap tunduk pada Product Truth.

## 19. Missing Data

Jika Image Spec mengandung UNKNOWN:

- preserve UNKNOWN
- do not invent
- block generation if the missing information materially affects the required image

Prompt generator tidak boleh mengisi kekosongan dengan asumsi.

## 20. Reference Image Usage

Jika reference image tersedia, gunakan sesuai role:

- Start Reference
- End Reference
- Bridge Reference
- Standalone Reference

Reference membantu mempertahankan:
- identity
- state
- spatial relationship
- camera relationship
- environment continuity

Reference image bukan permission untuk mengubah Source of Truth.

## 21. Generated Image Status

Generated image adalah output.

Ia bukan Source of Truth secara otomatis.

Jika generated image berbeda dari required state:
- jangan mengubah upstream truth agar cocok dengan hasil
- revise affected specification if the intended state changed
- regenerate target output

## 22. Regeneration

Regeneration harus targeted.

Contoh:

Product packaging drift:
→ revise product-related prompt constraints
→ regenerate affected image.

Framing drift:
→ revise camera/composition section
→ regenerate affected image.

Face drift:
→ strengthen identity block and reference relationship
→ regenerate affected image.

Tidak perlu mengubah seluruh project.

## 23. Prompt Stability

Prompt dapat ditulis ulang tanpa mengubah specification.

Contoh:

Version A:
> Rositasari sits facing camera...

Version B:
> seated young adult woman with the established Rositasari identity, facing camera...

Selama keduanya menghasilkan requirement yang sama, Image Spec tetap authority.

## 24. Dependency Rules

Image Prompt depends on:
- Image Spec
- Production Spec
- Reference State
- Character Identity
- Product Truth
- Environment
- Visual Language
- Camera State
- Character State
- Product State
- applicable platform configuration

Changes upstream may make the Image Prompt STALE.

## 25. Stale Propagation

Examples:

Character Identity change:
→ Character State stale
→ Reference State stale
→ Image Spec stale
→ Image Prompt stale

Product Identity change:
→ Product State / Reference State affected
→ Image Spec stale
→ Image Prompt stale

Camera State change:
→ Image Spec stale
→ Image Prompt stale

Visual Language change:
→ Image Prompt stale for affected references.

## 26. Status

Image Prompt follows project state:

- NOT_STARTED
- IN_PROGRESS
- READY_FOR_DECISION
- APPROVED
- LOCKED
- STALE
- REVISED

LOCKED Image Prompt is the current generation instruction for its reference.

## 27. Boundary with Image Spec

Image Spec:
> required visual content.

Image Prompt:
> generation instruction implementing that content.

Image Prompt may improve wording.

It may not change required content.

## 28. Boundary with Video Prompt

Image Prompt:
> produces a stable visual snapshot.

Video Prompt:
> produces a state transition.

Do not use image prompt logic to describe frame-to-frame motion.

## 29. Boundary with Naturalization

Image Prompt should produce a stable, coherent reference.

Naturalization applies downstream to video motion.

Image Prompt should not attempt to simulate movement that belongs in Video Prompt.

## 30. Boundary with Production Spec

Production Spec defines production requirements.

Image Prompt is the final natural-language implementation of the image-specific subset.

## 31. Prompt Quality Rules

A good Image Prompt:
- preserves identity
- preserves state
- preserves product truth
- preserves continuity
- clearly defines visual priorities
- avoids unsupported detail
- avoids contradictory instructions
- avoids unnecessary prose
- remains usable by the target generation system

## 32. Non-Negotiable Rules

1. Image Prompt is downstream of Image Spec.
2. Image Prompt implements WHAT, it does not redefine WHAT.
3. Character Identity must be preserved.
4. Product Identity must be preserved.
5. Reference State must be represented accurately.
6. State must not become an action sequence.
7. Unsupported product claims must not be introduced.
8. Missing critical data must not be fabricated.
9. Visual Language must be applied without overriding state requirements.
10. Continuity anchors must be preserved where relevant.
11. Negative constraints should target real continuity risks.
12. Generated images do not become Source of Truth automatically.
13. Upstream changes propagate to affected prompts.
14. Regeneration must be targeted.
15. Image Prompt must remain distinct from Video Prompt.
16. No separate validation stage is introduced.

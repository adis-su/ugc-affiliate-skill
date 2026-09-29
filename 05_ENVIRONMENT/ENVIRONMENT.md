# AFFILIX — Environment

`ENVIRONMENT.md` adalah authoritative specification untuk **physical world** tempat karakter dan produk berada dalam scene.

Environment menjawab:

> **Di mana kejadian berlangsung, dan seperti apa kondisi dunia fisiknya?**

Environment harus dipisahkan dari:
- Character Identity
- Character State
- Product Identity
- Product State
- Camera State
- Visual Language

## 1. Purpose

Environment digunakan sebagai source untuk:
- Storyboard
- Global Timeline
- Reference State
- Production Spec
- Image Prompt
- Video Prompt
- Continuity

Environment harus konsisten sepanjang scene dan clip kecuali ada explicit environment change.

## 2. Environment Components

Environment dapat mencakup:

### Location
Tempat fisik berlangsungnya scene.

Contoh:
- bedroom
- living room
- kitchen
- bathroom
- office
- studio
- outdoor street
- marketplace environment

### Spatial Layout

Catat elemen yang menentukan hubungan ruang:

- room dimensions when relevant
- floor
- walls
- ceiling
- doors
- windows
- furniture
- shelves
- tables
- counters
- pathways
- object placement

Spatial layout harus cukup jelas untuk menjaga continuity.

### Background

Background mencakup elemen yang terlihat di belakang karakter atau produk.

Catat:
- dominant structures
- furniture
- decorative objects
- architectural elements
- visible surfaces
- background depth

Background tidak boleh berubah tanpa alasan scene atau explicit instruction.

### Surfaces and Materials

Catat jika relevan:

- floor material
- wall material
- countertop
- table surface
- fabric
- glass
- wood
- metal
- other visible materials

Jangan mengarang material yang belum ditentukan jika material tersebut penting terhadap scene atau product interaction.

### Lighting Environment

Environment dapat mendefinisikan kondisi pencahayaan:

- natural daylight
- window light
- indoor ambient light
- overhead light
- soft artificial light
- directional light
- mixed lighting

Lighting dapat berubah sebagai bagian dari waktu atau scene, tetapi perubahan harus memiliki alasan yang konsisten.

### Atmosphere

Atmosphere mencakup kondisi visual dan spatial:

- clean
- lived-in
- minimal
- cozy
- bright
- subdued
- calm
- busy
- professional
- casual

Atmosphere bukan klaim produk dan tidak boleh mengubah Product Truth.

### Environmental Objects

Objek yang berada di environment dapat mencakup:

- furniture
- decor
- appliances
- utensils
- books
- bags
- plants
- tools
- other contextual objects

Objek background harus tetap konsisten jika menjadi continuity anchor.

## 3. Environment Identity vs Environment State

Tidak semua aspek environment memiliki tingkat permanensi yang sama.

### Environment Identity

Elemen stabil yang mendefinisikan dunia scene:

- location type
- major architectural structure
- dominant furniture
- fixed spatial layout
- recurring background elements
- stable visual setting

### Environment State

Kondisi sementara:

- object moved
- door open/closed
- curtain open/closed
- light on/off
- item placed/removed
- temporary clutter
- character or product position

Environment State dapat berubah tanpa mengubah Environment Identity.

## 4. Spatial Continuity

Spatial continuity harus mempertahankan hubungan antara:

- character
- product
- furniture
- environmental objects
- camera
- light sources

Jika Rositasari berada di depan meja pada satu reference, posisi meja dan hubungan ruang harus tetap masuk akal pada reference berikutnya.

Jangan melakukan spatial teleportation tanpa transition atau explicit scene change.

## 5. Environment and Character

Environment harus mendukung Character State dan Performance.

Contoh:

> Rositasari berdiri di depan meja.

Environment harus menyediakan:
- posisi meja
- ruang berdiri
- permukaan yang relevan
- hubungan camera-to-character yang masuk akal

Environment tidak boleh mengubah Character Identity.

Untuk Rositasari:
- hijab tetap merupakan permanent character identity attribute.
- Environment tidak boleh menjadi alasan rambut terlihat.

## 6. Environment and Product

Environment harus mendukung Product State.

Contoh:

Product State:
> product berada di atas meja.

Environment harus memiliki:
- meja atau permukaan yang sesuai
- posisi spasial yang konsisten
- ruang yang cukup untuk interaksi

Environment tidak boleh mengubah Product Identity.

Jangan menambahkan:
- ukuran produk
- material produk
- fungsi produk
- fitur produk
- benefit produk

hanya karena environment terlihat cocok untuk klaim tersebut.

## 7. Environment and Camera

Camera State harus memiliki hubungan spasial yang masuk akal dengan environment.

Pertimbangkan:
- camera position
- camera height
- camera orientation
- distance to subject
- visible background
- foreground elements
- occlusion
- light direction

Perubahan camera angle dapat mengubah bagian environment yang terlihat, tetapi tidak otomatis mengubah environment itu sendiri.

## 8. Environment as Reference Anchor

Environment dapat menjadi anchor untuk menjaga continuity.

Useful anchors:
- window
- door
- bed
- sofa
- table
- countertop
- shelf
- wall feature
- lamp
- large plant
- architectural feature

Reference State dapat menggunakan anchor tersebut untuk menentukan posisi relatif karakter dan produk.

## 9. Environment Changes

Environment change harus explicit atau memiliki sebab yang jelas.

Contoh valid:

- curtain opened
- door closed
- product moved from table to hand
- light switched on
- character moved to another room
- scene transitions from indoor to outdoor

Jika perubahan memindahkan scene ke environment baru, perlakukan sebagai environment transition, bukan accidental continuity drift.

## 10. Scene Transitions

Saat scene berpindah environment:

**ENVIRONMENT STATE A → TRANSITION → ENVIRONMENT STATE B**

Contoh:

> bedroom → character walks through doorway → living room

Jangan membuat reference berikutnya tiba-tiba berada di living room tanpa transition jika continuity tersebut penting bagi cerita.

## 11. Environment Record

Gunakan struktur berikut:

### Environment Record

- Environment ID:
- Location:
- Spatial Layout:
- Background:
- Major Objects:
- Surfaces:
- Lighting:
- Atmosphere:
- Environmental Anchors:
- Current State:
- Continuity Notes:
- Allowed Changes:
- Prohibited Changes:

## 12. Environment and Global Timeline

Global Timeline menentukan **kapan** scene terjadi.

Environment menentukan **di mana** dan dalam kondisi ruang seperti apa scene terjadi.

Timeline dapat menyebabkan environment state berubah.

Contoh:

- 00:00 daytime bedroom
- 00:20 same bedroom with curtain opened
- 00:35 transition to kitchen

Environment tidak menentukan narrative timing sendiri.

## 13. Environment and Clip

A clip adalah generation unit.

Environment harus memiliki continuity di seluruh clip yang merepresentasikan scene yang sama.

Jika satu scene dibagi menjadi beberapa clip:
- environment layout harus tetap konsisten
- major anchors harus tetap
- lighting harus tetap kecuali perubahan memang ditentukan
- spatial relationships harus tetap
- state changes harus mengikuti transition

Clip boundary tidak boleh menjadi alasan environment berubah secara random.

## 14. Visual Detail Level

Environment detail harus disesuaikan dengan kebutuhan shot.

### Wide Shot

Prioritaskan:
- spatial layout
- major furniture
- architecture
- lighting
- overall atmosphere

### Medium Shot

Prioritaskan:
- character surroundings
- nearby furniture
- relevant objects
- surface relationships

### Close-Up

Prioritaskan:
- local surface
- immediate background
- relevant environmental cues
- lighting interaction

Jangan memenuhi prompt dengan detail background yang tidak terlihat atau tidak relevan.

## 15. Missing Environment Data

Jika environment membutuhkan data yang belum tersedia:

- mark UNKNOWN jika critical
- preserve known spatial facts
- do not invent specific architectural or material details when they affect continuity
- infer only generic details when they are non-critical and do not conflict with established facts
- block dependent generation if missing information makes continuity impossible

Environment should not become a source of fabricated product or character facts.

## 16. Common Failure Modes

### Background Drift

Furniture, architecture, or major objects change between references.

**Correction:** restore the established Environment Identity and anchors.

### Spatial Teleportation

Character or product suddenly changes position without a transition.

**Correction:** establish the missing spatial transition or correct the state.

### Lighting Drift

Lighting direction, intensity, or quality changes without a narrative or environmental cause.

**Correction:** restore the established lighting environment or define an explicit change.

### Object Duplication

An environmental object appears in multiple inconsistent positions.

**Correction:** maintain one coherent spatial state.

### Generic Background

Environment becomes an unspecified studio or generic room despite an established setting.

**Correction:** restore the Environment Record and relevant anchors.

### Overdescribed Environment

Prompt contains excessive environmental detail that does not contribute to the shot.

**Correction:** keep only details necessary for visual consistency and generation.

## 17. Environment Change Control

Environment changes must be explicit or traceable to a scene/state transition.

Changes may include:
- moving furniture
- opening or closing doors
- changing lighting condition
- changing room
- adding or removing contextual objects
- changing spatial arrangement

A temporary Environment State change does not automatically redefine Environment Identity.

When Environment Identity changes, affected downstream references and prompts may become STALE according to dependency rules.

## 18. Status

Environment follows the project stage state machine:

- NOT_STARTED
- IN_PROGRESS
- READY_FOR_DECISION
- APPROVED
- LOCKED
- STALE
- REVISED

After LOCKED, Environment becomes a downstream constraint.

## 19. Regeneration

Environment changes should use **targeted regeneration**.

Examples:

- Change wall color → regenerate affected references and prompts.
- Move table → regenerate affected spatial states and prompts.
- Change room → regenerate affected scene references and downstream outputs.
- Change temporary door state → regenerate only affected state-dependent outputs.

Do not regenerate unrelated character or product identity data.

## 20. Boundary with Visual Language

Environment defines:

> **the physical world.**

Visual Language defines:

> **how that world is visually presented.**

For example:

Environment:
> minimal bedroom with a wooden table and window.

Visual Language:
> naturalistic UGC look, handheld framing, soft daylight, realistic smartphone exposure.

Visual Language must not silently redefine the physical environment.

## 21. Boundary with Storyboard

Storyboard defines what the audience should see in a scene.

Environment defines the physical setting available to the storyboard.

Storyboard may specify:

> Rositasari sits at a table in the bedroom.

Environment provides:
- bedroom layout
- table
- seating
- window
- surrounding objects
- lighting context

Storyboard should not invent an environment that conflicts with the Environment Record.

## 22. Source of Truth

This document is the source of truth for project-specific physical environment definitions.

Downstream modules may reference it, but must not silently overwrite established environment facts.

Generated images and videos do not become a new Environment Source of Truth.

## 23. Non-Negotiable Rules

1. Environment defines the physical world of the scene.
2. Environment Identity is different from Environment State.
3. Environment must preserve spatial continuity.
4. Character Identity cannot be changed by environment.
5. Product Identity cannot be changed by environment.
6. Product Truth cannot be invented from environment context.
7. Camera changes do not automatically redefine the environment.
8. Scene transitions must be explicit or logically represented.
9. Missing critical environment data must not be fabricated.
10. Environment changes use targeted regeneration.
11. Generated output never becomes a new Source of Truth.
12. No separate validation stage is introduced; constraints operate throughout the pipeline.

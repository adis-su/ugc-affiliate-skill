# UGC Affiliate Skill

## Purpose

UGC Affiliate Skill is a reusable creative and prompt-generation system for affiliate UGC across Fashion, Beauty, and Home.

The primary objective is to generate:

1. High-quality Image Prompts
2. High-quality Frame-to-Frame Video Prompts

The generated content should feel like ordinary human-made UGC captured with a smartphone, not polished advertising or cinematic AI content.

## Core Principles

### 1. Human-Looking UGC
Every creative decision must support believable human-made content:
- Natural human anatomy and proportions
- Natural poses and micro-behaviors
- Believable product interaction
- Smartphone camera behavior
- Imperfect but plausible framing
- Natural lighting
- Realistic material and object physics
- Avoid excessive cinematic polish

### 2. Product Consistency
The same product must remain visually consistent across all scenes:
- Shape
- Color
- Material
- Packaging or garment details
- Branding and visible text when applicable
- Functional details
- Interaction state

### 3. Creator Consistency
The selected creator is an identity package. Character Identity controls visual continuity. Voice Identity controls spoken/audio continuity.

### 4. Prompt Is the Final Product
Strategy, analysis, creative concepts, behavior, and scene planning are supporting reasoning layers. The final deliverables are Image Prompts and Frame-to-Frame Video Prompts.

## Workflow

Input
→ Understanding
→ Creative Logic
→ Content Behavior
→ Image / Video Prompt Generation
→ Human Realism
→ Consistency
→ Output

## Input

### Niche
- Fashion
- Beauty
- Home

### Product
- Product Name
- Product URL

### Campaign
- Objective
- Stage
- CTA

### Creator
- Rositasari

### Content
- Format
- Angle
- Duration
- Scene Count

### Platform
- TikTok
- Instagram Reels
- Facebook Reels
- Shopee Video

## Processing Architecture

### 01. Understanding
- Input Validation
- Product Retrieval
- Product Intelligence
- Creator Identity Retrieval
- Campaign Understanding
- Content Understanding

### 02. Creative Logic
- Niche Logic
- Format Logic
- Angle Logic
- Format × Angle Matrix
- Creative Concept
- Scene Planning

### 03. Content Behavior
- Script Engine
- Behavior Engine
- Human Micro-Behavior
- Product Interaction
- Scene Behavior

Script and behavior are format-dependent. Silent formats such as Silent Mirror Selfie use behavioral scripting rather than spoken dialogue.

### 04. Image Prompt Engine
Build each image prompt from:
- Character
- Product
- Pose & Behavior
- Environment
- Camera
- Composition
- Lighting
- UGC Visual Language

### 05. Video Prompt Engine
Build each frame-to-frame video prompt from:
- Starting Frame
- Ending Frame
- Human Movement
- Facial Movement
- Product Movement
- Material Physics
- Camera Movement
- Environment Movement
- Frame Continuity

### 06. Human Realism Engine
Apply cross-cutting realism constraints:
- Human Anatomy
- Natural Pose
- Micro Movement
- Facial Expression
- Imperfection
- Smartphone Camera Behavior
- Natural Lighting
- UGC Authenticity

### 07. Consistency Engine
Maintain:
- Character Identity Lock
- Character Reference
- Voice Identity Lock when voice is used
- Voice Reference when voice is used
- Product Consistency
- Clothing / Appearance Consistency
- Environment Consistency
- Scene-to-Scene Consistency

## Output

### Image Prompts
Generate one prompt per planned scene.

### Frame-to-Frame Video Prompts
Generate one transition prompt for each consecutive scene pair:
- Scene 01 → 02
- Scene 02 → 03
- Scene 03 → 04
- etc.

## Quality Philosophy

Quality control is embedded into the engines rather than implemented as a separate QC layer.

Do not optimize for generic photorealism alone. Optimize for believable, ordinary, human-made UGC.


# Execution Contract

This section defines how the skill turns user input into final prompt outputs.

## Input Validation

Validate niche, product, campaign, creator, format, angle, duration, scene count, and platform before generation. Do not silently replace invalid choices. If a duration/scene combination is implausible, adjust the scene plan rather than forcing too many actions into too little time.

## Product Retrieval

When Product URL is available, retrieve it when possible and use it as the source of truth. Extract only supportable facts: product type, brand, color, pattern, material, shape, size, functional features, packaging, visible branding, intended use, and relevant selling points. Separate observed facts from assumptions. If the product cannot be reliably understood, avoid inventing attributes.

## Creator Retrieval

Retrieve the selected creator file from creators/. Character Identity is the visual source of truth. Voice Identity is the spoken/audio source of truth. Missing identity details must not be invented.

## Format And Angle Logic

The niche file defines valid formats, angles, and niche-specific realism. Format determines behavior. Angle determines what the viewer should notice. The angle must be demonstrated through visible behavior, not merely stated in copy.

Evaluate Format × Angle compatibility using four checks: natural demonstration, product visibility, duration fit, and scene-count fit. Preserve the user's intent when resolving weak combinations.

## Creative And Scene Planning

Create one concise concept covering hook, product role, creator behavior, viewer takeaway, and CTA behavior when applicable. Plan each scene around one dominant purpose. Each scene should define objective, creator action, product interaction, environment, camera state, body/facial behavior, transition state, and relevant realism constraints. Prefer continuity over unnecessary scene changes.

## Content Behavior

Spoken formats use a short conversational script aligned with Voice Identity. Silent formats use a behavioral sequence instead of dialogue. Useful silent behavior may follow a pattern such as notice → interact → inspect → react → reveal, adapted to the product and format.

Human micro-behaviors should be restrained and contextual: natural blinking, weight shifts, small posture adjustments, glances, grip changes, clothing adjustments, or subtle reactions. Do not add random motion merely to make content look realistic.

## Image Prompt Contract

Generate one complete Image Prompt per scene. Each prompt must resolve Character, Product, Pose & Behavior, Environment, Camera, Composition, Lighting, and UGC Visual Language. Prioritize visible evidence over generic adjectives. Preserve product, creator, wardrobe, and environment continuity. Avoid cinematic or commercial polish unless explicitly requested.

## Video Prompt Contract

Generate one Frame-to-Frame Video Prompt for every consecutive scene pair. Each transition must specify Starting Frame, Ending Frame, Human Movement, Facial Movement, Product Movement, Material Physics, Camera Movement, Environment Movement, and Frame Continuity. Describe a believable transition, not a newly invented scene. No teleportation, identity changes, unexplained wardrobe changes, impossible hand movement, sudden cinematic camera moves, or broken room geometry.

## Cross-Cutting Realism

Human Realism and Consistency apply throughout generation. Check anatomy, pose, micro-movement, facial expression, plausible imperfection, smartphone camera behavior, lighting, character identity, voice identity when used, product identity, appearance, environment, and scene continuity. The goal is ordinary human-made UGC, not generic photorealism or polished advertising.

## Output Contract

Return, in order:

1. Creative Summary: niche, format, angle, concept, duration, scene count.
2. Scene Plan: objective, action, product interaction, behavior, environment for each scene.
3. Image Prompts: one complete prompt per scene.
4. Frame-to-Frame Video Prompts: one transition prompt per consecutive scene pair.
5. Spoken Script: only for formats using speech.
6. Silent Behavior Script: for silent formats.

Do not expose internal validation or reasoning unless explicitly requested.

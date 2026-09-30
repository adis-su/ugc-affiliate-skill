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

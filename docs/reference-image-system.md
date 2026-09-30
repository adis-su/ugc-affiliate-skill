# Reference Image System

## Purpose

The Reference Image System manages multiple image references attached to a single storyboard scene.

A scene is not limited to one reference image. A scene may use several references, each with a specific role such as creator identity, product identity, environment, pose, composition, or lighting.

The system answers:

> Which reference controls which visual constraint, and how should those references be fused into one coherent scene or frame?

It prevents the common failure mode of treating every reference image as an undifferentiated visual instruction.

## Core Principle

**Reference images are constraints, not the scene itself.**

The upstream storyboard defines what should happen. Reference images provide visual evidence for specific parts of that scene. The Prompt Compiler combines those constraints into one coherent image or video instruction.

Do not ask the generation model to blindly reproduce all references. Assign each reference a role and priority first.

## Reference Types

Supported reference roles:

- creator: identity, face, hair, body proportions, appearance
- product: exact garment/product identity, color, pattern, logo, construction, fit
- environment: location, room, mirror, furniture, spatial layout
- pose: body position, hand position, stance, gesture
- composition: framing, subject placement, crop, negative space
- lighting: light direction, intensity, practical-light context
- style: visual treatment when explicitly required
- prop: specific object or contextual item
- custom: explicitly defined visual constraint

## Reference Priority

Recommended priority hierarchy:

1. critical identity references
2. critical product references
3. environment/spatial references
4. pose and interaction references
5. composition references
6. lighting references
7. aesthetic/style references

Priority is scene-dependent. An explicit user-provided reference always outranks a generic stylistic preference.

Recommended priority values:

- critical
- high
- medium
- low

## Global vs Scene-Specific References

References can be global or scene-specific.

### Global references

Used across multiple scenes:

- creator identity
- product identity
- recurring environment
- recurring props

### Scene-specific references

Used only for one scene or one frame:

- pose
- composition
- hand interaction
- temporary environment
- lighting variation

Global references protect continuity. Scene-specific references control variation.

## Reference Mapping

Every reference should declare:

- id
- type
- source
- role
- priority
- scope
- purpose

Canonical structure:

    reference_image:
      id: "ref_product"
      type: "product"
      source: ""
      role: "product_identity"
      priority: "critical"
      scope: "global"
      purpose: "preserve exact garment identity across all scenes"

## Scene-Level Reference Set

Each scene may contain its own ordered reference set.

    scene:
      scene_id: 1
      reference_images:
        - id: "ref_creator"
          type: "creator"
          role: "identity"
          priority: "critical"
          purpose: "preserve creator identity"
        - id: "ref_product"
          type: "product"
          role: "product_identity"
          priority: "critical"
          purpose: "preserve exact product"
        - id: "ref_bedroom"
          type: "environment"
          role: "spatial_context"
          priority: "high"
          purpose: "preserve bedroom and mirror geometry"
        - id: "ref_pose_01"
          type: "pose"
          role: "body_position"
          priority: "high"
          purpose: "guide relaxed mirror-selfie stance"

## Frame-Level References

Frame A and Frame B may inherit the scene reference set and optionally add scene-specific references.

    frame_a:
      reference_images:
        inherit: ["ref_creator", "ref_product", "ref_bedroom"]
        add: ["ref_pose_01"]

    frame_b:
      reference_images:
        inherit: ["ref_creator", "ref_product", "ref_bedroom"]
        add: ["ref_pose_02"]

Do not silently replace a critical global identity or product reference with a lower-priority scene reference.

## Reference Fusion

When compiling an image prompt:

1. preserve critical creator identity
2. preserve critical product identity
3. establish environment geometry
4. apply pose and interaction
5. apply composition
6. apply lighting/style
7. reconcile conflicts using priority and scope
8. produce one coherent visual state

The final prompt should explicitly explain the role of references when the generation system needs that clarification.

Example:

> Use the creator reference for identity and body proportions, the product reference for exact garment design, the bedroom reference for spatial layout and mirror geometry, and the pose reference for body position and phone placement.

## Conflict Resolution

When references conflict:

1. explicit user instruction
2. critical identity/product reference
3. high-priority scene reference
4. global environment reference
5. medium/low-priority aesthetic reference
6. generic generation defaults

Never merge contradictory product attributes.

If two references show different product colors, logos, or garment constructions and the conflict cannot be safely resolved, flag it for QC rather than inventing a compromise.

## Mirror Selfie Reference Rules

For mirror-selfie scenes, the reference system must preserve:

- one creator
- one phone
- coherent reflection
- correct hand-to-phone relationship
- stable mirror plane
- stable room geometry
- physically plausible body placement
- stable product identity

A pose reference can guide body position, but it must not override mirror geometry or product identity.

## Reference vs Generated Frame

A reference image is an input constraint. A generated image/frame is an output state.

    reference image
    → source constraint

    generated Frame A
    → actual starting state

    generated Frame B
    → actual ending state

Video generation should transition between generated states while retaining the relevant reference constraints.

## QC

Validate:

- every critical reference has a clear role
- product reference is not contradicted
- creator identity reference is stable
- scene references are relevant
- frame references are compatible
- no unnecessary reference overload
- no unresolved critical conflicts
- mirror references obey reflection geometry

Reference quality is not measured by reference count. More references do not automatically produce more control.

## Anti-Patterns

Do not:

- treat all references as equally authoritative
- use five pose references that contradict one another
- let a style reference override product identity
- replace a creator reference with generic beauty descriptors
- describe every reference literally inside the final prompt
- add references merely because they exist
- use references to hide an unclear storyboard

The objective is **high constraint density with low ambiguity**, not maximum reference count.

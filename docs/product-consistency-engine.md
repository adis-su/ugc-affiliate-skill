# Product Consistency Engine

## Purpose

The Product Consistency Engine is a cross-cutting control layer that preserves the identity, construction, appearance, and physical behavior of the featured product across all generated UGC assets.

Its purpose is to prevent the most damaging product-generation failure:

> the product starts as one product and gradually becomes a different product.

The engine protects product consistency across:

- scenes
- image references
- frame-to-frame video transitions
- creator interactions
- camera angles
- lighting changes
- garment deformation
- product handling
- before/after states
- platform adaptations

The target is:

~~~text
same product identity
+
physically plausible deformation
+
stable visual details
+
consistent creator interaction
=
reliable product continuity
~~~

---

# 1. Core Principle

**Physical deformation is allowed. Product identity drift is not.**

A garment can:

- wrinkle
- fold
- stretch slightly
- compress
- hang differently
- move with the body

An object can:

- rotate
- tilt
- be partially occluded
- move closer to camera
- be held from a different angle

But the underlying product must remain the same.

The engine distinguishes:

~~~text
PHYSICAL STATE CHANGE
        vs
IDENTITY CHANGE
~~~

Physical state change is expected.

Identity change is a failure.

---

# 2. Engine Position

Product Consistency operates across the entire generation pipeline.

Canonical architecture:

~~~text
Product URL / Reference
        ↓
Product Intelligence
        ↓
Creative Concept
        ↓
Script / Behavior
        ↓
Storyboard
        ↓
Image Reference Prompt
        ↓
Video Prompt
        ↓
Human Realism
        ↓
Product Consistency
        ↓
Quality Control
~~~

It should also feed product constraints upstream when a proposed action risks damaging consistency.

---

# 3. Input Contract

Required:

- Product Intelligence
- product name
- product URL
- product reference image(s), if available
- product attributes
- storyboard
- image reference prompt
- video prompt
- creator interaction
- scene duration
- continuity anchors

Canonical input:

~~~yaml
product_consistency_input:
  product:
    name: ""
    category: ""
    identity: []
    visual_attributes: []
    construction_attributes: []
    material_attributes: []
    reference_images: []

  scene:
    product_state: ""
    interaction: ""
    camera_angle: ""
    lighting: ""

  continuity:
    previous_state: ""
    next_state: ""
    anchors: []
~~~

---

# 4. Product Identity Model

The engine should separate product attributes into four levels.

## Level 1: Identity-Critical

These must remain stable.

Examples:

- product category
- primary color
- core pattern
- logo
- graphic
- distinctive print
- major silhouette
- collar type
- sleeve type
- major construction features

## Level 2: Structural

These should remain stable unless physically occluded.

Examples:

- seam placement
- pocket location
- button count
- zipper placement
- hem shape
- panel construction
- stitching structure

## Level 3: Material

These describe physical appearance.

Examples:

- fabric texture
- surface finish
- thickness impression
- drape
- stiffness
- sheen

Material appearance may vary slightly with lighting and movement, but should remain consistent.

## Level 4: State

These can change naturally.

Examples:

- folded vs unfolded
- wrinkled vs smoothed
- hanging vs worn
- front-facing vs side-facing
- held vs placed
- partially occluded vs fully visible

The engine must never confuse a legitimate state change with an identity change.

---

# 5. Product Identity Lock

Every scene should have a product identity lock.

Canonical structure:

~~~yaml
product_identity_lock:
  category: ""
  color: ""
  pattern: ""
  logo: ""
  silhouette: ""
  collar: ""
  sleeves: ""
  hem: ""
  seams: ""
  material: ""
  distinctive_details: []
~~~

The lock is derived from verified Product Intelligence.

It must not invent details absent from the source product.

---

# 6. Source of Truth

Priority order:

1. Product reference image
2. Product URL information
3. Verified Product Intelligence
4. User-provided description
5. Generic visual assumptions

When sources conflict:

- preserve the most reliable verified attribute
- flag ambiguity
- do not invent a compromise product

If the source does not establish a detail, leave it unspecified.

---

# 7. Reference Image Priority

If a product reference image exists, it is the primary visual authority.

Prompt instructions should reinforce the reference rather than replace it.

Good:

> preserve the exact shirt color, graphic placement, collar construction, sleeve length, and silhouette shown in the reference.

Bad:

> redesign the shirt as a cleaner modern version.

The engine must not “improve” the product.

Humanity has survived without AI improving every shirt. Barely, perhaps, but still.

---

# 8. Product Attribute Extraction

Product Intelligence should extract:

### Visual

- color
- color combinations
- pattern
- print
- logo
- graphic
- typography
- finish

### Construction

- collar
- neckline
- sleeve
- cuff
- hem
- pocket
- zipper
- buttons
- seams
- panels

### Shape

- regular fit
- slim fit
- relaxed fit
- oversized
- cropped
- longline
- structured
- draped

### Material

- knit
- woven
- cotton-like
- fleece-like
- denim
- leather-like
- technical fabric
- other verified material description

### Distinctive Details

Any detail that would allow a viewer to identify the product.

Only verified details become hard locks.

---

# 9. Product State Model

Every scene should track product state.

Canonical:

~~~yaml
product_state:
  visibility: "full"
  orientation: "front"
  worn_or_held: "worn"
  deformation: "natural folds"
  interaction: "creator touching hem"
  occlusion: "none"
~~~

Possible state dimensions:

- visibility
- orientation
- worn/held/placed
- deformation
- interaction
- occlusion
- distance to camera

State should be explicit because the same product can look dramatically different without actually changing identity.

---

# 10. Scene-to-Scene Continuity

The product state should flow between scenes.

Example:

~~~text
Scene 1:
front-facing, worn, relaxed hem

Scene 2:
slightly turned, worn, sleeve adjusted

Scene 3:
front-facing again, sleeve settled
~~~

The identity remains constant while the physical state changes.

The engine should flag:

~~~text
Scene 1:
black shirt with white logo

Scene 2:
black shirt with red logo
~~~

as identity drift.

---

# 11. Creator-Product Relationship

Product consistency includes how the product sits on the creator.

Track:

- approximate fit
- garment scale
- shoulder position
- sleeve position
- hem position
- body coverage
- drape
- contact points

Do not allow the garment to become:

- dramatically tighter
- dramatically looser
- shorter
- longer
- differently proportioned

unless the action physically explains the change.

---

# 12. Fit Consistency

Fit should remain stable across scenes.

For example:

~~~text
relaxed fit
→ slight fabric compression
→ relaxed fit
~~~

is valid.

But:

~~~text
relaxed fit
→ skin-tight fit
→ oversized fit
~~~

without explanation is not.

Fit variation caused by:

- posture
- camera angle
- fabric tension
- folds

is acceptable.

Structural fit change is not.

---

# 13. Color Consistency

Color should remain stable across scenes.

Allow:

- natural exposure differences
- warm/cool lighting changes
- mild phone white-balance variation

Do not allow:

- blue becoming green
- black becoming navy
- cream becoming white
- red becoming orange

unless the change is demonstrably caused by the lighting environment and remains physically plausible.

The engine should distinguish:

~~~text
lighting variation
vs
product recoloring
~~~

---

# 14. Pattern and Graphic Consistency

Patterns and graphics are high-risk.

Lock:

- graphic position
- logo proportions
- print orientation
- pattern repetition
- text placement
- major graphic colors

Avoid:

- logo movement
- letters changing
- pattern redesign
- missing graphic
- duplicated graphic
- mirrored graphic unless physically caused by reflection
- graphic appearing through opaque fabric

For text-bearing products, preserve legibility when visible, but do not invent unreadable microtext.

---

# 15. Logo Consistency

Logo behavior:

- remains attached to the product
- follows fabric deformation
- maintains relative position
- does not duplicate
- does not disappear without occlusion
- does not change shape

A logo may become partially obscured by folds or body position.

That is acceptable.

A logo changing into a different symbol is not.

---

# 16. Garment Geometry

Track structural geometry:

- collar opening
- shoulder seam
- sleeve length
- sleeve opening
- hem width
- pocket geometry
- zipper line
- button alignment
- panel boundaries

Geometry can deform through movement.

But the underlying construction should remain recognizable.

---

# 17. Material Consistency

Material should react according to the verified product type.

Examples:

### Lightweight fabric

- faster fold response
- softer drape
- smaller tension effects

### Heavy fleece

- slower movement
- deeper folds
- stronger mass behavior

### Denim

- structured folds
- less fluid drape
- stronger crease behavior

### Structured outerwear

- stronger silhouette
- limited collapse

Never infer a specific material property if the source does not support it.

---

# 18. Lighting Interaction

Product appearance can change under different lighting without changing identity.

The engine should preserve:

- underlying color
- texture
- material
- construction

while allowing:

- highlights
- shadows
- exposure
- reflections
- color temperature

The product must not become visually inconsistent merely because the camera changes position.

---

# 19. Occlusion

Occlusion is one of the most important legitimate causes of temporary product disappearance.

Examples:

- arm covers logo
- phone blocks chest area
- creator turns sideways
- hand covers a sleeve
- packaging hides product

The engine should model:

~~~text
visible
→ occluded
→ revealed
~~~

rather than:

~~~text
visible
→ disappears
→ reappears differently
~~~

When an important detail is hidden, continuity anchors should preserve its identity mentally even while it is not visible.

---

# 20. Camera Angle Changes

Changing angle can alter perceived product proportions.

The engine should distinguish:

- perspective change
- actual geometry change

Examples:

A shirt may look shorter from a low or side angle.

That does not mean the hem actually changed.

Avoid prompts that force every scene to match identical apparent proportions when the camera legitimately changes.

---

# 21. Product Interaction Physics

Interactions should have physical consequences.

### Adjusting a sleeve

~~~text
hand contacts sleeve
→ sleeve tension changes
→ fabric folds locally
→ hand releases
→ sleeve settles
~~~

### Smoothing hem

~~~text
hand presses fabric
→ local folds reduce
→ hand moves across fabric
→ fabric settles
~~~

### Holding product

~~~text
hand grips product
→ local compression
→ product weight affects hand
→ object remains attached to grip
~~~

The product should not respond before contact.

---

# 22. Product Distance and Scale

Product scale should remain physically coherent.

When the creator brings the product closer:

- apparent size increases
- background relation changes naturally
- hand/product relationship remains plausible

When the creator moves it away:

- apparent size decreases
- framing changes accordingly

Avoid arbitrary scale jumps.

---

# 23. Product State Across Frame-to-Frame Video

For every video scene:

~~~text
Frame A Product State
        ↓
physical action
        ↓
Frame B Product State
~~~

The video engine should not change product identity while interpolating.

Example:

~~~text
Frame A:
logo centered on chest

Action:
creator smooths shirt

Frame B:
logo still centered on chest, fabric slightly smoother
~~~

Valid.

Example:

~~~text
Frame A:
logo centered on chest

Frame B:
logo moved to shoulder
~~~

Invalid unless the product itself physically changes or the visible region is different because of orientation.

---

# 24. Before / After

Before/After content requires special handling.

A product may be:

- absent in Before
- present in After
- differently styled
- differently worn

This is a legitimate state transition.

The engine should define:

~~~yaml
before_after:
  before_state: ""
  transition_type: "cut"
  after_state: ""
  identity_constraints: []
~~~

Large outfit changes should generally use a deliberate cut or transformation transition rather than physically impossible continuous morphing.

---

# 25. Try-On

Try-On content requires tracking:

~~~text
garment absent
→ garment introduced
→ garment positioned
→ garment worn
→ fit settles
~~~

The product identity must remain constant throughout.

Do not allow:

- collar changes
- sleeve changes
- logo changes
- color changes
- fit changes unrelated to dressing

---

# 26. GRWM

GRWM often introduces products sequentially.

Track each product independently.

Example:

~~~yaml
products:
  - id: "shirt"
    identity_lock: {}
    state: "worn"

  - id: "jacket"
    identity_lock: {}
    state: "held"
~~~

Do not let one garment inherit another garment's color, logo, or construction.

---

# 27. Unboxing

Unboxing has a specific product state chain:

~~~text
packaged
→ package opened
→ product partially revealed
→ product removed
→ product inspected
~~~

The same product must appear across these states.

Packaging may obscure the product, but should not alter its identity.

---

# 28. Product Showcase

For product-dominant scenes, identity-critical details receive maximum protection.

Prioritize:

1. product category
2. primary color
3. logo/graphic
4. distinctive construction
5. material appearance
6. proportions

Camera movement should reveal details rather than accidentally change them.

---

# 29. Product Reference vs Prompt

The prompt should describe:

- what must remain stable
- what physical change is happening
- what is currently visible

The reference image should establish:

- exact visual identity
- proportions
- construction
- graphic details

Do not use text to override a stronger product reference without a verified reason.

---

# 30. Consistency Anchors

Each scene should carry product anchors.

Canonical:

~~~yaml
product_continuity_anchors:
  - "same primary color"
  - "same logo placement"
  - "same collar construction"
  - "same sleeve length"
  - "same overall fit"
  - "same graphic proportions"
  - "same material appearance"
~~~

Anchors should be reused across scenes.

Only add anchors that matter to the actual product.

---

# 31. Priority Rules

When product details conflict with stylistic instructions:

**Product identity wins.**

When product identity conflicts with camera angle:

**Physical perspective explains the difference.**

When product identity conflicts with an unsupported creative embellishment:

**Remove the embellishment.**

When a product detail is uncertain:

**Do not invent it.**

When a product reference and generic fashion expectation conflict:

**The reference wins.**

---

# 32. Realism vs Consistency

Consistency should not produce frozen products.

Bad:

> keep every fold identical across every frame.

Good:

> preserve product construction and identity while allowing natural folds and deformation caused by movement.

The objective is:

~~~text
stable identity
+
dynamic physical state
~~~

not:

~~~text
stable pixels
~~~

---

# 33. Product Consistency Density

Not every scene needs the same level of locking.

### Low product visibility

Use:

- identity anchors
- major color
- silhouette
- visible distinctive detail

### Medium visibility

Use:

- color
- construction
- fit
- material
- visible graphics

### High visibility / product showcase

Use:

- all identity-critical attributes
- structural attributes
- material behavior
- camera-specific visibility

The engine should allocate attention according to product visibility.

---

# 34. Validation

Before output, validate:

### Identity

- Is this still the same product?
- Are identity-critical details unchanged?

### Construction

- Are collar, sleeves, seams, hem, pockets, and closures consistent?

### Fit

- Does the product remain consistent on the same creator?

### Material

- Does the fabric behave plausibly?

### Color

- Is variation explainable by lighting or exposure?

### Graphics

- Are logos, prints, and patterns stable?

### Interaction

- Does the product respond to contact physically?

### Occlusion

- Are missing details explained by visibility?

### Scene continuity

- Does the product state connect between scenes?

### Video continuity

- Does Frame A transition naturally into Frame B?

---

# 35. Failure Modes

### Product recoloring

The product changes color between frames or scenes.

### Logo drift

The logo changes location, shape, or scale.

### Pattern mutation

The graphic or pattern changes during motion.

### Garment redesign

Collar, sleeves, pockets, or hem change.

### Fit drift

The garment becomes unexpectedly tighter or looser.

### Material drift

Fabric changes from soft to stiff, matte to glossy, or vice versa without cause.

### Scale drift

Product suddenly becomes larger or smaller without camera or distance explanation.

### Occlusion failure

A hidden product detail reappears incorrectly.

### Interaction failure

Hands and product do not physically connect.

### Reflection mismatch

Mirror reflection shows a different product state.

### Scene inheritance failure

Scene N+1 starts with a different product than Scene N ended with.

---

# 36. Product Consistency Scorecard

This is a **diagnostic checklist, not a user-facing score**.

Check:

- identity-critical attributes stable
- structural attributes stable
- material behavior plausible
- fit stable
- color stable
- graphic stable
- interaction plausible
- occlusion explained
- scene chaining valid
- frame transition valid

Any critical identity failure should block final output until corrected.

---

# 37. Downstream Handoff

The Product Consistency Engine passes structured constraints to Quality Control.

Canonical:

~~~yaml
product_qc_input:
  identity_lock: {}
  state_by_scene: []
  continuity_anchors: []
  high_risk_attributes: []
  allowed_variations: []
  prohibited_changes: []
~~~

It should also pass relevant constraints back into:

- Image Reference Prompt Engine
- Frame-to-Frame Video Prompt Engine
- Human Realism Engine

---

# 38. Engine Boundary

The Product Consistency Engine:

### Does

- define product identity locks
- track product state
- preserve visual attributes
- preserve construction
- model physical deformation
- model product interaction
- track occlusion
- track scene-to-scene continuity
- protect logos and graphics
- validate product transitions
- identify high-risk product attributes

### Does not

- invent product specifications
- invent product benefits
- write campaign strategy
- choose the content angle
- choose the UGC format
- rewrite the creative concept
- change the creator
- make unsupported aesthetic upgrades
- replace Human Realism
- replace Quality Control

---

# 39. Final Product Consistency Test

Ask:

> **If the creator, camera angle, lighting, pose, and physical state changed, could a viewer still recognize the product as the exact same product?**

Then ask:

> **Can every visible difference be explained by perspective, lighting, occlusion, or physical deformation?**

If not, the scene has a consistency problem.

---

# 40. End-to-End Logic

~~~text
Verified Product Information
        ↓
Extract identity-critical attributes
        ↓
Create Product Identity Lock
        ↓
Define product state
        ↓
Track creator-product relationship
        ↓
Track scene continuity
        ↓
Track Frame A → Frame B
        ↓
Allow physical deformation
        ↓
Block identity drift
        ↓
Validate color / logo / pattern / construction / fit
        ↓
Validate interaction + occlusion
        ↓
Pass constraints to prompts + QC
~~~

The goal is not to freeze the product.

The goal is to let the product **move, fold, wrinkle, rotate, and interact naturally while remaining unmistakably the same product**.

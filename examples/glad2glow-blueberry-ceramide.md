# Glad2Glow Blueberry 5% Ceramide — Product Fixture

This fixture uses the supplied Shopee listing as the Product Source of Truth. Only product facts directly supported by the listing are treated as resolved.

## Input

- Niche: Beauty
- Product: Glad2Glow Moisturizer Blueberry 5% Ceramide Barrier Repair Moisturizer 30g
- Product URL: https://shopee.co.id/Glad2Glow-Moisturizer-Blueberry-5-Ceramide-Barrier-Repair-Moisturizer-30g-glad-2-glow-ceramide-moisturizer-Glade-2-glow-moisturizer-glad-to-glow-moisturizer-i.164147180.24811432921
- Campaign Objective: Product Consideration
- Campaign Stage: Consideration
- CTA: Check the Product
- Creator: Rositasari
- Format: Product Application
- Angle: Everyday Moisturizer Routine
- Duration: 12 sec
- Scene Count: 4
- Generator: Google Flow
- Platform: TikTok

## Resolved Product Intelligence

```yaml
product:
  brand: "Glad2Glow"
  name: "Glad2Glow Moisturizer Blueberry 5% Ceramide Barrier Repair Moisturizer 30g"
  category: "Face Moisturizer"
  size: "30g"
  variant: "Blueberry 5% Ceramide"
  source:
    platform: "Shopee Indonesia"
    source_type: "product_listing"
    retrieval_status: "listing_observed"
  observed:
    listing_title: "Glad2Glow Moisturizer Blueberry 5% Ceramide Barrier Repair Moisturizer 30g"
    listed_price_idr: 56000
  claims:
    supported_by_listing_title:
      - "5% Ceramide"
      - "Barrier Repair"
    usage_evidence:
      - "Moisturizer"
  unknown:
    - "full ingredient list"
    - "exact texture"
    - "finish"
    - "skin-type suitability"
    - "clinical efficacy"
    - "exact packaging dimensions"
```

## Product Identity Lock

- Preserve the exact Glad2Glow product identity and Blueberry 5% Ceramide variant.
- Preserve 30g size when visible.
- Use the supplied Shopee listing imagery as the visual packaging reference when available.
- Do not redesign the packaging.
- Do not invent texture, finish, ingredient list, clinical results, skin-type suitability, or before/after effects.
- Do not change the product into another Glad2Glow variant.

## Scene Plan

### Scene 01

- Purpose: Establish the moisturizer and routine context.
- State: Rositasari holds the closed product near her face with the packaging facing camera.
- Creator Action: Briefly looks at the product, then toward camera.
- Product Interaction: Holds the closed moisturizer.
- Behavior Cue: Small inspection glance.
- Environment: Ordinary bedroom or vanity area.
- Camera State: Vertical smartphone medium close-up.
- Transition Intent: Bring the product into the routine and open it.
- Transition Cause: Rositasari decides to use the moisturizer.

### Scene 02

- Purpose: Show the product being opened without inventing packaging mechanics.
- State: Product is opened and held naturally.
- Creator Action: Opens the container using both hands.
- Product Interaction: Natural hand contact with the container.
- Behavior Cue: Focused, relaxed expression.
- Environment: Same setting.
- Camera State: Similar vertical smartphone framing.
- Transition Intent: Take a small amount for application.
- Transition Cause: The opened moisturizer is ready for use.

### Scene 03

- Purpose: Show application behavior.
- State: Rositasari applies a small, visually plausible amount of the moisturizer to her face.
- Creator Action: Applies the product with controlled fingertip movement.
- Product Interaction: Fingers contact the product, then the face.
- Behavior Cue: Calm, natural concentration.
- Environment: Same setting.
- Camera State: Slightly tighter smartphone framing.
- Transition Intent: Finish application and show the resulting routine state.
- Transition Cause: The application reaches a natural stopping point.

### Scene 04

- Purpose: End on a natural UGC product/result frame.
- State: Rositasari faces the camera with the product still identifiable nearby.
- Creator Action: Gives a subtle natural expression and keeps the product visible.
- Product Interaction: Product remains stationary in the scene.
- Behavior Cue: Small satisfied-looking reaction without exaggerated acting.
- Environment: Same setting.
- Camera State: Vertical smartphone close-up.
- Transition Intent: None.

## Google Flow Timeline

- Scene count: 4
- Transition count: 3
- Clip durations: 4s + 4s + 4s
- Total duration: 12s

## Content Guardrails

- Spoken claims must not exceed the resolved Product Intelligence.
- The product name may be referenced exactly as supplied.
- Do not state that the product clinically repairs skin, cures a condition, guarantees a result, or suits a specific skin type unless separately supplied and resolved as supported product facts.
- Visual prompts must describe only the current state.
- Video prompts must describe the physical transition between adjacent states.
- Preserve the canonical Rositasari Character Identity Lock in every image and video prompt.

## Expected Output Shape

- 4 Image Prompts
- 3 Frame-to-Frame Video Prompts
- 3 Google Flow clips: 4s + 4s + 4s
- Silent behavior sequence: notice → inspect → open → apply → finish

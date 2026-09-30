# Generation Integration

This layer connects validated prompt contracts to external image and video generation providers.

It is intentionally provider-neutral.

## Boundary

The runtime owns:

- resolved Scene State;
- Image Prompt contracts;
- Video Prompt contracts;
- identity/product continuity locks;
- validation before dispatch;
- generation request metadata.

A provider adapter owns:

- provider authentication;
- model selection;
- reference-image attachment;
- request serialization;
- polling/webhook behavior;
- provider-specific response normalization.

The provider must never become the source of truth for creator identity, product identity, campaign intent, or scene state.

## Pipeline

```
Validated GenerationOutput
  ↓
Generation Adapter
  ↓
Provider Request
  ↓
Generated Asset
  ↓
Asset Normalization
  ↓
Post-Generation Validation
  ↓
Accepted Asset / Regeneration Blocker
```

## Required Adapter Contract

Image:

```text
generateImage({
  scene,
  imagePrompt,
  references,
  options
}) → GenerationAsset
```

Video:

```text
generateVideo({
  fromScene,
  toScene,
  videoPrompt,
  startFrame,
  endFrame,
  references,
  options
}) → GenerationAsset
```

Adapters must not invent missing references. If a required reference is unavailable, return a structured blocker.

## Asset Contract

Every generated asset must retain:

- request id;
- scene id or transition id;
- provider;
- model;
- source prompt;
- reference ids;
- generation status;
- asset URI;
- dimensions/duration when known;
- validation status.

## Provider Strategy

The repository should support multiple providers without changing creative contracts.

Provider-specific differences belong inside adapters.

Recommended order:

1. implement a deterministic mock adapter;
2. integrate one real image provider;
3. integrate one real video provider;
4. add post-generation validation;
5. add retry/regeneration policy.

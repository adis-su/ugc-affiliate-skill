# Intelligence Retrieval Layer

The runtime separates retrieval from generation so Product Intelligence and Creator Intelligence have explicit source provenance.

## Product Retrieval

Input may contain:

- `product.product_facts`: explicit user facts
- `product.retrieved_facts`: facts supplied by an external retrieval adapter
- `product.product_url`: source URL
- `fixture_setup.mock_product_source`: deterministic test source

Precedence:

1. explicit user facts
2. retrieved product facts
3. fixture source
4. unknown

The runtime never invents missing attributes. Unknown attributes remain explicit in `unknown_attributes`.

Conflicts are preserved in `conflict_notes`. An explicit fact conflicting with another source blocks generation until the source conflict is resolved.

A Product URL by itself does not magically become product truth. The runtime records `product_url_pending_retrieval` until an adapter supplies retrieved facts. This keeps the core runtime portable and prevents fabricated product details.

## Creator Retrieval

The Creator Library remains the baseline identity source.

Optional request data may supply:

```
creator_identity.character
creator_identity.voice
```

or the equivalent `creator_reference.character` / `creator_reference.voice`.

Supplied creator identity fields override null or missing library fields. Missing fields remain unknown.

Character Reference and Voice Reference are tracked independently:

- Character Reference → visual generation and character continuity
- Voice Reference → spoken generation and voice continuity

The runtime does not infer appearance, age, body type, accent, or vocal characteristics from the creator name.

## Adapter Boundary

The portable runtime expects an external retrieval layer to populate `retrieved_facts` and creator reference data. A future network adapter can fetch the Product URL, normalize the result, and pass it into the same contract without changing the creative engines.

Pipeline:

```
Product URL / Creator Reference
        ↓
External Retrieval Adapter
        ↓
Normalized Intelligence Input
        ↓
Product / Creator Intelligence
        ↓
Identity Locks
        ↓
Creative Runtime
```

This boundary keeps source retrieval, reasoning, and prompt generation separate.

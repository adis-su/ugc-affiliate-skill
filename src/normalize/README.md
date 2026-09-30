# Normalize

Normalization converts the canonical user-facing request into runtime-safe values without changing user intent.

Rules:

1. Preserve explicit user values.
2. Normalize labels to canonical internal representations.
3. Apply only safe defaults for omitted values.
4. Never invent product facts.
5. Preserve creator reference information.
6. Record inferred values separately from explicit values.

const PRODUCT_FIELDS = [
  "brand", "category", "variant", "color", "material", "shape_cut",
  "size_dimensions", "texture", "finish", "packaging", "functional_parts",
  "usage_state", "product_claims", "visual_reference"
];

function normalizeFacts(value = {}) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return Object.fromEntries(
    Object.entries(value).filter(([key, item]) => PRODUCT_FIELDS.includes(key) && item !== null && item !== undefined && item !== "")
  );
}

function sourceLabel(input) {
  if (input.fixture_setup?.mock_product_source) return "fixture";
  if (input.product?.retrieved_facts) return "retrieved_product_facts";
  if (input.product?.product_url) return "product_url_pending_retrieval";
  return "explicit_user_facts";
}

export function retrieveProductIntelligence(input) {
  const explicit = normalizeFacts(input.product?.product_facts);
  const retrieved = normalizeFacts(input.product?.retrieved_facts);
  const fixture = normalizeFacts(input.fixture_setup?.mock_product_source);

  const conflicts = [];
  const merged = { ...fixture, ...retrieved, ...explicit };

  for (const field of PRODUCT_FIELDS) {
    const values = [
      ["fixture", fixture[field]],
      ["retrieved", retrieved[field]],
      ["explicit", explicit[field]]
    ].filter(([, value]) => value !== undefined);

    const distinct = [...new Set(values.map(([, value]) => JSON.stringify(value)))];
    if (distinct.length > 1) {
      conflicts.push({
        field,
        values: Object.fromEntries(values),
        resolution: "explicit_user_facts > retrieved_facts > fixture"
      });
    }
  }

  const unknownAttributes = PRODUCT_FIELDS.filter((field) => merged[field] === undefined);

  return {
    record: {
      product_name: input.product.product_name,
      source_url: input.product.product_url ?? null,
      facts: merged,
      source_status: sourceLabel(input),
      source_priority: ["explicit_user_facts", "retrieved_product_facts", "fixture", "unknown"],
      unknown_attributes: unknownAttributes
    },
    identity_lock: {
      product_name: input.product.product_name,
      facts: merged,
      source_status: sourceLabel(input)
    },
    state_model: {
      identity: "locked",
      usage_state: merged.usage_state ?? "unknown"
    },
    supported_claims: Array.isArray(merged.product_claims) ? merged.product_claims : [],
    unknown_attributes: unknownAttributes,
    source_notes: [
      input.product.product_url ? "Product URL supplied; runtime expects a retrieval adapter or injected retrieved_facts." : "No Product URL supplied.",
      Object.keys(retrieved).length ? "Retrieved product facts were supplied to the runtime." : "No retrieved product facts were supplied."
    ],
    conflict_notes: conflicts
  };
}

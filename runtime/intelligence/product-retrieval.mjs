const PRODUCT_FIELDS = ["brand","category","variant","color","material","shape_cut","size_dimensions","texture","finish","packaging","functional_parts","usage_state","product_claims","visual_reference"];

function normalizeFacts(value = {}) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return Object.fromEntries(
    Object.entries(value).filter(([key, item]) =>
      PRODUCT_FIELDS.includes(key) && item !== null && item !== undefined && item !== ""
    )
  );
}

function first(...values) {
  return values.find((value) => value !== undefined && value !== null && String(value).trim() !== "");
}

function extractJsonLd(html) {
  const blocks = [...html.matchAll(/<script[^>]+type=["']application\\/ld\\+json["'][^>]*>([\\s\\S]*?)<\\/script>/gi)];
  const out = [];
  for (const block of blocks) {
    try {
      const parsed = JSON.parse(block[1].trim());
      const items = Array.isArray(parsed) ? parsed : parsed?.["@graph"] ?? [parsed];
      for (const item of items) if (item && typeof item === "object") out.push(item);
    } catch {}
  }
  return out;
}

function parseProductHtml(html, url) {
  const product = extractJsonLd(html).find((item) =>
    item["@type"] === "Product" ||
    (Array.isArray(item["@type"]) && item["@type"].includes("Product"))
  );
  const brand = typeof product?.brand === "object" ? product.brand?.name : product?.brand;
  const image = Array.isArray(product?.image) ? product.image[0] : product?.image;
  const facts = normalizeFacts({
    brand,
    category: first(product?.category, product?.productType),
    color: first(product?.color, product?.colorName),
    material: product?.material,
    variant: first(product?.model, product?.mpn, product?.sku),
    visual_reference: first(image?.url, image)
  });
  return {
    facts,
    source_url: url,
    source_type: "product_url",
    extraction_method: "json-ld"
  };
}

export async function fetchProductSource(url, options = {}) {
  if (!url || typeof url !== "string") {
    return { status: "UNRESOLVED", facts: {}, errors: ["PRODUCT_URL_MISSING"] };
  }

  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return { status: "UNRESOLVED", facts: {}, errors: ["PRODUCT_URL_INVALID"] };
  }

  if (!["http:", "https:"].includes(parsed.protocol)) {
    return { status: "UNRESOLVED", facts: {}, errors: ["PRODUCT_URL_UNSUPPORTED_PROTOCOL"] };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeout_ms ?? 8000);

  try {
    const response = await fetch(parsed, {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers: {
        accept: "text/html,application/xhtml+xml",
        "user-agent": options.user_agent ?? "UGC-Affiliate-Skill/0.1"
      }
    });

    if (!response.ok) {
      return {
        status: "UNRESOLVED",
        facts: {},
        errors: ["PRODUCT_FETCH_HTTP_" + response.status],
        source_url: response.url || url
      };
    }

    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.includes("text/html") && !contentType.includes("application/xhtml+xml")) {
      return {
        status: "UNRESOLVED",
        facts: {},
        errors: ["PRODUCT_SOURCE_NOT_HTML"],
        source_url: response.url || url
      };
    }

    const html = await response.text();
    const parsedSource = parseProductHtml(html, response.url || url);

    return {
      ...parsedSource,
      status: Object.keys(parsedSource.facts).length ? "RESOLVED" : "UNRESOLVED",
      errors: Object.keys(parsedSource.facts).length ? [] : ["PRODUCT_ATTRIBUTES_NOT_FOUND"]
    };
  } catch (error) {
    return {
      status: "UNRESOLVED",
      facts: {},
      errors: [error?.name === "AbortError" ? "PRODUCT_FETCH_TIMEOUT" : "PRODUCT_FETCH_FAILED"],
      source_url: url
    };
  } finally {
    clearTimeout(timeout);
  }
}

export function resolveProductWithSource(input, retrievedSource = null) {
  const explicit = normalizeFacts(input.product?.product_facts);
  const retrieved = normalizeFacts(retrievedSource?.facts ?? input.product?.retrieved_facts);
  const fixture = normalizeFacts(input.fixture_setup?.mock_product_source);
  const conflicts = [];
  const merged = { ...fixture, ...retrieved, ...explicit };

  for (const field of PRODUCT_FIELDS) {
    const values = [
      ["fixture", fixture[field]],
      ["retrieved", retrieved[field]],
      ["explicit", explicit[field]]
    ].filter(([, value]) => value !== undefined);

    if (new Set(values.map(([, value]) => JSON.stringify(value))).size > 1) {
      conflicts.push({
        field,
        values: Object.fromEntries(values),
        resolution: "explicit_user_facts > retrieved_facts > fixture"
      });
    }
  }

  const unknownAttributes = PRODUCT_FIELDS.filter((field) => merged[field] === undefined);
  const sourceStatus =
    retrievedSource?.status === "RESOLVED" ? "retrieved_product_url" :
    input.product?.retrieved_facts ? "retrieved_product_facts" :
    input.fixture_setup?.mock_product_source ? "fixture" :
    input.product?.product_url ? "product_url_pending_retrieval" :
    "explicit_user_facts";

  return {
    record: {
      product_name: input.product.product_name,
      source_url: input.product.product_url ?? retrievedSource?.source_url ?? null,
      facts: merged,
      source_status: sourceStatus,
      source_priority: ["explicit_user_facts", "retrieved_product_facts", "product_url", "fixture", "unknown"],
      unknown_attributes: unknownAttributes
    },
    identity_lock: {
      product_name: input.product.product_name,
      facts: merged,
      source_status: sourceStatus
    },
    state_model: {
      identity: "locked",
      usage_state: merged.usage_state ?? "unknown"
    },
    supported_claims: Array.isArray(merged.product_claims) ? merged.product_claims : [],
    unknown_attributes: unknownAttributes,
    source_notes: [
      input.product.product_url ? "Product URL supplied." : "No Product URL supplied.",
      retrievedSource?.status === "RESOLVED"
        ? "Product attributes were extracted from the supplied Product URL."
        : "No URL-derived product attributes were resolved."
    ],
    conflict_notes: conflicts
  };
}

export function retrieveProductIntelligence(input) {
  return resolveProductWithSource(input);
}

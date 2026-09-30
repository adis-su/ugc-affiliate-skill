export const NICHE_KNOWLEDGE = {
  Fashion: {
    human_realism: ["natural body anatomy", "natural posing", "realistic garment fit", "fabric physics", "mirror reflection", "smartphone camera behavior", "imperfect framing"],
    product_consistency: ["garment color", "pattern", "material", "cut", "fit", "visible branding", "accessories", "clothing state"]
  },
  Beauty: {
    human_realism: ["realistic skin texture", "natural facial expressions", "realistic makeup application", "accurate hand anatomy", "believable product interaction", "natural lighting on skin"],
    product_consistency: ["packaging", "brand", "shade", "color", "texture", "finish", "application state"]
  },
  Home: {
    human_realism: ["correct object scale", "spatial consistency", "realistic shadows", "material properties", "room geometry", "stable object placement", "believable interaction physics", "consistent lighting"],
    product_consistency: ["shape", "size", "material", "color", "texture", "functional parts", "spatial placement", "interaction state"]
  }
};

export function resolveNiche(name) {
  const knowledge = NICHE_KNOWLEDGE[name];
  if (!knowledge) {
    return {
      blocker: {
        code: "INVALID_ENUM",
        stage: "niche",
        severity: "BLOCKER",
        message: `Unsupported niche: ${name}`,
        field: "niche"
      }
    };
  }
  return knowledge;
}

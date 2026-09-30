export const CAMPAIGN_OBJECTIVES = [
  "Product Awareness", "Product Discovery", "Product Consideration",
  "Affiliate Conversion", "Product Launch", "Product Education",
  "Brand / Product Introduction"
];

export const CAMPAIGN_STAGES = ["Awareness", "Consideration", "Conversion"];
export const CTAS = ["None", "Soft CTA", "Check the Product", "Shop Now", "View Product", "Learn More", "Custom CTA"];

export const FORMAT_ANGLES = {
  Fashion: {
    formats: ["Silent Mirror Selfie", "Outfit Showcase", "Try-On", "GRWM", "Talking Head", "POV", "Lifestyle", "Before / After"],
    angles: ["Outfit Inspiration", "Styling", "Fit Check", "Occasion-Based", "Trend", "Wardrobe Essential"]
  },
  Beauty: {
    formats: ["GRWM", "Tutorial", "Product Application", "Before / After", "Talking Head", "Close-Up Demo", "Routine", "First Impression", "POV"],
    angles: ["Shade / Color", "Texture", "Finish", "Skin Concern", "Makeup Look", "Routine", "Transformation"]
  },
  Home: {
    formats: ["Product Showcase", "Room Makeover", "Before / After", "Lifestyle", "POV", "Problem → Solution", "Unboxing", "Product Demo", "Routine"],
    angles: ["Space Improvement", "Organization", "Convenience", "Aesthetic Upgrade", "Problem Solving", "Functionality", "Before / After"]
  }
};

export const PLATFORMS = ["TikTok", "Instagram Reels", "Facebook Reels", "Shopee Video"];
export const SCENE_LIMITS = { 4: [1, 2], 6: [2, 3], 8: [3, 4], 10: [4, 5] };

export const SILENT_FORMATS = new Set([
  "Silent Mirror Selfie", "Outfit Showcase", "Try-On", "POV", "Lifestyle", "Before / After",
  "Product Showcase", "Room Makeover", "Problem → Solution", "Unboxing", "Product Demo",
  "Routine", "GRWM", "Tutorial", "Product Application", "Close-Up Demo", "First Impression"
]);

export const BEHAVIOR_PATTERNS = {
  default: { sequence: ["notice", "inspect", "react", "next intent"], rules: [
    "one primary action per scene", "gaze follows the task", "hands have physical intent",
    "posture and weight transfer derive from the action", "facial reaction stays proportional",
    "micro-behavior is restrained and contextual", "state changes require a physical cause"
  ]},
  "Silent Mirror Selfie": { sequence: ["notice", "inspect", "adjust", "reveal"] },
  "Product Application": { sequence: ["notice", "prepare", "apply", "inspect", "react"] },
  "Problem → Solution": { sequence: ["notice problem", "interact", "resolve", "react"] }
};

export const CREATIVE_RULES = {
  decision_hierarchy: ["campaign job", "product truth/evidence", "format behavior", "angle emphasis", "creator behavior", "platform/context", "duration/scene count"],
  ugc_guardrails: ["smartphone-native", "observational", "non-cinematic", "natural imperfection"],
  state_change_rule: "Every changed scene attribute must have a physical or intentional cause."
};

export function resolveCreativeKnowledge(input) {
  const niche = FORMAT_ANGLES[input.niche];
  const behavior = BEHAVIOR_PATTERNS[input.content?.format] ?? BEHAVIOR_PATTERNS.default;
  return { niche, behavior, rules: CREATIVE_RULES };
}

export function validateCampaignEnums(input) {
  const blockers = [];
  if (input.campaign?.objective && !CAMPAIGN_OBJECTIVES.includes(input.campaign.objective))
    blockers.push({ code: "INVALID_ENUM", stage: "campaign", severity: "BLOCKER", message: `Unsupported campaign objective: ${input.campaign.objective}`, field: "campaign.objective" });
  if (input.campaign?.stage && !CAMPAIGN_STAGES.includes(input.campaign.stage))
    blockers.push({ code: "INVALID_ENUM", stage: "campaign", severity: "BLOCKER", message: `Unsupported campaign stage: ${input.campaign.stage}`, field: "campaign.stage" });
  if (input.campaign?.cta && !CTAS.includes(input.campaign.cta) && input.campaign.cta !== "Custom CTA")
    blockers.push({ code: "INVALID_ENUM", stage: "campaign", severity: "BLOCKER", message: `Unsupported CTA: ${input.campaign.cta}`, field: "campaign.cta" });
  return blockers;
}

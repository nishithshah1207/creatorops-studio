const toneProfiles = {
  confident: {
    opener: "Built for creators who want launch-day polish without agency overhead.",
    callToAction: "Launch the drop"
  },
  playful: {
    opener: "Give your fans something they will want to peel, stick, and show off.",
    callToAction: "Make the drop"
  },
  premium: {
    opener: "A crisp, retail-ready product experience for brands that care about every detail.",
    callToAction: "Prepare the collection"
  }
};

export function createProductListing(input) {
  const tone = toneProfiles[input.tone] || toneProfiles.confident;
  const features = normalizeFeatures(input.features);
  const audience = clean(input.audience);
  const productName = clean(input.name);

  return {
    title: `${productName} for ${audience}`,
    description: [
      tone.opener,
      `${productName} helps ${audience.toLowerCase()} turn a simple product idea into a polished merch moment.`,
      `Highlights include ${features.slice(0, 3).join(", ")}.`
    ].join(" "),
    bullets: features.map((feature) => `Designed around ${feature.toLowerCase()}`),
    seoKeywords: buildKeywords(productName, audience, features),
    callToAction: tone.callToAction
  };
}

function normalizeFeatures(features) {
  if (Array.isArray(features)) {
    return features.map(clean).filter(Boolean);
  }

  return String(features)
    .split(/,|\n/)
    .map(clean)
    .filter(Boolean);
}

function buildKeywords(productName, audience, features) {
  const tokens = [productName, audience, ...features]
    .join(" ")
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .split(/\s+/)
    .filter((word) => word.length > 3);

  return [...new Set(tokens)].slice(0, 8);
}

function clean(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

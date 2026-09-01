export function buildCampaignPlan(input) {
  const goal = clean(input.goal);
  const audience = clean(input.audience);
  const offer = clean(input.offer);

  return {
    subjectLines: [
      `${audience}: your ${offer} is ready`,
      `A quick way to ${goal.toLowerCase()}`,
      `New drop support for ${audience.toLowerCase()}`
    ],
    sequence: [
      {
        day: 1,
        name: "Launch note",
        purpose: "Explain the offer and make the first action obvious.",
        body: `Introduce ${offer} as the simplest next step for ${audience.toLowerCase()} who want to ${goal.toLowerCase()}.`
      },
      {
        day: 3,
        name: "Proof and use cases",
        purpose: "Show practical examples instead of repeating the pitch.",
        body: `Feature two short examples showing how ${audience.toLowerCase()} can use the offer immediately.`
      },
      {
        day: 6,
        name: "Last-call reminder",
        purpose: "Create urgency while staying useful.",
        body: `Summarize the value, restate the deadline, and link directly to the action.`
      }
    ],
    successMetrics: ["click-through rate", "conversion rate", "repeat purchase rate"],
    riskControls: ["frequency cap", "unsubscribe clarity", "plain-text fallback"]
  };
}

function clean(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

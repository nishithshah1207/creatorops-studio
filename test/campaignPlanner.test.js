import test from "node:test";
import assert from "node:assert/strict";
import { buildCampaignPlan } from "../src/services/campaignPlanner.js";

test("builds a three-message campaign sequence", () => {
  const plan = buildCampaignPlan({
    goal: "bring customers back for reorders",
    audience: "creator stores",
    offer: "free shipping on reorder bundles"
  });

  assert.equal(plan.sequence.length, 3);
  assert.ok(plan.subjectLines.some((line) => line.includes("creator stores")));
  assert.deepEqual(plan.successMetrics, [
    "click-through rate",
    "conversion rate",
    "repeat purchase rate"
  ]);
});

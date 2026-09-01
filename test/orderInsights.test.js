import test from "node:test";
import assert from "node:assert/strict";
import { summarizeOrders } from "../src/services/orderInsights.js";

test("summarizes order revenue and recommends the strongest channel", () => {
  const summary = summarizeOrders([
    { revenue: 100, units: 10, daysToShip: 2, source: "email" },
    { revenue: 300, units: 20, daysToShip: 4, source: "email" },
    { revenue: 50, units: 5, daysToShip: 3, source: "store" }
  ]);

  assert.equal(summary.revenue, 450);
  assert.equal(summary.units, 35);
  assert.equal(summary.averageOrderValue, 150);
  assert.equal(summary.topSource, "email");
  assert.ok(summary.recommendation.includes("Email"));
});

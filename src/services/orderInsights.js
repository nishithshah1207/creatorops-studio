export function summarizeOrders(orders) {
  const totals = orders.reduce(
    (acc, order) => {
      acc.revenue += order.revenue;
      acc.units += order.units;
      acc.daysToShip += order.daysToShip;
      acc.sources[order.source] = (acc.sources[order.source] || 0) + order.revenue;
      return acc;
    },
    { revenue: 0, units: 0, daysToShip: 0, sources: {} }
  );

  const topSource = Object.entries(totals.sources).sort((a, b) => b[1] - a[1])[0];
  const averageOrderValue = totals.revenue / orders.length;

  return {
    orderCount: orders.length,
    revenue: totals.revenue,
    units: totals.units,
    averageOrderValue: roundCurrency(averageOrderValue),
    averageDaysToShip: Number((totals.daysToShip / orders.length).toFixed(1)),
    topSource: topSource?.[0] || "unknown",
    recommendation: buildRecommendation(averageOrderValue, topSource?.[0])
  };
}

function buildRecommendation(averageOrderValue, topSource) {
  if (topSource === "email") {
    return "Email is converting well. Test a creator launch sequence for higher-margin bundles.";
  }

  if (averageOrderValue > 250) {
    return "Bundle demand is strong. Promote curated creator packs on the store homepage.";
  }

  return "Increase average order value with bundle suggestions and reorder reminders.";
}

function roundCurrency(value) {
  return Math.round(value * 100) / 100;
}

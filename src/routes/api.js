import { buildCampaignPlan } from "../services/campaignPlanner.js";
import { createProductListing } from "../services/listingGenerator.js";
import { summarizeOrders } from "../services/orderInsights.js";
import { validateJsonBody } from "../services/validation.js";

const sampleOrders = [
  { id: "A1021", product: "Holographic logo stickers", units: 500, revenue: 249, daysToShip: 2, source: "store" },
  { id: "A1022", product: "Matte sticker sheets", units: 250, revenue: 139, daysToShip: 3, source: "email" },
  { id: "A1023", product: "Creator launch pack", units: 750, revenue: 399, daysToShip: 2, source: "store" },
  { id: "A1024", product: "Packaging labels", units: 1000, revenue: 429, daysToShip: 4, source: "repeat buyer" }
];

const sendJson = (res, statusCode, payload) => {
  res.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(payload));
};

export async function handleApiRequest(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === "GET" && url.pathname === "/api/health") {
    sendJson(res, 200, { ok: true, service: "creatorops-studio" });
    return;
  }

  if (req.method === "GET" && url.pathname === "/api/orders/summary") {
    sendJson(res, 200, summarizeOrders(sampleOrders));
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/listings/generate") {
    const body = await validateJsonBody(req, ["name", "audience", "features"]);
    sendJson(res, 200, createProductListing(body));
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/campaigns/plan") {
    const body = await validateJsonBody(req, ["goal", "audience", "offer"]);
    sendJson(res, 200, buildCampaignPlan(body));
    return;
  }

  sendJson(res, 404, { error: "Unknown API route" });
}

import test from "node:test";
import assert from "node:assert/strict";
import { createProductListing } from "../src/services/listingGenerator.js";

test("creates listing copy with normalized feature bullets and keywords", () => {
  const listing = createProductListing({
    name: "Creator launch pack",
    audience: "Indie sellers",
    features: "premium stickers, branded labels, reorder reminders",
    tone: "premium"
  });

  assert.equal(listing.title, "Creator launch pack for Indie sellers");
  assert.equal(listing.bullets.length, 3);
  assert.ok(listing.description.includes("premium stickers"));
  assert.ok(listing.seoKeywords.includes("creator"));
});

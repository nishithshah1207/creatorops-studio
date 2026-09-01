const listingForm = document.querySelector("#listing-form");
const campaignForm = document.querySelector("#campaign-form");
const listingResult = document.querySelector("#listing-result");
const campaignResult = document.querySelector("#campaign-result");
const orderSummary = document.querySelector("#order-summary");
const recommendation = document.querySelector("#recommendation");

async function postJson(url, payload) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}

function getFormPayload(form) {
  return Object.fromEntries(new FormData(form).entries());
}

function renderListing(listing) {
  listingResult.innerHTML = `
    <h3>${escapeHtml(listing.title)}</h3>
    <p>${escapeHtml(listing.description)}</p>
    <ul>${listing.bullets.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    <div class="tag-row">${listing.seoKeywords
      .map((keyword) => `<span class="tag">${escapeHtml(keyword)}</span>`)
      .join("")}</div>
    <p><strong>${escapeHtml(listing.callToAction)}</strong></p>
  `;
}

function renderCampaign(plan) {
  campaignResult.innerHTML = `
    <h3>Subject line options</h3>
    <ul>${plan.subjectLines.map((line) => `<li>${escapeHtml(line)}</li>`).join("")}</ul>
    <h3>Sequence</h3>
    ${plan.sequence
      .map(
        (step) => `
          <p><strong>Day ${step.day}: ${escapeHtml(step.name)}</strong><br />
          ${escapeHtml(step.purpose)} ${escapeHtml(step.body)}</p>
        `
      )
      .join("")}
  `;
}

function renderSummary(summary) {
  const metrics = [
    ["Revenue", `$${summary.revenue.toLocaleString()}`],
    ["Units", summary.units.toLocaleString()],
    ["Avg order", `$${summary.averageOrderValue}`],
    ["Top source", summary.topSource]
  ];

  orderSummary.innerHTML = metrics
    .map(
      ([label, value]) => `
        <div class="metric">
          <span>${escapeHtml(label)}</span>
          <strong>${escapeHtml(value)}</strong>
        </div>
      `
    )
    .join("");
  recommendation.textContent = summary.recommendation;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

listingForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  listingResult.innerHTML = `<p class="muted">Generating listing...</p>`;
  renderListing(await postJson("/api/listings/generate", getFormPayload(listingForm)));
});

campaignForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  campaignResult.innerHTML = `<p class="muted">Planning campaign...</p>`;
  renderCampaign(await postJson("/api/campaigns/plan", getFormPayload(campaignForm)));
});

fetch("/api/orders/summary")
  .then((response) => response.json())
  .then(renderSummary)
  .catch(() => {
    recommendation.textContent = "Order summary could not be loaded.";
  });

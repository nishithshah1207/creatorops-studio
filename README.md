# CreatorOps Studio

CreatorOps Studio is a full-stack code sample for a creator-commerce operations suite. It combines store listing generation, lifecycle email planning, and order insights in one small but complete application.

The project is intentionally dependency-free so reviewers can run it quickly and inspect the implementation without setup noise.

## Why this project

Sticker Mule's software engineer role describes work on stores, AI tools, email products, and business software for creators. This project mirrors that product surface in a compact sample:

- A product listing generator for creator stores.
- A campaign planner for lifecycle and reorder emails.
- Order intelligence that turns commerce data into practical recommendations.
- A simple Node.js API with a browser frontend.
- Tests for the core product logic.

## Run locally

```bash
npm start
```

Then open:

```text
http://localhost:4173
```

## Run tests

```bash
npm test
```

## Screenshots

![CreatorOps Studio Dashboard](docs/assets/creatorops-studio-home.png)

## API overview

```text
GET  /api/health
GET  /api/orders/summary
POST /api/listings/generate
POST /api/campaigns/plan
```

Example listing request:

```json
{
  "name": "Holographic creator sticker pack",
  "audience": "independent artists",
  "features": "weatherproof vinyl, fast reorder workflow, premium holographic finish",
  "tone": "confident"
}
```

## Engineering notes

The backend keeps product logic in small services so API routing, validation, and copy generation are easy to test separately. The frontend uses progressive enhancement around server endpoints instead of hiding all logic in the browser. This makes the project easy to extend with a real AI provider, database, authentication, or analytics pipeline.

## Next production steps

- Store product, campaign, and order data in Postgres.
- Add authentication and team workspaces.
- Replace the deterministic copy engine with an AI provider wrapper.
- Add prompt versioning and evaluation fixtures.
- Track campaign outcomes and feed them into recommendations.

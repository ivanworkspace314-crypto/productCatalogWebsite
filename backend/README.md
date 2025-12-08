# Product Store API

Simple Node.js + Express + MongoDB (Mongoose) API for products.

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy env template and fill values:
   ```bash
   cp .env.example .env
   # update MONGODB_URI if needed; set PORT if different from 3000
   ```
3. Run in development (with auto-reload):
   ```bash
   npm run dev
   ```
   or start normally:
   ```bash
   npm start
   ```

## API
Base path: `/api`

- `GET /api/` — list all products
- `POST /api/` — create a product. Body: `{ "productName": string, "price": number, "imageURL": string }`
- `GET /api/:pid` — get a product by id
- `PATCH /api/:pid` — update a product (same fields as create)
- `DELETE /api/:pid` — remove a product

Responses:
- `201 Created` returns created product
- `204 No Content` on successful delete
- `404` if product not found

## Notes
- Mongoose connection uses `MONGODB_URI` from `.env`.
- Schema validates required fields; `price` must be non-negative.

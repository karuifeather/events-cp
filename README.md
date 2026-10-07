# Anime Atlas

Anime Atlas is an anime-themed community space where users explore four visual destinations and open location pages that load events from PostgreSQL through an Express API. The frontend is built with React and Vite so the site feels like a destination browser instead of a plain event list.

## Technologies

- React
- Vite
- React Router
- Express
- PostgreSQL
- pg
- Regular CSS

## Install

```bash
npm install
```

## Environment Variables

Create a local `.env` file from the example file and supply your PostgreSQL connection string.

```bash
DATABASE_URL=postgresql://username:password@localhost:5432/anime_atlas
PORT=3000
NODE_ENV=development
```

Render will provide its own `DATABASE_URL` when you deploy the database there.

## Database Setup

Create the schema:

```bash
psql "$DATABASE_URL" -f server/db/schema.sql
```

Load the seed data:

```bash
psql "$DATABASE_URL" -f server/db/seed.sql
```

The `events` table stores the event title, description, date, time, location slug, anime source, and category.

## Run the App

Start both the API server and the React frontend:

```bash
npm run dev
```

Start only the API server:

```bash
npm run server
```

Start only the Vite frontend:

```bash
npm run client
```

Build the React frontend for production:

```bash
npm run build
```

## Formatting

```bash
npm run format
npm run format:check
```

## API Endpoints

- `GET /api/health` returns a simple health response.
- `GET /api/events` returns every event in the database.
- `GET /api/events/location/:locationId` returns all events for one location slug.

## Location Routes

- `/`
- `/locations/grand-line`
- `/locations/mushi-forest`
- `/locations/european-archive`
- `/locations/neo-tokyo`

## Render PostgreSQL Note

When deploying to Render, copy the managed PostgreSQL connection string into `DATABASE_URL`. The server is already configured to use TLS for production connections, so no SQLite setup is needed.

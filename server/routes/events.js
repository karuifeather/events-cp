const express = require('express');

const { query } = require('../config/database');

const router = express.Router();

router.get('/', async (_request, response) => {
  try {
    const result = await query(
      `
        SELECT
          id,
          title,
          description,
          event_date,
          event_time,
          location_slug,
          anime,
          category
        FROM events
        ORDER BY event_date ASC, event_time ASC, id ASC
      `,
    );

    response.json(result.rows);
  } catch (error) {
    console.error('Unable to load all events:', error);
    response.status(500).json({
      error: 'The event list could not be loaded right now.',
    });
  }
});

router.get('/location/:locationId', async (request, response) => {
  const locationId = request.params.locationId.trim().toLowerCase();

  if (!locationId) {
    response.status(400).json({
      error: 'A location identifier is required.',
    });
    return;
  }

  try {
    const result = await query(
      `
        SELECT
          id,
          title,
          description,
          event_date,
          event_time,
          location_slug,
          anime,
          category
        FROM events
        WHERE location_slug = $1
        ORDER BY event_date ASC, event_time ASC, id ASC
      `,
      [locationId],
    );

    response.json(result.rows);
  } catch (error) {
    console.error(`Unable to load events for ${locationId}:`, error);
    response.status(500).json({
      error: 'The location events could not be loaded right now.',
    });
  }
});

module.exports = router;

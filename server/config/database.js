const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;

// Render provides PostgreSQL through a connection string, while local development can stay simple.
const pool = new Pool({
  connectionString,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

async function query(text, parameters) {
  return pool.query(text, parameters);
}

async function initializeDatabase() {
  await query(`
    CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      event_date DATE NOT NULL,
      event_time VARCHAR(50),
      location_slug VARCHAR(100) NOT NULL,
      anime VARCHAR(150),
      category VARCHAR(100)
    );
  `);

  await query(`
    CREATE INDEX IF NOT EXISTS events_location_slug_idx ON events (location_slug);
    CREATE INDEX IF NOT EXISTS events_date_idx ON events (event_date);
  `);

  const eventCount = await query('SELECT COUNT(*) AS count FROM events;');
  const totalEvents = Number(eventCount.rows[0].count || 0);

  if (totalEvents > 0) {
    return;
  }

  await query(`
    INSERT INTO events (title, description, event_date, event_time, location_slug, anime, category) VALUES
      ('Grand Line Treasure Hunt', 'Map fragments, riddles, and a harbor-wide chase for the crew that can solve the clues first. Bring your best navigator energy.', '2026-11-05', '18:00', 'grand-line', 'One Piece', 'Adventure'),
      ('Devil Fruit Trivia Night', 'A fast-paced trivia session focused on powers, pirates, and legendary moments from the Grand Line.', '2026-11-09', '20:00', 'grand-line', 'One Piece', 'Games'),
      ('Pirate Crew Meetup', 'A relaxed evening for fans to trade stories, swap recommendations, and plan future voyages together.', '2026-11-14', '19:00', 'grand-line', 'One Piece', 'Community'),
      ('Evening Mushi Walk', 'A quiet guided walk through the forest paths to observe lantern light, moss, and the strange beauty of the mushi.', '2026-11-06', '17:30', 'mushi-forest', 'Mushishi', 'Nature'),
      ('Stories Around the Lantern', 'An intimate gathering for folklore, reflection, and soft spoken storytelling beside warm lantern light.', '2026-11-10', '19:30', 'mushi-forest', 'Mushishi', 'Storytelling'),
      ('Mushi Photography Expedition', 'Capture fog, leaves, and delicate light while learning how to photograph an atmosphere instead of a subject.', '2026-11-15', '08:00', 'mushi-forest', 'Mushishi', 'Creative'),
      ('Keaton''s Archaeology Seminar', 'A discussion on field notes, investigative methods, and the strange overlap between history and mystery.', '2026-11-07', '18:30', 'european-archive', 'Master Keaton', 'Education'),
      ('Cold Case Investigation Night', 'Teams examine old clues, newspaper clippings, and maps to work through a classic style mystery together.', '2026-11-11', '19:00', 'european-archive', 'Master Keaton', 'Mystery'),
      ('European History Meetup', 'A social evening for history fans who enjoy archives, exhibits, travel stories, and thoughtful conversation.', '2026-11-16', '17:00', 'european-archive', 'Master Keaton', 'Community'),
      ('Anime Cosplay Night', 'A celebration of costume design, photo spots, and community meetups for fans arriving from every fandom.', '2026-11-08', '18:00', 'neo-tokyo', 'Anime Community', 'Cosplay'),
      ('Anime Opening Karaoke', 'Sing your favorite opening themes with a crowd that knows every dramatic pause and chorus drop.', '2026-11-12', '20:00', 'neo-tokyo', 'Anime Community', 'Music'),
      ('Retro Anime Movie Marathon', 'Neon lights, retro vibes, and a full night of classics, commentary, and shared fandom nostalgia.', '2026-11-17', '21:00', 'neo-tokyo', 'Anime Community', 'Screening');
  `);
}

module.exports = {
  pool,
  query,
  initializeDatabase,
};

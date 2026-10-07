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

CREATE INDEX IF NOT EXISTS events_location_slug_idx ON events (location_slug);
CREATE INDEX IF NOT EXISTS events_date_idx ON events (event_date);

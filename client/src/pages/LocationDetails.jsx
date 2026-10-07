import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import EventCard from '../components/EventCard';
import Navbar from '../components/Navbar';
import { getLocationById } from '../data/locations';

function LocationDetails() {
  const { locationId } = useParams();
  const location = getLocationById(locationId);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let isActive = true;

    async function loadLocationEvents() {
      setLoading(true);
      setErrorMessage('');

      try {
        const response = await fetch(`/api/events/location/${locationId}`);
        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload.error || 'The events for this location could not be loaded.');
        }

        if (isActive) {
          setEvents(payload);
          setLoading(false);
        }
      } catch (error) {
        if (isActive) {
          setErrorMessage(error.message);
          setLoading(false);
        }
      }
    }

    if (locationId && location) {
      loadLocationEvents();
    } else {
      setLoading(false);
    }

    return () => {
      isActive = false;
    };
  }, [location, locationId]);

  if (!location) {
    return (
      <div className="atlas-shell">
        <Navbar />

        <main className="detail-panel detail-panel--missing">
          <p className="detail-panel__eyebrow">Location unavailable</p>
          <h1>That destination does not exist.</h1>
          <p>
            Use the back link below to return to the atlas and choose one of the available
            locations.
          </p>
          <Link to="/" className="back-link">
            Return to Anime Atlas
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className={`atlas-shell atlas-shell--${location.id}`}>
      <Navbar />

      <main className="detail-panel">
        <Link to="/" className="back-link">
          ← Back to the atlas
        </Link>

        <div className="detail-panel__intro">
          <p className="detail-panel__eyebrow">{location.anime}</p>
          <h1>{location.name}</h1>
          <p>{location.description}</p>
        </div>

        {loading ? (
          <div className="state-card">Loading events for this destination...</div>
        ) : errorMessage ? (
          <div className="state-card state-card--error">{errorMessage}</div>
        ) : events.length ? (
          <section className="events-grid" aria-label={`${location.name} events`}>
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </section>
        ) : (
          <div className="state-card">
            No events are scheduled for this destination yet. Check back soon for new community
            gatherings.
          </div>
        )}
      </main>
    </div>
  );
}

export default LocationDetails;

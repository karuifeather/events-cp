function formatEventDate(eventDate) {
  if (!eventDate) {
    return 'Date TBD';
  }

  const parsedDate = new Date(`${eventDate}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return 'Date TBD';
  }

  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(parsedDate);
}

function EventCard({ event }) {
  return (
    <article className="event-card">
      <div className="event-card__header">
        <div>
          <p className="event-card__kicker">{event.category || 'Community event'}</p>
          <h3 className="event-card__title">{event.title}</h3>
        </div>

        <div className="event-card__timeblock">
          <span>{formatEventDate(event.event_date)}</span>
          <span>{event.event_time || 'All day'}</span>
        </div>
      </div>

      <p className="event-card__description">{event.description}</p>

      <div className="event-card__meta">
        <span>{event.anime || 'Anime Atlas'}</span>
        <span>{event.location_slug}</span>
      </div>
    </article>
  );
}

export default EventCard;

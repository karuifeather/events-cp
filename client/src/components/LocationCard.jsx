import { Link } from 'react-router-dom';

function LocationCard({ location }) {
  return (
    <Link
      to={`/locations/${location.id}`}
      className={`location-card location-card--${location.id}`}
      aria-label={`Open ${location.name}`}
    >
      <span className="location-card__anime">{location.anime}</span>
      <h2 className="location-card__title">{location.name}</h2>
      <p className="location-card__description">{location.description}</p>
      <span className="location-card__cta">Enter destination</span>
    </Link>
  );
}

export default LocationCard;

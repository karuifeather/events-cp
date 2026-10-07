import Navbar from '../components/Navbar';
import LocationCard from '../components/LocationCard';
import { locations } from '../data/locations';

function Home() {
  return (
    <div className="atlas-shell atlas-shell--home">
      <Navbar />

      <main>
        <section className="hero">
          <p className="hero__eyebrow">Anime Atlas</p>
          <h1>ANIME ATLAS</h1>
          <p className="hero__lead">Explore worlds. Discover events. Find your community.</p>
          <p className="hero__body">
            Step into four anime-inspired destinations, each with its own atmosphere and live
            community calendar.
          </p>
        </section>

        <section className="locations-grid" aria-label="Anime locations">
          {locations.map((location) => (
            <LocationCard key={location.id} location={location} />
          ))}
        </section>
      </main>
    </div>
  );
}

export default Home;

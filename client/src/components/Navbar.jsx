import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <header className="topbar">
      <Link to="/" className="brand-mark" aria-label="Go to Anime Atlas home">
        <span className="brand-mark__label">Anime Atlas</span>
      </Link>

      <p className="topbar__note">Explore worlds. Discover events. Find your community.</p>
    </header>
  );
}

export default Navbar;

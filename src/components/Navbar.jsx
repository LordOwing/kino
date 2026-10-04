import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

export const Navbar = ({ reservationsCount }) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);
  const closeNavbar = () => setCollapsed(true);

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
      <div className="container">
        <Link to="/" className="navbar-brand fw-bold" onClick={closeNavbar}>
          🎬 Kino Lolo
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
          aria-label="Menu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`${collapsed ? "collapse" : ""} navbar-collapse`}>
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
              <NavLink
                to="/"
                end
                className={({ isActive }) => `nav-link ${isActive ? "active fw-bold" : ""}`}
                onClick={closeNavbar}
              >
                Repertuar
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/o-kinie"
                className={({ isActive }) => `nav-link ${isActive ? "active fw-bold" : ""}`}
                onClick={closeNavbar}
              >
                O kinie
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/kontakt"
                className={({ isActive }) => `nav-link ${isActive ? "active fw-bold" : ""}`}
                onClick={closeNavbar}
              >
                Kontakt
              </NavLink>
            </li>
          </ul>

          <Link
            to="/rezerwacje"
            className="btn btn-primary btn-sm position-relative"
            onClick={closeNavbar}
          >
            Moje Rezerwacje
            {reservationsCount > 0 && (
              <span className="badge bg-danger ms-2">
                {reservationsCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

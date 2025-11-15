// src/components/layout/Navigation.tsx
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navigation.css";

const Navigation: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu when a link is clicked
  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        {/* Brand */}
        <Link to="/" className="nav-brand">
          Meal Dashboard
        </Link>

        {/* Mobile Menu Toggle Button */}
        <button
          className="nav-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        {/* Navigation Links */}
        <div className={`nav-links ${menuOpen ? "mobile-active" : ""}`}>
          <NavLink
            to="/"
            onClick={handleLinkClick}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Dashboard
          </NavLink>

          {/* <NavLink
            to="/dashboard"
            onClick={handleLinkClick}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          ></NavLink> */}

          <NavLink
            to="/meals"
            onClick={handleLinkClick}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Meals
          </NavLink>

          <NavLink
            to="/meals/new"
            onClick={handleLinkClick}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Add Meal
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

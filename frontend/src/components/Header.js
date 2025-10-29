import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

/**
 * Dependency-free Header for Library Management System
 * Uses inline SVG icons to avoid extra libraries that can break builds.
 */

const MenuSvg = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" width="28" height="28" aria-hidden>
    <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CloseSvg = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" width="28" height="28" aria-hidden>
    <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setMenuOpen((s) => !s);
  const closeMenu = () => setMenuOpen(false);

  // optional: add small shadow when scrolling
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="logo-nav">
        <Link to="/" className="logo-text" onClick={closeMenu}>
         DIGITAL LIBRARY<span className="brand-accent"></span>
        </Link>
      </div>



      <button
        className="mobile-menu"
        onClick={toggleMenu}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
      >
        {menuOpen ? <CloseSvg className="menu-icon"/> : <MenuSvg className="menu-icon"/>}
      </button>
    </header>
  );
}

export default Header;

import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

function useScrollSpy(sectionIds) {
  const [activeId, setActiveId] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      let current = sectionIds[0];
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          current = id;
        }
      }

      if (atBottom) {
        current = sectionIds[sectionIds.length - 1];
      }

      setActiveId(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds]);

  return activeId;
}

const sectionIds = ['home', 'about', 'contact'];

export default function Navbar() {
  const { pathname } = useLocation();
  const activeSection = useScrollSpy(sectionIds);

  useEffect(() => {
    const navbar = document.querySelector('.navbar');
    const handleScroll = () => {
      if (navbar) {
        navbar.classList.toggle('navbar-shrink', window.scrollY > 50);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path, sectionId) => {
    if (path) return pathname === path;
    return pathname === '/' && activeSection === sectionId;
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          <i className="bi bi-code-slash"></i> Mangesh Ghodke
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a
                className={`nav-link${isActive(null, 'home') ? ' active' : ''}`}
                href="/#home"
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link${isActive(null, 'about') ? ' active' : ''}`}
                href="/#about"
              >
                About
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link${isActive('/services') ? ' active' : ''}`}
                href="/services"
              >
                Services
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link${isActive('/pricing') ? ' active' : ''}`}
                href="/pricing"
              >
                Pricing
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link${isActive(null, 'contact') ? ' active' : ''}`}
                href="/#contact"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

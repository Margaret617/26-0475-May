import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { applyTheme, getPreferredTheme, setPreferredTheme, toggleTheme } from '../../utils/theme';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState(() => getPreferredTheme() || 'dark');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/garage', label: 'Garage' },
    { path: '/blog', label: 'Journal' },

    { path: '/login', label: 'Login' },
    { path: '/contact', label: 'Contact' },
  ];


  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-text">
            <span className="logo-accent">ˋ</span>
            motore
          </span>
          <span className="logo-sub">The Collection</span>
        </Link>

        <button
          className="navbar-theme-toggle"
          type="button"
          onClick={() => {
            const next = toggleTheme(theme);
            setTheme(next);
            setPreferredTheme(next);
            applyTheme(next);
          }}
          aria-label="Toggle dark/light mode"
        >
          {theme === 'light' ? '🌞' : '🌙'}
        </button>

        <button 
          className="navbar-toggle" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        <ul className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          {navLinks.map((link) => (
            <li key={link.path} className="navbar-item">
              <Link 
                to={link.path} 
                className={`navbar-link ${location.pathname === link.path ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
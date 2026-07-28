import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { supabase } from "../../supabase";
import {
  applyTheme,
  getPreferredTheme,
  setPreferredTheme,
  toggleTheme,
} from "../../utils/theme";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState(() => getPreferredTheme() || "dark");
  const [session, setSession] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
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
        >
          {theme === "light" ? "🌞" : "🌙"}
        </button>

        <button
          className="navbar-toggle"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        <ul className={`navbar-menu ${isOpen ? "active" : ""}`}>

          <li className="navbar-item">
            <Link to="/" className="navbar-link">Home</Link>
          </li>

          <li className="navbar-item">
            <Link to="/garage" className="navbar-link">Garage</Link>
          </li>

          <li className="navbar-item">
            <Link to="/blog" className="navbar-link">Journal</Link>
          </li>

          <li className="navbar-item">
            <Link to="/contact" className="navbar-link">Contact</Link>
          </li>

          {!session ? (
            <>
              <li className="navbar-item">
                <Link to="/login" className="navbar-link">
                  Login
                </Link>
              </li>

              <li className="navbar-item">
                <Link to="/register" className="navbar-link">
                  Register
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="navbar-item">
                <Link to="/profile" className="navbar-link">
                  Profile
                </Link>
              </li>

              <li className="navbar-item">
                <button
                  className="navbar-link"
                  onClick={logout}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "inherit",
                    fontSize: "inherit",
                  }}
                >
                  Logout
                </button>
              </li>
            </>
          )}

        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
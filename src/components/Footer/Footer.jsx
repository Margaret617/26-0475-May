import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4 className="footer-logo">MOTORE</h4>
          <p className="footer-description">
            A curated collection of automotive excellence.
          </p>
        </div>

        <div className="footer-section">
          <h5>Navigation</h5>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/garage">Garage</Link></li>
            <li><Link to="/blog">Journal</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h5>Connect</h5>
          <ul>
            <li>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
              >
                Instagram
              </a>
            </li>
            <li>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Follow us on Twitter"
              >
                Twitter
              </a>
            </li>
            <li>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Subscribe to our YouTube channel"
              >
                YouTube
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Motore. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
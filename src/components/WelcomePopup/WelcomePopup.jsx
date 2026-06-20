import React, { useState, useEffect } from 'react';
import './WelcomePopup.css';

const WelcomePopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show popup after 2 seconds when page loads
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    // Check if user has already seen the popup
    const hasSeenPopup = localStorage.getItem('hasSeenWelcomePopup');
    if (hasSeenPopup) {
      setIsVisible(false);
    }

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Store in localStorage so it doesn't show again
    localStorage.setItem('hasSeenWelcomePopup', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="popup-overlay" onClick={handleClose}>
      <div className="popup-container" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close" onClick={handleClose}>×</button>
        <div className="popup-content">
          <div className="popup-icon">🏎️</div>
          <h2>Welcome to Motore</h2>
          <p>
            Discover a curated collection of automotive excellence. 
            Explore our garage of rare and iconic vehicles.
          </p>
          <div className="popup-features">
            <div className="feature">
              <span>✨</span>
              <span>Curated Collection</span>
            </div>
            <div className="feature">
              <span>🔧</span>
              <span>Restoration Stories</span>
            </div>
            <div className="feature">
              <span>📸</span>
              <span>Exclusive Content</span>
            </div>
          </div>
          <button className="popup-btn" onClick={handleClose}>
            Explore the Collection
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePopup;
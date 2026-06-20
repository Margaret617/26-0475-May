import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowDown } from 'react-icons/fa';
import './Hero.css';

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const heroRef = useRef(null);

  const heroImages = [
    '/images/cars/ferrari-250-gto-main.jpg',
    '/images/cars/porsche-911-rs-main.jpg',
    '/images/cars/aston-db5-main.jpg',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY;
        heroRef.current.style.transform = `translateY(${scrollY * 0.5}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="hero">
      <div className="hero-background" ref={heroRef}>
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`hero-slide ${index === currentImage ? 'active' : ''}`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
        <div className="hero-overlay" />
      </div>

      <div className="hero-content">
        <div className="hero-text">
          <span className="hero-subtitle">The Collection</span>
          <h1 className="hero-title">Motore</h1>
          <p className="hero-description">
            A curated journey through automotive excellence — 
            where engineering meets artistry.
          </p>
          <div className="hero-buttons">
            <Link to="/garage" className="btn-primary">
              Explore the Garage
            </Link>
            <Link to="/blog" className="btn-secondary">
              Read the Journal
            </Link>
          </div>
        </div>

        <div className="hero-scroll">
          <span>Scroll</span>
          <FaArrowDown className="scroll-icon" />
        </div>

        <div className="hero-indicators">
          {heroImages.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentImage ? 'active' : ''}`}
              onClick={() => setCurrentImage(index)}
              aria-label={`View slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaTachometerAlt, FaClock } from 'react-icons/fa';
import './CarCard.css';

const CarCard = ({ car, index }) => {
  const { id, make, model, year, hp, zeroToSixty, mileage, color, colorName, images } = car;

  return (
    <motion.div
      className="car-card"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
    >
      <Link to={`/car/${id}`} className="car-card-link">
        <div className="car-card-image">
          <img src={images.main} alt={`${make} ${model}`} />
          <div className="car-card-overlay">
            <span className="car-card-view">View Details</span>
          </div>
          <div className="car-card-color" style={{ backgroundColor: color }}>
            <span>{colorName}</span>
          </div>
        </div>

        <div className="car-card-content">
          <div className="car-card-header">
            <span className="car-card-year">{year}</span>
            <span className="car-card-make">{make}</span>
          </div>
          <h3 className="car-card-model">{model}</h3>

          <div className="car-card-stats">
            <div className="stat">
              <FaTachometerAlt className="stat-icon" />
              <span>{hp} HP</span>
            </div>
            <div className="stat">
              <FaClock className="stat-icon" />
              <span>{zeroToSixty}s 0-60</span>
            </div>
            <div className="stat">
              <span className="stat-mileage">{mileage.toLocaleString()} mi</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CarCard;
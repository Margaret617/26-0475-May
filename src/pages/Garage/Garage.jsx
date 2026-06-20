import React from 'react';
import GarageGrid from '../../components/GarageGrid/GarageGrid';
import carsData from '../../data/cars.json';
import './Garage.css';

const Garage = () => {
  return (
    <div className="garage-page">
      <div className="garage-header">
        <h1 className="section-title">The Garage</h1>
        <p className="section-subtitle">A curated collection of automotive excellence</p>
      </div>
      <GarageGrid cars={carsData} />
    </div>
  );
};

export default Garage;
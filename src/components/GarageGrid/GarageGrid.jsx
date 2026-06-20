import React, { useState, useEffect } from 'react';
import CarCard from '../CarCard/CarCard';
import SearchFilters from '../SearchFilters/SearchFilters';
import './GarageGrid.css';

const GarageGrid = ({ cars }) => {
  const [filteredCars, setFilteredCars] = useState(cars);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  const handleFilter = (filters) => {
    let result = cars;

    if (filters.brand) {
      result = result.filter(car => car.make === filters.brand);
    }
    if (filters.decade) {
      const startYear = parseInt(filters.decade);
      result = result.filter(car => car.year >= startYear && car.year < startYear + 10);
    }
    if (filters.country) {
      result = result.filter(car => car.country === filters.country);
    }
    if (filters.drivetrain) {
      result = result.filter(car => car.drivetrain === filters.drivetrain);
    }
    if (filters.search) {
      const search = filters.search.toLowerCase();
      result = result.filter(car => 
        car.make.toLowerCase().includes(search) ||
        car.model.toLowerCase().includes(search) ||
        car.year.toString().includes(search)
      );
    }

    setFilteredCars(result);
  };

  if (isLoading) {
    return (
      <div className="garage-loading">
        <div className="loading-spinner" />
        <p>Curating the collection...</p>
      </div>
    );
  }

  return (
    <div className="garage-grid-container">
      <SearchFilters onFilter={handleFilter} />
      
      <div className="garage-stats">
        <span>{filteredCars.length} vehicles</span>
        <span className="garage-divider">|</span>
        <span>Showing {filteredCars.length} of {cars.length}</span>
      </div>

      <div className="garage-grid">
        {filteredCars.map((car, index) => (
          <CarCard key={car.id} car={car} index={index} />
        ))}
      </div>

      {filteredCars.length === 0 && (
        <div className="garage-empty">
          <p>No vehicles match your filters.</p>
          <button onClick={() => handleFilter({})}>Clear Filters</button>
        </div>
      )}
    </div>
  );
};

export default GarageGrid;
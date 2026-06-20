import React, { useState } from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';
import './SearchFilters.css';

const SearchFilters = ({ onFilter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    brand: '',
    decade: '',
    country: '',
    drivetrain: ''
  });

  const brands = ['Ferrari', 'Porsche', 'Aston Martin', 'Mercedes-Benz', 'Lamborghini'];
  const decades = ['1950', '1960', '1970', '1980', '1990', '2000'];
  const countries = ['Italy', 'Germany', 'England', 'USA', 'Japan'];
  const drivetrains = ['RWD', 'AWD', 'FWD', '4WD'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    const newFilters = { ...filters, search: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const clearFilters = () => {
    const emptyFilters = {
      search: '',
      brand: '',
      decade: '',
      country: '',
      drivetrain: ''
    };
    setFilters(emptyFilters);
    onFilter(emptyFilters);
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <div className="search-filters">
      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search by make, model, or year..."
          value={filters.search}
          onChange={handleSearch}
          className="search-input"
        />
        <button 
          className="filter-toggle"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FaFilter />
          <span>Filters</span>
          {hasActiveFilters && <span className="filter-badge" />}
        </button>
      </div>

      <div className={`filters-panel ${isOpen ? 'open' : ''}`}>
        <div className="filters-grid">
          <div className="filter-group">
            <label>Brand</label>
            <select name="brand" value={filters.brand} onChange={handleChange}>
              <option value="">All Brands</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Decade</label>
            <select name="decade" value={filters.decade} onChange={handleChange}>
              <option value="">All Decades</option>
              {decades.map(decade => (
                <option key={decade} value={decade}>{decade}s</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Country</label>
            <select name="country" value={filters.country} onChange={handleChange}>
              <option value="">All Countries</option>
              {countries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Drivetrain</label>
            <select name="drivetrain" value={filters.drivetrain} onChange={handleChange}>
              <option value="">All Drivetrains</option>
              {drivetrains.map(drivetrain => (
                <option key={drivetrain} value={drivetrain}>{drivetrain}</option>
              ))}
            </select>
          </div>
        </div>

        {hasActiveFilters && (
          <button className="clear-filters" onClick={clearFilters}>
            Clear All Filters
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchFilters;
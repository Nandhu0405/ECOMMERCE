import React from 'react';
import { RotateCcw, Filter, Check } from 'lucide-react';
import { CATEGORIES } from '../data/categories';

const ProductFilters = ({
  selectedCategories = [],
  onToggleCategory,
  selectedType = 'all',
  onSelectType,
  priceRange = [1000, 5000],
  onPriceChange,
  selectedPackSizes = [],
  onTogglePackSize,
  selectedAvailability = [],
  onToggleAvailability,
  minRating = 0,
  onSelectRating,
  onClearAll
}) => {
  const PACK_SIZES = ['1 kg Sample', '5 kg Can', '25 kg Drum', '200 kg Barrel'];
  const AVAILABILITIES = ['In Stock', 'Available on Request'];

  return (
    <aside className="filter-sidebar" aria-label="Catalogue Filters">
      <div className="filter-sidebar-header">
        <span className="filter-sidebar-title">
          <Filter size={18} />
          <span>Filters</span>
        </span>
        <button 
          className="btn-clear-filters" 
          onClick={onClearAll}
          title="Reset all filters"
        >
          Clear All
        </button>
      </div>

      {/* Filter: Product Type (Flavour vs Fragrance) */}
      <div className="filter-group">
        <div className="filter-group-title">Division Type</div>
        <div className="filter-options-list">
          {['all', 'flavour', 'fragrance'].map(type => (
            <label key={type} className="filter-checkbox-label">
              <input
                type="radio"
                name="productType"
                checked={selectedType === type}
                onChange={() => onSelectType(type)}
              />
              <span style={{ textTransform: 'capitalize' }}>
                {type === 'all' ? 'All Divisions' : `${type}s`}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Filter: Categories */}
      <div className="filter-group">
        <div className="filter-group-title">Category ({CATEGORIES.length})</div>
        <div className="filter-options-list" style={{ maxHeight: '240px', overflowY: 'auto' }}>
          {CATEGORIES.map(cat => {
            const isChecked = selectedCategories.includes(cat.id);
            return (
              <label key={cat.id} className="filter-checkbox-label">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => onToggleCategory(cat.id)}
                />
                <span>{cat.name}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Filter: Demo Price Range */}
      <div className="filter-group">
        <div className="filter-group-title">
          Demo Price Range (INR)
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
          <span>₹{priceRange[0]}</span>
          <span>₹{priceRange[1]}</span>
        </div>
        <input
          type="range"
          min="1000"
          max="5000"
          step="100"
          value={priceRange[1]}
          onChange={(e) => onPriceChange([priceRange[0], parseInt(e.target.value)])}
          style={{ width: '100%', accentColor: 'var(--color-accent-rose)' }}
        />
        <div style={{ fontSize: '0.72rem', color: 'var(--color-text-light)', marginTop: '0.35rem' }}>
          Max illustrative rate: ₹{priceRange[1]}
        </div>
      </div>

      {/* Filter: Available Pack Sizes */}
      <div className="filter-group">
        <div className="filter-group-title">Pack Sizes</div>
        <div className="filter-options-list">
          {PACK_SIZES.map(size => {
            const isChecked = selectedPackSizes.includes(size);
            return (
              <label key={size} className="filter-checkbox-label">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => onTogglePackSize(size)}
                />
                <span>{size}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Filter: Availability */}
      <div className="filter-group">
        <div className="filter-group-title">Availability Status</div>
        <div className="filter-options-list">
          {AVAILABILITIES.map(status => {
            const isChecked = selectedAvailability.includes(status);
            return (
              <label key={status} className="filter-checkbox-label">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => onToggleAvailability(status)}
                />
                <span>{status}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Filter: Demo Rating */}
      <div className="filter-group">
        <div className="filter-group-title">Minimum Rating</div>
        <div className="filter-options-list">
          {[4.9, 4.8, 4.7, 0].map(rating => (
            <label key={rating} className="filter-checkbox-label">
              <input
                type="radio"
                name="minRating"
                checked={minRating === rating}
                onChange={() => onSelectRating(rating)}
              />
              <span>{rating === 0 ? 'All Ratings' : `${rating} ★ & Above`}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default ProductFilters;

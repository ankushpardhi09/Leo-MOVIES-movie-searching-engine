import { useState } from 'react';

const GENRES = [
  'Action', 'Adventure', 'Animation', 'Biography', 'Comedy',
  'Crime', 'Documentary', 'Drama', 'Fantasy', 'Horror',
  'Musical', 'Mystery', 'Romance', 'Sci-Fi', 'Sport',
  'Thriller', 'War', 'Western',
];

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 50 }, (_, i) => String(currentYear - i));

const FilterPanel = ({ filters, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { genre = '', year = '', rating = '' } = filters;

  const handleChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const clearAll = () => {
    onFilterChange({ genre: '', year: '', rating: '' });
  };

  const hasFilters = genre || year || rating;

  return (
    <div className="bg-dark-800 rounded-xl border border-dark-600 overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-dark-700 transition-colors"
      >
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
          </svg>
          <span className="text-white font-medium text-sm">Filters</span>
          {hasFilters && (
            <span className="bg-accent-primary text-white text-xs px-2 py-0.5 rounded-full">
              Active
            </span>
          )}
        </div>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Filter options */}
      {isOpen && (
        <div className="px-4 pb-4 space-y-4 border-t border-dark-600 pt-3 animate-fade-in">
          {/* Genre */}
          <div>
            <label className="block text-gray-400 text-xs font-medium mb-1.5 uppercase tracking-wide">Genre</label>
            <select
              value={genre}
              onChange={(e) => handleChange('genre', e.target.value)}
              className="input-field w-full text-sm"
            >
              <option value="">All Genres</option>
              {GENRES.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          {/* Year */}
          <div>
            <label className="block text-gray-400 text-xs font-medium mb-1.5 uppercase tracking-wide">Year</label>
            <select
              value={year}
              onChange={(e) => handleChange('year', e.target.value)}
              className="input-field w-full text-sm"
            >
              <option value="">All Years</option>
              {YEARS.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          {/* Min Rating */}
          <div>
            <label className="block text-gray-400 text-xs font-medium mb-1.5 uppercase tracking-wide">
              Min Rating: <span className="text-yellow-400">{rating || '0'}</span>
            </label>
            <input
              type="range"
              min="0"
              max="10"
              step="0.5"
              value={rating}
              onChange={(e) => handleChange('rating', e.target.value)}
              className="w-full accent-accent-primary"
            />
            <div className="flex justify-between text-gray-600 text-xs mt-1">
              <span>0</span>
              <span>5</span>
              <span>10</span>
            </div>
          </div>

          {/* Clear button */}
          {hasFilters && (
            <button
              onClick={clearAll}
              className="w-full text-center text-accent-primary text-sm hover:underline"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterPanel;

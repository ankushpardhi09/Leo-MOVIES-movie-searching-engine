import { useState, useEffect, useRef } from 'react';
import { getSuggestions } from '../api/api';

const SearchBar = ({ onSearch, initialQuery = '' }) => {
  const [query, setQuery] = useState(initialQuery);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef(null);
  const containerRef = useRef(null);
  const requestIdRef = useRef(0);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    const normalizedQuery = query.trim();

    if (normalizedQuery.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      setLoading(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      const requestId = requestIdRef.current + 1;
      requestIdRef.current = requestId;
      setLoading(true);

      try {
        const data = await getSuggestions(normalizedQuery);
        if (requestId !== requestIdRef.current) return;

        const nextSuggestions = (data.suggestions || []).slice(0, 6);
        setSuggestions(nextSuggestions);
        setShowSuggestions(nextSuggestions.length > 0);
      } catch {
        if (requestId !== requestIdRef.current) return;
        setSuggestions([]);
        setShowSuggestions(false);
      } finally {
        if (requestId !== requestIdRef.current) return;
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(debounceRef.current);
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setShowSuggestions(false);
      setSuggestions([]);
      onSearch(query.trim());
    }
  };

  const handleSuggestionClick = (movie) => {
    if (!movie?.Title) return;

    setShowSuggestions(false);
    setSuggestions([]);
    setQuery(movie.Title);
    onSearch(movie.Title);
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setShowSuggestions(false);
              }
            }}
            placeholder="Search for movies..."
            className="input-field w-full pr-10 text-base"
            aria-label="Search movies"
          />
          {loading && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className="w-4 h-4 border-2 border-accent-primary border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>
        <button type="submit" className="btn-primary flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="hidden sm:inline">Search</span>
        </button>
      </form>

      {/* Suggestions dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-dark-700 border border-dark-500 rounded-lg shadow-xl overflow-hidden animate-fade-in">
          {suggestions.map((movie) => (
            <button
              key={movie.imdbID}
              type="button"
              onClick={() => handleSuggestionClick(movie)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-dark-600 transition-colors text-left"
            >
              {movie.Poster && movie.Poster !== 'N/A' ? (
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  className="w-10 h-14 object-cover rounded"
                />
              ) : (
                <div className="w-10 h-14 bg-dark-500 rounded flex items-center justify-center text-gray-500">
                  🎬
                </div>
              )}
              <div>
                <p className="text-white font-medium text-sm">{movie.Title}</p>
                <p className="text-gray-400 text-xs">{movie.Year}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;

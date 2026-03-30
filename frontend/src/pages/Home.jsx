import { useState, useCallback, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import MovieList from '../components/MovieList';
import MovieCard from '../components/MovieCard';
import { searchMovies } from '../api/api';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentQuery, setCurrentQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [filters, setFilters] = useState({ genre: '', year: '', rating: '' });
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [loadingRecommendations, setLoadingRecommendations] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      const seedTerms = ['Dune', 'Oppenheimer', 'Barbie', 'Killers of the Flower Moon', 'The Batman', 'Top Gun Maverick'];

      setLoadingRecommendations(true);
      try {
        const responses = await Promise.all(seedTerms.map((term) => searchMovies(term, 1)));

        const deduped = [];
        const seen = new Set();

        responses.forEach((result) => {
          const firstMovie = result?.movies?.[0];
          if (!firstMovie || seen.has(firstMovie.imdbID)) return;
          seen.add(firstMovie.imdbID);
          deduped.push(firstMovie);
        });

        setRecommendedMovies(deduped.slice(0, 6));
      } finally {
        setLoadingRecommendations(false);
      }
    };

    fetchRecommendations();
  }, []);

  const fetchMovies = useCallback(async (query, page = 1) => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const data = await searchMovies(query, page);
      setMovies(data.movies || []);
      setTotalResults(data.totalResults || 0);
      setCurrentPage(page);
      setHasSearched(true);
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to search movies');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearch = (query) => {
    setCurrentQuery(query);
    fetchMovies(query, 1);
  };

  const handlePageChange = (page) => {
    fetchMovies(currentQuery, page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Apply client-side filters
  const filteredMovies = movies.filter((movie) => {
    if (filters.genre && movie.Genre && !movie.Genre.includes(filters.genre)) return false;
    if (filters.year && movie.Year && !movie.Year.startsWith(filters.year)) return false;
    if (filters.rating && movie.imdbRating && movie.imdbRating !== 'N/A') {
      if (parseFloat(movie.imdbRating) < parseFloat(filters.rating)) return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero section */}
      {!hasSearched && (
        <div className="text-center py-16 animate-fade-in">
          <div className="text-6xl mb-4">🎬</div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">
            Movie <span className="text-accent-primary">Search</span> Engine
          </h1>
          <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
            Discover millions of movies. Search, explore, and find your next favorite film.
          </p>
        </div>
      )}

      {/* Search bar */}
      <div className={`${hasSearched ? 'mb-6' : 'mb-12'}`}>
        <SearchBar onSearch={handleSearch} initialQuery={currentQuery} />
      </div>

      {/* Filter + Results */}
      {hasSearched && (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <FilterPanel filters={filters} onFilterChange={setFilters} />
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            <MovieList
              movies={filteredMovies}
              loading={loading}
              error={error}
              totalResults={totalResults}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      )}

      {/* Popular suggestions when no search */}
      {!hasSearched && (
        <div className="space-y-10 animate-fade-in">
          <section>
            <div className="flex items-end justify-between mb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-white">Recent Recommendations</h2>
              <p className="text-gray-500 text-sm">Fresh picks to start with</p>
            </div>

            {loadingRecommendations ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-dark-800 rounded-xl overflow-hidden border border-dark-600">
                    <div className="skeleton aspect-[2/3]" />
                    <div className="p-3 space-y-2">
                      <div className="skeleton h-4 w-3/4 rounded" />
                      <div className="skeleton h-3 w-1/2 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : recommendedMovies.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {recommendedMovies.map((movie) => (
                  <MovieCard key={movie.imdbID} movie={movie} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">Recommendations are unavailable right now. Try searching below.</p>
            )}
          </section>

          <section className="text-center">
            <p className="text-gray-500 text-sm mb-4">Try searching for:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {['Avengers', 'Interstellar', 'The Dark Knight', 'Inception', 'Spider-Man'].map((term) => (
                <button
                  key={term}
                  onClick={() => handleSearch(term)}
                  className="bg-dark-700 hover:bg-dark-600 border border-dark-500 text-gray-300 hover:text-white text-sm px-4 py-2 rounded-full transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default Home;

import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import MovieList from '../components/MovieList';
import MovieCard from '../components/MovieCard';
import { searchMovies } from '../api/api';

const featuredTodayTerms = ['Dune', 'Shogun', 'The Last of Us', 'Fallout', 'Oppenheimer', 'The Bear'];
const topPickMovieTerms = ['The Batman', 'Interstellar', 'Parasite', 'Top Gun Maverick'];
const topPickSeriesTerms = ['Dark', 'Loki', 'Severance', 'The Boys'];
const top10Terms = [
  'Avengers',
  'Inception',
  'The Dark Knight',
  'Breaking Bad',
  'Wednesday',
  'Dune Part Two',
  'Joker',
  'Stranger Things',
  'The Office',
  'Gladiator'
];
const fanFavoriteTerms = ['Forrest Gump', 'Interstellar', 'Spirited Away', 'The Shawshank Redemption', 'Whiplash', 'Coco'];

const popularCelebrities = [
  { name: 'Zendaya', knownFor: 'Dune, Euphoria' },
  { name: 'Cillian Murphy', knownFor: 'Oppenheimer, Peaky Blinders' },
  { name: 'Pedro Pascal', knownFor: 'The Last of Us, Narcos' },
  { name: 'Anya Taylor-Joy', knownFor: 'Furiosa, The Queen\'s Gambit' },
  { name: 'Florence Pugh', knownFor: 'Dune: Part Two, Midsommar' },
  { name: 'Timothee Chalamet', knownFor: 'Dune, Wonka' }
];

const SectionTitle = ({ title, hint }) => (
  <div className="flex items-end justify-between mb-4">
    <h2 className="text-xl sm:text-2xl font-bold text-white">{title}</h2>
    {hint ? <p className="text-gray-500 text-xs sm:text-sm">{hint}</p> : null}
  </div>
);

const pickFirstUniqueMovies = (responses, limit) => {
  const deduped = [];
  const seen = new Set();

  responses.forEach((result) => {
    const firstMovie = result?.movies?.[0];
    if (!firstMovie || seen.has(firstMovie.imdbID)) return;

    seen.add(firstMovie.imdbID);
    deduped.push(firstMovie);
  });

  return deduped.slice(0, limit);
};

const getInitials = (fullName) =>
  fullName
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

const Home = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentQuery, setCurrentQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [filters, setFilters] = useState({ genre: '', year: '', rating: '' });
  const [featuredToday, setFeaturedToday] = useState([]);
  const [topPickMovies, setTopPickMovies] = useState([]);
  const [topPickSeries, setTopPickSeries] = useState([]);
  const [top10ThisWeek, setTop10ThisWeek] = useState([]);
  const [fanFavorites, setFanFavorites] = useState([]);
  const [loadingHomepage, setLoadingHomepage] = useState(true);

  useEffect(() => {
    const fetchHomepageSections = async () => {
      setLoadingHomepage(true);

      try {
        const [featuredResponses, topPickMovieResponses, topPickSeriesResponses, top10Responses, fanFavoriteResponses] =
          await Promise.all([
            Promise.all(featuredTodayTerms.map((term) => searchMovies(term, 1))),
            Promise.all(topPickMovieTerms.map((term) => searchMovies(term, 1))),
            Promise.all(topPickSeriesTerms.map((term) => searchMovies(term, 1))),
            Promise.all(top10Terms.map((term) => searchMovies(term, 1))),
            Promise.all(fanFavoriteTerms.map((term) => searchMovies(term, 1)))
          ]);

        setFeaturedToday(pickFirstUniqueMovies(featuredResponses, 6));
        setTopPickMovies(pickFirstUniqueMovies(topPickMovieResponses, 4));
        setTopPickSeries(pickFirstUniqueMovies(topPickSeriesResponses, 4));
        setTop10ThisWeek(pickFirstUniqueMovies(top10Responses, 10));
        setFanFavorites(pickFirstUniqueMovies(fanFavoriteResponses, 6));
      } finally {
        setLoadingHomepage(false);
      }
    };

    fetchHomepageSections();
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
      {/* Back button */}
      {hasSearched && (
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 bg-dark-700 hover:bg-dark-600 border border-dark-600 text-gray-300 hover:text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        </div>
      )}

      {/* Hero section */}
      {!hasSearched && (
        <div className="relative overflow-hidden rounded-2xl border border-dark-600 bg-dark-800/80 py-16 px-6 text-center animate-fade-in">
          <div className="pointer-events-none absolute -top-20 -left-16 h-56 w-56 rounded-full bg-accent-primary/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-accent-secondary/10 blur-3xl" />

          <div className="relative">
            <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-accent-secondary font-semibold mb-3">Leo MOVIES Central</p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 leading-tight">
              Explore What Everyone
              <span className="block text-accent-primary">Watches This Week</span>
            </h1>
            <p className="text-gray-300 text-base sm:text-lg mb-8 max-w-2xl mx-auto">
              Featured stories, trending picks, fan-loved titles, and celebrity buzz all in one place.
            </p>
          </div>
        </div>
      )}

      {/* Search bar */}
      <div className={`${hasSearched ? 'mb-6' : 'mb-12 pt-3'}`}>
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
            <SectionTitle title="Featured Today" hint="Curated highlights" />

            {loadingHomepage ? (
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
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {featuredToday.map((movie) => (
                  <MovieCard key={movie.imdbID} movie={movie} />
                ))}
              </div>
            )}
          </section>

          <section className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 rounded-2xl border border-dark-600 bg-dark-800/70 p-4 sm:p-6">
              <SectionTitle title="Top Picks" hint="Web series and movies just for you" />
              <div className="space-y-6">
                <div>
                  <p className="text-accent-secondary font-semibold mb-3 text-sm uppercase tracking-wider">Movies</p>
                  {loadingHomepage ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="bg-dark-800 rounded-xl overflow-hidden border border-dark-600">
                          <div className="skeleton aspect-[2/3]" />
                          <div className="p-3 space-y-2">
                            <div className="skeleton h-4 w-3/4 rounded" />
                            <div className="skeleton h-3 w-1/2 rounded" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {topPickMovies.map((movie) => (
                        <MovieCard key={movie.imdbID} movie={movie} />
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-accent-secondary font-semibold mb-3 text-sm uppercase tracking-wider">Web Series</p>
                  {loadingHomepage ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="bg-dark-800 rounded-xl overflow-hidden border border-dark-600">
                          <div className="skeleton aspect-[2/3]" />
                          <div className="p-3 space-y-2">
                            <div className="skeleton h-4 w-3/4 rounded" />
                            <div className="skeleton h-3 w-1/2 rounded" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {topPickSeries.map((show) => (
                        <MovieCard key={show.imdbID} movie={show} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <aside className="rounded-2xl border border-dark-600 bg-dark-800/70 p-4 sm:p-6">
              <SectionTitle title="Most Popular Celebrities" hint="Hot right now" />
              <div className="space-y-3">
                {popularCelebrities.map((person) => (
                  <div key={person.name} className="flex items-center gap-3 rounded-xl border border-dark-600 bg-dark-700/70 p-3">
                    <div className="h-11 w-11 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-sm font-bold text-white">
                      {getInitials(person.name)}
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold leading-tight">{person.name}</p>
                      <p className="text-gray-400 text-xs">{person.knownFor}</p>
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </section>

          <section>
            <SectionTitle title="Top 10 On Leo MOVIES This Week" hint="Most searched titles" />

            {loadingHomepage ? (
              <div className="grid sm:grid-cols-2 gap-3">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="h-24 rounded-xl border border-dark-600 bg-dark-800 skeleton" />
                ))}
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-3">
                {top10ThisWeek.map((movie, index) => (
                  <button
                    key={movie.imdbID}
                    onClick={() => handleSearch(movie.Title)}
                    className="group flex items-center gap-3 rounded-xl border border-dark-600 bg-dark-800 hover:bg-dark-700/80 transition-colors p-3 text-left"
                  >
                    <span className="text-2xl font-black text-accent-secondary w-10 text-center">{index + 1}</span>
                    <img
                      src={movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/80x120/1a1a24/666666?text=No+Image'}
                      alt={movie.Title}
                      className="h-16 w-12 object-cover rounded"
                      loading="lazy"
                    />
                    <div className="min-w-0">
                      <p className="text-white font-semibold text-sm group-hover:text-accent-primary transition-colors line-clamp-1">{movie.Title}</p>
                      <p className="text-gray-400 text-xs">{movie.Year}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </section>

          <section>
            <SectionTitle title="Fan Favorites" hint="All-time loved picks" />

            {loadingHomepage ? (
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
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {fanFavorites.map((movie) => (
                  <MovieCard key={movie.imdbID} movie={movie} />
                ))}
              </div>
            )}
          </section>

          <footer className="rounded-2xl border border-dark-600 bg-dark-800/70 p-6 sm:p-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <p className="text-white font-bold text-lg">Leo MOVIES</p>
                <p className="text-gray-400 text-sm mt-2">Discover what to watch next with trending titles, fan favorites, and smart search.</p>
              </div>
              <div>
                <p className="text-white font-semibold mb-2">Explore</p>
                <ul className="space-y-1 text-sm text-gray-400">
                  <li>Featured Today</li>
                  <li>Top Picks</li>
                  <li>Top 10 This Week</li>
                </ul>
              </div>
              <div>
                <p className="text-white font-semibold mb-2">Community</p>
                <ul className="space-y-1 text-sm text-gray-400">
                  <li>Fan Favorites</li>
                  <li>Popular Celebrities</li>
                  <li>Watchlist</li>
                </ul>
              </div>
              <div>
                <p className="text-white font-semibold mb-2">Powered By</p>
                <p className="text-sm text-gray-400">OMDb API</p>
                <p className="text-xs text-gray-500 mt-4">© {new Date().getFullYear()} Leo MOVIES</p>
              </div>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
};

export default Home;

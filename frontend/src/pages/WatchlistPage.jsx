import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookmarkCheck, Trash2 } from 'lucide-react';
import { getWatchlist, removeMovieFromWatchlist } from '../utils/watchlist';

const POSTER_PLACEHOLDER = 'https://via.placeholder.com/300x450/1a1a24/666666?text=No+Image';

const WatchlistPage = () => {
  const navigate = useNavigate();
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    setWatchlist(getWatchlist());
  }, []);

  const handleRemove = (imdbID) => {
    const nextWatchlist = removeMovieFromWatchlist(imdbID);
    setWatchlist(nextWatchlist);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Your Watchlist</h1>
          <p className="text-gray-400">Save movies you want to watch later and keep your picks in one place.</p>
        </div>

        <button
          onClick={() => navigate('/')}
          className="btn-primary shrink-0"
        >
          Find Movies
        </button>
      </div>

      {watchlist.length === 0 ? (
        <div className="bg-dark-800 border border-dark-600 rounded-xl p-8 text-center">
          <div className="text-5xl mb-3">📌</div>
          <p className="text-gray-500 text-sm mb-6">
            No saved movies yet. Open a movie and use the watchlist button to save it here.
          </p>
          <button onClick={() => navigate('/')} className="btn-primary">
            Find Movies
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {watchlist.map((movie) => {
            const posterSrc = movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : POSTER_PLACEHOLDER;

            return (
              <div key={movie.imdbID} className="bg-dark-800 rounded-xl overflow-hidden border border-dark-600">
                <Link to={`/movie/${movie.imdbID}`} className="block group">
                  <div className="relative aspect-[2/3] overflow-hidden">
                    <img
                      src={posterSrc}
                      alt={movie.Title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(event) => {
                        event.currentTarget.src = POSTER_PLACEHOLDER;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="p-4">
                    <h2 className="text-white font-semibold leading-snug line-clamp-2">{movie.Title}</h2>
                    <p className="text-gray-400 text-sm mt-1">{movie.Year || 'Unknown year'}</p>
                  </div>
                </Link>

                <div className="px-4 pb-4 flex items-center justify-between gap-3">
                  <div className="inline-flex items-center gap-2 text-emerald-300 text-xs font-medium">
                    <BookmarkCheck className="w-4 h-4" />
                    Saved
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemove(movie.imdbID)}
                    className="inline-flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm font-semibold text-red-300 transition-colors hover:bg-red-500/20"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default WatchlistPage;

import { useNavigate } from 'react-router-dom';

const WatchlistPage = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      <div className="bg-dark-800 border border-dark-600 rounded-xl p-8 text-center">
        <div className="text-5xl mb-3">📌</div>
        <h1 className="text-3xl font-bold text-white mb-2">Your Watchlist</h1>
        <p className="text-gray-400 max-w-xl mx-auto mb-6">
          Save movies you want to watch later and keep your picks in one place.
        </p>

        <p className="text-gray-500 text-sm mb-6">
          No saved movies yet. Search and start building your watchlist.
        </p>

        <button
          onClick={() => navigate('/')}
          className="btn-primary"
        >
          Find Movies
        </button>
      </div>
    </div>
  );
};

export default WatchlistPage;

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MovieDetails from '../components/MovieDetails';
import { getMovieDetails } from '../api/api';

const MoviePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getMovieDetails(id);
        setMovie(data.movie);
      } catch (err) {
        setError(err.response?.data?.error || err.message || 'Failed to load movie');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10 animate-fade-in">
        {/* Skeleton */}
        <div className="flex flex-col md:flex-row gap-8">
          <div className="skeleton w-48 md:w-64 rounded-xl" style={{ aspectRatio: '2/3' }} />
          <div className="flex-1 space-y-4">
            <div className="skeleton h-10 w-3/4 rounded" />
            <div className="skeleton h-4 w-1/3 rounded" />
            <div className="skeleton h-4 w-1/4 rounded" />
            <div className="skeleton h-20 w-full rounded" />
            <div className="skeleton h-6 w-1/2 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-32 animate-fade-in">
        <span className="text-5xl mb-4">⚠️</span>
        <p className="text-red-400 text-xl font-medium mb-2">Movie not found</p>
        <p className="text-gray-500 text-sm mb-6">{error}</p>
        <button onClick={() => navigate(-1)} className="btn-primary">
          ← Go back
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Back button */}
      <div className="max-w-7xl mx-auto px-4 pt-6">
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

      <MovieDetails movie={movie} />
    </div>
  );
};

export default MoviePage;

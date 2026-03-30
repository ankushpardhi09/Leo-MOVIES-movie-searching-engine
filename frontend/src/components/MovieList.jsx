import MovieCard from './MovieCard';

const SkeletonCard = () => (
  <div className="bg-dark-800 rounded-xl overflow-hidden border border-dark-600">
    <div className="skeleton aspect-[2/3]" />
    <div className="p-3 space-y-2">
      <div className="skeleton h-4 w-3/4 rounded" />
      <div className="skeleton h-3 w-1/2 rounded" />
    </div>
  </div>
);

const MovieList = ({ movies, loading, error, totalResults, currentPage, onPageChange }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 animate-fade-in">
        {Array.from({ length: 10 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
        <span className="text-5xl mb-4">⚠️</span>
        <p className="text-red-400 text-lg font-medium">Something went wrong</p>
        <p className="text-gray-500 text-sm mt-1">{error}</p>
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
        <span className="text-5xl mb-4">🔍</span>
        <p className="text-gray-400 text-lg font-medium">No movies found</p>
        <p className="text-gray-600 text-sm mt-1">Try a different search term or adjust your filters</p>
      </div>
    );
  }

  const totalPages = Math.ceil(totalResults / 10);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Results count */}
      <p className="text-gray-400 text-sm">
        Showing <span className="text-white font-medium">{movies.length}</span> of{' '}
        <span className="text-white font-medium">{totalResults}</span> results
      </p>

      {/* Movie grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-4">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="btn-secondary disabled:opacity-40 disabled:cursor-not-allowed"
          >
            ← Prev
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => onPageChange(pageNum)}
                  className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                    currentPage === pageNum
                      ? 'bg-accent-primary text-white'
                      : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="btn-secondary disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieList;

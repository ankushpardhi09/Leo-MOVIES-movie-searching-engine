import { Link } from 'react-router-dom';

const POSTER_PLACEHOLDER = 'https://via.placeholder.com/300x450/1a1a24/666666?text=No+Image';

const MovieCard = ({ movie }) => {
  const { imdbID, Title, Year, Poster, imdbRating, Type } = movie;

  const posterSrc = Poster && Poster !== 'N/A' ? Poster : POSTER_PLACEHOLDER;

  return (
    <Link
      to={`/movie/${imdbID}`}
      className="group block bg-dark-800 rounded-xl overflow-hidden card-hover border border-dark-600 hover:border-accent-primary/40"
    >
      {/* Poster */}
      <div className="relative overflow-hidden aspect-[2/3]">
        <img
          src={posterSrc}
          alt={Title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          onError={(e) => {
            e.target.src = POSTER_PLACEHOLDER;
          }}
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Rating badge */}
        {imdbRating && imdbRating !== 'N/A' && (
          <div className="absolute top-2 right-2 bg-dark-900/80 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
            <span className="text-yellow-400 text-xs">⭐</span>
            <span className="text-white text-xs font-semibold">{imdbRating}</span>
          </div>
        )}

        {/* Type badge */}
        {Type && Type !== 'movie' && (
          <div className="absolute top-2 left-2 bg-accent-primary/80 backdrop-blur-sm px-2 py-1 rounded-full">
            <span className="text-white text-xs font-semibold capitalize">{Type}</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="text-white font-semibold text-sm leading-snug line-clamp-2 group-hover:text-accent-primary transition-colors">
          {Title}
        </h3>
        <p className="text-gray-400 text-xs mt-1">{Year}</p>
      </div>
    </Link>
  );
};

export default MovieCard;

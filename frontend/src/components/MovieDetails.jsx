const POSTER_PLACEHOLDER = 'https://via.placeholder.com/400x600/1a1a24/666666?text=No+Image';

const RatingBar = ({ source, value }) => {
  let percentage = 0;
  if (value.includes('%')) {
    percentage = parseFloat(value);
  } else if (value.includes('/10')) {
    percentage = (parseFloat(value) / 10) * 100;
  } else if (value.includes('/100')) {
    percentage = parseFloat(value);
  }

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-gray-400">{source}</span>
        <span className="text-white font-medium">{value}</span>
      </div>
      <div className="h-1.5 bg-dark-600 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-accent-secondary to-accent-primary rounded-full transition-all duration-1000"
          style={{ width: `${Math.min(100, percentage)}%` }}
        />
      </div>
    </div>
  );
};

const MovieDetails = ({ movie }) => {
  if (!movie) return null;

  const {
    Title, Year, Rated, Released, Runtime, Genre, Director, Writer,
    Actors, Plot, Language, Country, Awards, Poster, Ratings,
    imdbRating, imdbVotes, BoxOffice,
  } = movie;

  const posterSrc = Poster && Poster !== 'N/A' ? Poster : POSTER_PLACEHOLDER;
  const genres = Genre ? Genre.split(', ') : [];

  return (
    <div className="animate-slide-up">
      {/* Hero section */}
      <div className="relative">
        {/* Background blur */}
        <div
          className="absolute inset-0 opacity-20 blur-3xl scale-110"
          style={{
            backgroundImage: `url(${posterSrc})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        <div className="relative max-w-6xl mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Poster */}
            <div className="flex-shrink-0">
              <img
                src={posterSrc}
                alt={Title}
                className="w-48 md:w-64 rounded-xl shadow-2xl border border-dark-500 mx-auto"
                onError={(e) => { e.target.src = POSTER_PLACEHOLDER; }}
              />
            </div>

            {/* Info */}
            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">{Title}</h1>
                <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-400">
                  {Year && <span>{Year}</span>}
                  {Rated && Rated !== 'N/A' && (
                    <span className="border border-gray-600 px-2 py-0.5 rounded text-xs">{Rated}</span>
                  )}
                  {Runtime && Runtime !== 'N/A' && <span>⏱ {Runtime}</span>}
                </div>
              </div>

              {/* Genres */}
              {genres.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {genres.map((g) => (
                    <span
                      key={g}
                      className="bg-dark-600 border border-dark-500 text-gray-300 text-xs px-3 py-1 rounded-full"
                    >
                      {g}
                    </span>
                  ))}
                </div>
              )}

              {/* Rating */}
              {imdbRating && imdbRating !== 'N/A' && (
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400 text-2xl">⭐</span>
                  <span className="text-white text-2xl font-bold">{imdbRating}</span>
                  <span className="text-gray-500 text-sm">/10</span>
                  {imdbVotes && imdbVotes !== 'N/A' && (
                    <span className="text-gray-500 text-sm ml-1">({imdbVotes} votes)</span>
                  )}
                </div>
              )}

              {/* Plot */}
              {Plot && Plot !== 'N/A' && (
                <p className="text-gray-300 leading-relaxed text-sm md:text-base">{Plot}</p>
              )}

              {/* Meta info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                {Director && Director !== 'N/A' && (
                  <div>
                    <span className="text-gray-500">Director</span>
                    <p className="text-gray-200 font-medium">{Director}</p>
                  </div>
                )}
                {Released && Released !== 'N/A' && (
                  <div>
                    <span className="text-gray-500">Released</span>
                    <p className="text-gray-200 font-medium">{Released}</p>
                  </div>
                )}
                {Language && Language !== 'N/A' && (
                  <div>
                    <span className="text-gray-500">Language</span>
                    <p className="text-gray-200 font-medium">{Language}</p>
                  </div>
                )}
                {Country && Country !== 'N/A' && (
                  <div>
                    <span className="text-gray-500">Country</span>
                    <p className="text-gray-200 font-medium">{Country}</p>
                  </div>
                )}
                {BoxOffice && BoxOffice !== 'N/A' && (
                  <div>
                    <span className="text-gray-500">Box Office</span>
                    <p className="text-gray-200 font-medium">{BoxOffice}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details section */}
      <div className="max-w-6xl mx-auto px-4 pb-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cast & Crew */}
        <div className="md:col-span-2 space-y-4">
          {Actors && Actors !== 'N/A' && (
            <div className="bg-dark-800 rounded-xl p-5 border border-dark-600">
              <h2 className="text-white font-bold text-lg mb-3">Cast</h2>
              <div className="flex flex-wrap gap-2">
                {Actors.split(', ').map((actor) => (
                  <span
                    key={actor}
                    className="bg-dark-700 text-gray-300 text-sm px-3 py-1.5 rounded-full border border-dark-500"
                  >
                    {actor}
                  </span>
                ))}
              </div>
            </div>
          )}

          {Writer && Writer !== 'N/A' && (
            <div className="bg-dark-800 rounded-xl p-5 border border-dark-600">
              <h2 className="text-white font-bold text-lg mb-3">Writers</h2>
              <p className="text-gray-300 text-sm">{Writer}</p>
            </div>
          )}

          {Awards && Awards !== 'N/A' && (
            <div className="bg-dark-800 rounded-xl p-5 border border-dark-600">
              <h2 className="text-white font-bold text-lg mb-2">🏆 Awards</h2>
              <p className="text-gray-300 text-sm">{Awards}</p>
            </div>
          )}
        </div>

        {/* Ratings sidebar */}
        <div className="space-y-4">
          {Ratings && Ratings.length > 0 && (
            <div className="bg-dark-800 rounded-xl p-5 border border-dark-600">
              <h2 className="text-white font-bold text-lg mb-4">Ratings</h2>
              <div className="space-y-4">
                {Ratings.map((r) => (
                  <RatingBar key={r.Source} source={r.Source} value={r.Value} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;

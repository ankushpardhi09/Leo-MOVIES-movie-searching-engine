const Movie = require('../models/Movie');
const { searchMovies, getMovieById } = require('../services/omdbService');

/**
 * Search movies - with MongoDB caching
 */
const search = async (req, res, next) => {
  try {
    const { q, page = 1 } = req.query;

    if (!q || q.trim().length === 0) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const query = q.trim();

    // Fetch from OMDB
    const omdbData = await searchMovies(query, page);

    if (omdbData.Response === 'False') {
      return res.json({
        movies: [],
        totalResults: 0,
        page: Number(page),
        query,
        message: omdbData.Error || 'No movies found',
      });
    }

    const movies = omdbData.Search || [];

    return res.json({
      movies,
      totalResults: Number(omdbData.totalResults) || 0,
      page: Number(page),
      query,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get movie details by IMDB ID - with MongoDB caching
 */
const getMovie = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'Movie ID is required' });
    }

    // Check MongoDB cache first
    const cached = await Movie.findOne({ imdbID: id });
    if (cached) {
      return res.json({ movie: cached, source: 'cache' });
    }

    // Fetch from OMDB
    const movieData = await getMovieById(id);

    if (movieData.Response === 'False') {
      return res.status(404).json({ error: movieData.Error || 'Movie not found' });
    }

    // Save to MongoDB cache
    try {
      const movie = await Movie.findOneAndUpdate(
        { imdbID: id },
        { ...movieData, cachedAt: new Date() },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      return res.json({ movie, source: 'api' });
    } catch (dbError) {
      // If DB save fails, still return the data from OMDB
      return res.json({ movie: movieData, source: 'api' });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Get auto-suggestions while typing
 */
const getSuggestions = async (req, res, next) => {
  try {
    const { q } = req.query;

    if (!q || q.trim().length < 2) {
      return res.json({ suggestions: [] });
    }

    const query = q.trim();

    // Search OMDB for suggestions
    const omdbData = await searchMovies(query, 1);

    if (omdbData.Response === 'False') {
      return res.json({ suggestions: [] });
    }

    // Return top 5 suggestions
    const suggestions = (omdbData.Search || []).slice(0, 5).map((m) => ({
      imdbID: m.imdbID,
      Title: m.Title,
      Year: m.Year,
      Poster: m.Poster,
      Type: m.Type,
    }));

    return res.json({ suggestions });
  } catch (error) {
    next(error);
  }
};

module.exports = { search, getMovie, getSuggestions };

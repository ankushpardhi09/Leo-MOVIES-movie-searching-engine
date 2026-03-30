const axios = require('axios');

const OMDB_BASE_URL = 'http://www.omdbapi.com/';

/**
 * Search movies by title using OMDB API
 * @param {string} query - Search query
 * @param {number} page - Page number (default 1)
 * @returns {Object} - OMDB search results
 */
const searchMovies = async (query, page = 1) => {
  const apiKey = process.env.OMDB_API_KEY;
  if (!apiKey) {
    throw new Error('OMDB API key is not configured');
  }

  const response = await axios.get(OMDB_BASE_URL, {
    params: {
      apikey: apiKey,
      s: query,
      type: 'movie',
      page,
    },
    timeout: 10000,
  });

  return response.data;
};

/**
 * Get detailed movie information by IMDB ID
 * @param {string} imdbID - IMDB ID
 * @returns {Object} - Full movie details
 */
const getMovieById = async (imdbID) => {
  const apiKey = process.env.OMDB_API_KEY;
  if (!apiKey) {
    throw new Error('OMDB API key is not configured');
  }

  const response = await axios.get(OMDB_BASE_URL, {
    params: {
      apikey: apiKey,
      i: imdbID,
      plot: 'full',
    },
    timeout: 10000,
  });

  return response.data;
};

/**
 * Get movie details by title (for suggestions)
 * @param {string} title - Movie title
 * @returns {Object} - Movie details
 */
const getMovieByTitle = async (title) => {
  const apiKey = process.env.OMDB_API_KEY;
  if (!apiKey) {
    throw new Error('OMDB API key is not configured');
  }

  const response = await axios.get(OMDB_BASE_URL, {
    params: {
      apikey: apiKey,
      t: title,
      plot: 'short',
    },
    timeout: 10000,
  });

  return response.data;
};

module.exports = { searchMovies, getMovieById, getMovieByTitle };

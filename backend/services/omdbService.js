const axios = require('axios');

const OMDB_BASE_URL = 'https://www.omdbapi.com/';
const REQUEST_TIMEOUT_MS = 20000;
const CACHE_TTL_MS = 5 * 60 * 1000;
const responseCache = new Map();

const getOmdbApiKey = () => {
  const raw = (process.env.OMDB_API_KEY || '').trim();
  if (!raw) {
    throw new Error('OMDB API key is not configured');
  }

  // Accept either a plain API key or a pasted verification URL containing apikey/VERIFYKEY.
  if (raw.startsWith('http://') || raw.startsWith('https://')) {
    try {
      const parsedUrl = new URL(raw);
      return (
        parsedUrl.searchParams.get('apikey') ||
        parsedUrl.searchParams.get('VERIFYKEY') ||
        raw
      );
    } catch (_) {
      return raw;
    }
  }

  return raw;
};

const getCacheKey = (scope, params) => `${scope}:${JSON.stringify(params)}`;

const getCachedResponse = (key) => {
  const cached = responseCache.get(key);
  if (!cached) return null;

  if (cached.expiresAt <= Date.now()) {
    responseCache.delete(key);
    return null;
  }

  return cached.value;
};

const setCachedResponse = (key, value) => {
  responseCache.set(key, {
    value,
    expiresAt: Date.now() + CACHE_TTL_MS,
  });
};

const fetchOmdb = async (scope, params) => {
  const cacheKey = getCacheKey(scope, params);
  const cached = getCachedResponse(cacheKey);

  if (cached) {
    return cached;
  }

  const apiKey = getOmdbApiKey();

  const response = await axios.get(OMDB_BASE_URL, {
    params: {
      apikey: apiKey,
      ...params,
    },
    timeout: REQUEST_TIMEOUT_MS,
  });

  setCachedResponse(cacheKey, response.data);
  return response.data;
};

/**
 * Search movies by title using OMDB API
 * @param {string} query - Search query
 * @param {number} page - Page number (default 1)
 * @returns {Object} - OMDB search results
 */
const searchMovies = async (query, page = 1) => {
  return fetchOmdb('search', {
    s: query,
    type: 'movie',
    page,
  });
};

/**
 * Get detailed movie information by IMDB ID
 * @param {string} imdbID - IMDB ID
 * @returns {Object} - Full movie details
 */
const getMovieById = async (imdbID) => {
  return fetchOmdb('movie', {
    i: imdbID,
    plot: 'full',
  });
};

/**
 * Get movie details by title (for suggestions)
 * @param {string} title - Movie title
 * @returns {Object} - Movie details
 */
const getMovieByTitle = async (title) => {
  return fetchOmdb('title', {
    t: title,
    plot: 'short',
  });
};

module.exports = { searchMovies, getMovieById, getMovieByTitle };

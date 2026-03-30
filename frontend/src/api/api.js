import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
});

/**
 * Search movies by query
 * @param {string} query - Search term
 * @param {number} page - Page number
 */
export const searchMovies = async (query, page = 1) => {
  const { data } = await api.get('/movies/search', {
    params: { q: query, page },
  });
  return data;
};

/**
 * Get auto-suggestions
 * @param {string} query - Partial search term
 */
export const getSuggestions = async (query) => {
  const { data } = await api.get('/movies/suggestions', {
    params: { q: query },
  });
  return data;
};

/**
 * Get full movie details by IMDB ID
 * @param {string} imdbID - IMDB ID
 */
export const getMovieDetails = async (imdbID) => {
  const { data } = await api.get(`/movies/${imdbID}`);
  return data;
};

/**
 * Get available genres
 */
export const getGenres = async () => {
  const { data } = await api.get('/filters/genres');
  return data;
};

/**
 * Get available years
 */
export const getYears = async () => {
  const { data } = await api.get('/filters/years');
  return data;
};

export default api;

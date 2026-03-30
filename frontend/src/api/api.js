import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

console.log('🔗 API Base URL:', API_BASE_URL);

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

// Add request interceptor for debugging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`📤 API Request: ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
apiClient.interceptors.response.use(
  (response) => {
    console.log(`📥 API Response: ${response.status}`, response.data);
    return response;
  },
  (error) => {
    console.error('Response error:', error.response?.status, error.message);
    return Promise.reject(error);
  }
);

// Search movies
export const searchMovies = async (query, page = 1) => {
  try {
    if (!query.trim()) {
      return { movies: [], totalResults: 0, page: 1, query: '' };
    }
    const response = await apiClient.get('/movies/search', {
      params: { q: query, page },
    });
    return response.data;
  } catch (error) {
    console.error('❌ Search error:', error.message);
    return { movies: [], totalResults: 0, page: 1, query: query || '' };
  }
};

// Get search suggestions while typing
export const getSuggestions = async (query) => {
  try {
    if (!query || query.trim().length < 2) {
      return { suggestions: [] };
    }

    const response = await apiClient.get('/movies/suggestions', {
      params: { q: query },
    });
    return response.data;
  } catch (error) {
    console.error('❌ Suggestions error:', error.message);
    return { suggestions: [] };
  }
};

// Get movie details by ID
export const getMovieDetails = async (id) => {
  try {
    if (!id) {
      console.error('No movie ID provided');
      return null;
    }
    const response = await apiClient.get(`/movies/${id}`);
    return response.data;
  } catch (error) {
    console.error('❌ Details error:', error.message);
    return null;
  }
};

// Get all genres
export const getGenres = async () => {
  try {
    const response = await apiClient.get('/filters/genres');
    return response.data.genres || [];
  } catch (error) {
    console.error('❌ Genres error:', error.message);
    return [];
  }
};

// Get all years
export const getYears = async () => {
  try {
    const response = await apiClient.get('/filters/years');
    return response.data.years || [];
  } catch (error) {
    console.error('❌ Years error:', error.message);
    return [];
  }
};

export default apiClient;
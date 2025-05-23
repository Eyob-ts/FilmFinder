import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://imdb8.p.rapidapi.com',
  headers: {
    'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
    'x-rapidapi-host': import.meta.env.VITE_RAPIDAPI_HOST
  }
});

/**
 * Handles API requests with error handling
 * @param {Function} requestFn - The API request function to execute
 * @param {string} errorMessage - Error message prefix for logging
 */
const handleRequest = async (requestFn, errorMessage) => {
  try {
    const response = await requestFn();
    return response.data;
  } catch (error) {
    console.error(`${errorMessage}:`, error);
    throw error;
  }
};

export const movieApi = {
  /**
   * Search for movies by query
   * @param {string} query - Search query
   * @returns {Promise<Object>} Search results
   */
  searchMovies(query) {
    return handleRequest(
      () => apiClient.get('/title/v2/find', {
        params: { title: query, limit: 20 }
      }),
      'Error searching movies'
    );
  },

  /**
   * Get movie details by ID
   * @param {string} id - Movie ID
   * @returns {Promise<Object>} Movie details
   */
  getMovieDetails(id) {
    return handleRequest(
      () => apiClient.get('/title/get-details', {
        params: { tconst: id }
      }),
      'Error fetching movie details'
    );
  },

  /**
   * Get movie images by ID
   * @param {string} id - Movie ID
   * @returns {Promise<Object>} Movie images
   */
  getMovieImages(id) {
    return handleRequest(
      () => apiClient.get('/title/get-images', {
        params: { tconst: id, limit: 1 }
      }),
      'Error fetching movie images'
    );
  }
};

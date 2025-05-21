import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://imdb8.p.rapidapi.com',
  headers: {
    'x-rapidapi-key': '68261eb261msh44ee9981e3b673cp1e6ab3jsn0addcc419975',
    'x-rapidapi-host': 'imdb8.p.rapidapi.com'
  }
});

export const movieApi = {
  // Search movies
  async searchMovies(query) {
    try {
      const response = await apiClient.get('/title/v2/find', {
        params: {
          title: query,
          limit: 20
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching movies:', error);
      throw error;
    }
  },

  // Get movie details
  async getMovieDetails(id) {
    try {
      const response = await apiClient.get('/title/get-details', {
        params: {
          tconst: id
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching movie details:', error);
      throw error;
    }
  },

  // Get movie images
  async getMovieImages(id) {
    try {
      const response = await apiClient.get('/title/get-images', {
        params: {
          tconst: id,
          limit: 1
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching movie images:', error);
      throw error;
    }
  }
};

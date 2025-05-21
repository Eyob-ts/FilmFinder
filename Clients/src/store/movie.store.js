import { defineStore } from 'pinia';
import { movieApi } from '../services/movie.api';

export const useMovieStore = defineStore('movie', {
  state: () => ({
    movies: [],
    loading: false,
    error: null,
    searchQuery: '',
  }),

  getters: {
    getMovies: (state) => state.movies,
    isLoading: (state) => state.loading,
    getError: (state) => state.error,
  },

  actions: {
    async searchMovies(query) {
      this.loading = true;
      this.error = null;
      try {
        const results = await movieApi.searchMovies(query);
        this.movies = results.results || [];
        this.searchQuery = query;
      } catch (error) {
        this.error = error.message;
        this.movies = [];
      } finally {
        this.loading = false;
      }
    },

    async getMovieDetails(id) {
      try {
        const details = await movieApi.getMovieDetails(id);
        const images = await movieApi.getMovieImages(id);
        return { ...details, images };
      } catch (error) {
        console.error('Error fetching movie details:', error);
        throw error;
      }
    },

    clearMovies() {
      this.movies = [];
      this.searchQuery = '';
      this.error = null;
    }
  }
});

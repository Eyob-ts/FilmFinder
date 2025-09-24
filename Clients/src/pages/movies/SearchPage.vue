<template>
  <div class="min-h-screen ">
    <!-- Header with Logout -->
    <header class="">
      <div class="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex flex-col justify-between">
        <div class="flex justify-around items-center mb-4">
          <h1 class="text-2xl font-extralight text-gray-300 text-center">Movie Search</h1>
          <Button
            @click="handleLogout"
            label="Logout"
            variant="primary"
          />
        </div>
        <!-- Search Bar -->
        <SearchBar
          v-model="searchQuery"
          label="Search for a movie"
          placeholder="Enter movie title"
          :error="searchError"
          :loading="movieStore.isLoading"
          required
          @search="handleSearch"
        />
      </div>
    </header>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0 ">
        <MovieList :search-query="searchQuery" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../store/auth.store';
import { useToast } from 'vue-toastification';
import MovieList from '../../components/components/MovieList.vue';
import SearchBar from '../../components/molecules/SearchBar.vue';
import Button from '../../components/atoms/Button.vue';
import { ref } from 'vue';
import { useMovieStore } from '../../store/movie.store';

const router = useRouter();
const authStore = useAuthStore();
const toast = useToast();
const movieStore = useMovieStore();
const searchQuery = ref('');
const searchError = ref('');

const handleSearch = () => {
  if (!searchQuery.value.trim()) {
    searchError.value = 'Please enter a search term';
    return;
  }
  searchError.value = '';
  movieStore.searchMovies(searchQuery.value);
};

const handleLogout = async () => {
  try {
    await authStore.logout();
    toast.success('Logged out successfully');
    router.push('/');
  } catch (error) {
    toast.error('Error logging out');
    console.error('Logout error:', error);
  }
};
</script>

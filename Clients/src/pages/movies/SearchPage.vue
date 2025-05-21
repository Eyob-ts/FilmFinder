<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Header with Logout -->
    <header class="bg-gradient-to-br from-black to-red-500 shadow">
      <div class="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center mb-4">
          <h1 class="text-2xl font-extralight text-gray-300">Movie Search</h1>
          <Button
            @click="handleLogout"
            
            :loading="movieStore.isLoading"
            label="logout"
            variant="primary"
          />
        </div>
        <!-- Search Components -->
        <div class="flex gap-4 items-end">
          <Input
            v-model="searchQuery"
            @keyup.enter="handleSearch"
            label="Search for a movie"
            placeholder="Enter movie title"
            class="flex-1"
          />
          <Button
            @click="handleSearch"
            :disabled="!searchQuery.trim() || movieStore.isLoading"
            :loading="movieStore.isLoading"
            label="Search"
            variant="primary"
          />
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0 bg-gradient-to-br from-black to-red-500">
        <MovieList :search-query="searchQuery" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../store/auth.store';
import { useToast } from 'vue-toastification';
import MovieList from '../../components/molecules/MovieList.vue';
import Input from '../../components/atoms/Input.vue';
import Button from '../../components/atoms/Button.vue';
import { ref } from 'vue';
import { useMovieStore } from '../../store/movie.store';

const router = useRouter();
const authStore = useAuthStore();
const toast = useToast();
const movieStore = useMovieStore();
const searchQuery = ref('');

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    movieStore.searchMovies(searchQuery.value.trim());
  }
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

<template>
    <div class="container mx-auto px-4 py-8">
        <!-- Loading Spinner -->
        <div v-if="movieStore.isLoading" class="flex justify-center items-center h-64">
            <LoadingSpinner size="lg" class="text-red-600" />
        </div>

        <!-- Error State -->
        <div v-else-if="movieStore.error" class="text-red-600">
            {{ movieStore.error }}
        </div>

        <!-- Movie card -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <MovieCard
                v-for="movie in movieStore.movies"
                :key="movie.id"
                :movie="movie"
            />
        </div>

        <!-- No Results -->
        <div 
            v-if="!movieStore.isLoading && !movieStore.error && movieStore.movies.length === 0" 
            class="text-center text-gray-500 mt-8"
        >
            No movies found. Try a different search term.
        </div>
    </div>
</template>

<script setup>
import { useMovieStore } from '../../store/movie.store';
import MovieCard from './MovieCard.vue';
import LoadingSpinner from '../atoms/LoadingSpinner.vue';

const movieStore = useMovieStore();
</script> 
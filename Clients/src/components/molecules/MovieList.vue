<template>
    <div class="container mx-auto px-4 py-8">
        <!-- Loading Spinner -->
        <div v-if="movieStore.isLoading" class="flex justify-center items-center h-64">
            <svg
            class="animate-spin h-10 w-10 text-red-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            >
                <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
                ></circle>
                <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
            </svg>
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
            @click.native="handleMovieClick(movie)"
            />
        </div>

        <!-- No Results -->
        <div v-if="!movieStore.isLoading && !movieStore.error && movieStore.movies.length === 0" 
             class="text-center text-gray-500 mt-8">
            No movies found. Try a different search term.
        </div>
    </div>
</template>

<script setup>
import { useMovieStore } from '../../store/movie.store';
import MovieCard from '../molecules/MovieCard.vue';

defineProps({
    searchQuery: {
        type: String,
        required: true
    }
});

const movieStore = useMovieStore();

const handleMovieClick = (movie) => {
    // Handle movie click if needed
    console.log('Movie clicked:', movie);
};
</script>

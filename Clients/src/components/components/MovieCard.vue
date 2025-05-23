<template>
    <div class="relative group overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
        <!-- Movie poster -->
        <template v-if="movie.image?.url">
            <img
                :src="movie.image.url"
                :alt="movie.title"
                class="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-105"
                @error="handleImageError"
            />
        </template>
        <PlaceholderImage v-else/>

        <!-- Movie Info Overlay -->
        <MovieCardOverlay
            :title="movie.title"
            :year="movie.year"
            :description="movieDetails?.plot?.plotText?.plainText || movie.description || 'No description available'"
            :is-loading="isLoading && !hasError"
            :has-error="hasError"
            @retry="fetchMovieDetails"
        />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import PlaceholderImage from '../atoms/PlaceholderImage.vue';
import MovieCardOverlay from './MovieCardOverlay.vue';
import { useMovieStore } from '../../store/movie.store';

const props = defineProps({
    movie: {
        type: Object,
        required: true,
    }
});

const movieStore = useMovieStore();
const movieDetails = ref(null);
const isLoading = ref(false);
const hasError = ref(false);

const fetchMovieDetails = async () => {
    if (hasError.value || movieDetails.value) return;
    
    isLoading.value = true;
    hasError.value = false;
    
    try {
        const details = await movieStore.getMovieDetails(props.movie.id);
        movieDetails.value = details;
    } catch (error) {
        console.error('Error fetching movie details:', error);
        hasError.value = true;
    } finally {
        isLoading.value = false;
    }
};

const handleImageError = (e) => {
    console.error('Error loading image:', e);
    // You could set a default image here if needed
};

// Only fetch details if we don't already have them
onMounted(() => {
    if (!movieDetails.value) {
        fetchMovieDetails();
    }
});
</script> 
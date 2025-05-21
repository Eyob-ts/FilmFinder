<template>
    <div class="relative group overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
     <!-- Movie poster -->
      <template v-if="movie.image?.url">
        <img
        :src="movie.image.url"
        :alt="movie.title"
        class="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-105"   
        />
      </template>
      <PlaceholderImage v-else/>

        <!-- Movie Info Overlay -->
         <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 duration-300">
            <div class="absolute bottom-0 p-4 text-white">
                <h3 class="text-lg font-bold mb-2">
                    {{ movie.title }}
                </h3>
                <p class="text-sm mb-2">
                    {{ movie.year }}
                </p>
                <p v-if="movieDetails" class="text-sm line-clamp-3">{{ movieDetails.plot?.plotText?.plainText || 'No description available' }}</p>
                <p v-else class="text-sm text-gray-300">Loading description...</p>
           </div>
         </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import PlaceholderImage from '../atoms/PlaceholderImage.vue';
import { useMovieStore } from '../../store/movie.store';

const props = defineProps({
    movie: {
        type: Object,
        required: true,
    }
});

const movieStore = useMovieStore();
const movieDetails = ref(null);

onMounted(async () => {
    try {
        const details = await movieStore.getMovieDetails(props.movie.id);
        movieDetails.value = details;
    } catch (error) {
        console.error('Error fetching movie details:', error);
    }
});
</script>
<template>
  <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 duration-300">
    <div class="absolute bottom-0 p-4 w-full">
      <h3 class="text-lg font-bold text-white mb-1">
        {{ title }}
      </h3>
      <p class="text-sm text-gray-300 mb-2">
        {{ year }}
      </p>
      
      <!-- Loading State -->
      <div v-if="isLoading" class="text-sm text-gray-400 mb-2">
        Loading description...
      </div>
      
      <!-- Error State -->
      <div v-else-if="hasError" class="text-sm text-amber-400 mb-2">
        Couldn't load details. 
        <button 
          @click.stop="$emit('retry')" 
          class="text-white underline hover:text-amber-300 focus:outline-none"
        >
          Retry
        </button>
      </div>
      
      <!-- Description -->
      <p v-else class="text-sm text-gray-200 line-clamp-3">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  year: {
    type: [String, Number],
    default: ''
  },
  description: {
    type: String,
    default: 'No description available'
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  hasError: {
    type: Boolean,
    default: false
  }
});

defineEmits(['retry']);
</script> 
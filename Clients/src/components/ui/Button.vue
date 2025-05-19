<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    class="relative px-6 py-3 font-medium rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 overflow-hidden group"
    :class="[
      variant === 'primary'
        ? 'bg-gradient-to-br from-red-700 to-black/20 text-white hover:from-red-600 hover:to-red-700 focus:ring-red-400 shadow-white/5'
        : variant === 'secondary'
        ? 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 focus:ring-gray-300'
        : 'bg-transparent text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-gray-700 focus:ring-red-200',
      { 'opacity-50 cursor-not-allowed': disabled || loading },
    ]"
    @click="$emit('click')"
  >
    <span class="relative z-10 flex items-center justify-center">
      <!-- Loading Spinner -->
      <svg
        v-if="loading"
        class="w-5 h-5 mr-2 animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span>{{ label }}</span>
    </span>

    <!-- Hover Gradient Overlay (Primary Only) -->
    <span
      v-if="variant === 'primary'"
      class="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    ></span>

    <!-- Pulse Animation -->
    <span
      v-if="!disabled && !loading"
      class="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 group-active:opacity-20 transition-opacity duration-300"
    ></span>
  </button>
</template>

<script setup>
defineProps({
  type: { type: String, default: 'button' },
  label: { type: String, default: 'Submit' },
  variant: { type: String, default: 'primary', validator: (v) => ['primary', 'secondary', 'ghost'].includes(v) },
  disabled: Boolean,
  loading: Boolean,
});

defineEmits(['click']);
</script>
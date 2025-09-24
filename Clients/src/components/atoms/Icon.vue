<template>
  <svg 
    :class="[sizeClasses[size], color, 'mx-auto', 'mb-4']"
    fill="currentColor" 
    viewBox="0 0 20 20" 
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <slot></slot>
  </svg>
</template>

<script setup>
const props = defineProps({
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v)
  },
  color: {
    type: String,
    default: 'text-gray-400'
  }
});

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8'
};
</script>

<template>
  <span
    v-if="!disabled"
    class="absolute inset-0 bg-gradient-to-r from-red-600/80 to-red-700/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
  ></span>
</template>

<script setup>
defineProps({
  disabled: {
    type: Boolean,
    default: false
  }
});
</script>

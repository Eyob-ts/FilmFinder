<template>
  <span
    v-if="!disabled"
    class="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 group-active:opacity-20 transition-opacity duration-300"
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

<template>
  <span 
    class="flex items-center justify-center transition-opacity duration-200"
    :class="{ 'opacity-0': loading, 'opacity-100': !loading }"
  >
    <slot name="icon-left"></slot>
    <span class="whitespace-nowrap">{{ label }}</span>
    <slot name="icon-right"></slot>
  </span>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    default: ''
  },
  loading: {
    type: Boolean,
    default: false
  }
});
</script>

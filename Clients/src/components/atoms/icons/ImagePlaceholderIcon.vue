<template>
  <Icon v-bind="$attrs">
    <path 
      fill-rule="evenodd" 
      d="M10 2a8 8 0 100 16 8 8 0 000-16zm-1.5 4a.5.5 0 01.5-.5h3a.5.5 0 010 1h-3a.5.5 0 01-.5-.5zM10 12a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" 
      clip-rule="evenodd"
    />
  </Icon>
</template>

<script setup>
import Icon from '../Icon.vue';

defineProps({
  size: {
    type: String,
    default: 'lg'
  },
  color: {
    type: String,
    default: 'text-gray-400'
  }
});
</script>

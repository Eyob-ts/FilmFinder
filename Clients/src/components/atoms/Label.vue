<template>
  <label
    :for="htmlFor"
    class="block text-sm font-extralight text-gray-500 mb-2"
  >
    <slot>{{ label }}</slot>
    <span v-if="required" class="text-red-500">*</span>
  </label>
</template>

<script setup>
const props = defineProps({
  htmlFor: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  }
});
</script>

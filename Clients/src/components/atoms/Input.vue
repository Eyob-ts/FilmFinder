<template>
  <input
    :type="type"
    :id="id"
    :placeholder="placeholder"
    :value="modelValue"
    :required="required"
    :disabled="disabled"
    :aria-invalid="error ? 'true' : 'false'"
    :aria-describedby="error ? `${id}-error` : undefined"
    @input="$emit('update:modelValue', $event.target.value)"
    class="
      w-full
      px-4
      py-3
      rounded-xl
      text-white
      bg-black/20
      backdrop-blur-lg
      border border-white/10
      placeholder-white/60
      focus:outline-none
      focus:ring-2 focus:ring-white/20
      transition duration-300
      disabled:opacity-50
      disabled:cursor-not-allowed
    "
    :class="{
      'border-red-500 focus:ring-red-200': error,
      'border-gray-600 focus:ring-blue-200': !error
    }"
  />
  <p 
    v-if="error" 
    :id="`${id}-error`" 
    class="mt-1 text-sm text-red-500"
  >
    {{ error }}
  </p>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: 'text'
  },
  modelValue: {
    type: [String, Number],
    default: ''
  },
  id: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: ''
  }
});

defineEmits(['update:modelValue']);
</script>
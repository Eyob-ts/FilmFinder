<template>
  <div class="w-full p-1">
    <label
      :for="label"
      class="block text-sm font-extralight text-gray-500 mb-2"
    >
      {{ label }}
    </label>
    <input
      :type="type"
      :id="label"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="
        w-full
        px-4
        py-3
        font-
        rounded-xl
        
        text-white
        backdrop-blur-lg
        
        placeholder-white/60
        border
        focus:outline-none
        focus:ring-2 
        transition duration-700
      "
    />
  </div>
</template>

<script setup>
defineProps({
  label: String,
  type: {
    type: String,
    default: 'text'
  },
  modelValue: [String, Number],
  placeholder: {
    type: String,
    default: ''
  }
})

defineEmits(['update:modelValue'])
</script>
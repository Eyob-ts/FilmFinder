<template>
  <div class="w-full p-1">
    <label
      :for="id || label"
      class="block text-sm font-extralight text-gray-500 mb-2"
    >
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <input
      :type="type"
      :id="id || label"
      :placeholder="placeholder"
      :value="modelValue"
      :required="required"
      :disabled="disabled"
      :aria-invalid="error ? 'true' : 'false'"
      :aria-describedby="error ? `${id || label}-error` : undefined"
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
      :id="`${id || label}-error`" 
      class="mt-1 text-sm text-red-500"
    >
      {{ error }}
    </p>
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
},
id: String,
required: Boolean,
disabled: Boolean,
error: String
})

defineEmits(['update:modelValue'])
</script>
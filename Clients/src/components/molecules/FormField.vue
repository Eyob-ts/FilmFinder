<template>
  <div class="w-full">
    <Label 
      v-if="label" 
      :html-for="id || label"
      :label="label"
      :required="required"
    />
    <Input
      :id="id || label"
      :type="type"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :error="error"
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
    />
  </div>
</template>

<script setup>
import Label from '../atoms/Label.vue';
import Input from '../atoms/Input.vue';

defineProps({
  label: {
    type: String,
    default: ''
  },
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

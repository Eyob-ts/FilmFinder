<template>
  <form @submit.prevent="$emit('search', searchQuery)" class="w-full">
    <FormField
      v-model="searchQuery"
      :label="label"
      :placeholder="placeholder"
      :error="error"
      :required="required"
      class="w-full"
    >
      <template #suffix>
        <Button
          type="submit"
          variant="ghost"
          :disabled="!searchQuery.trim() || loading"
          :loading="loading"
          class="ml-2"
        >
          <template #icon-right>
            <Icon size="sm" class="text-gray-500">
              <path 
                fill-rule="evenodd" 
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" 
                clip-rule="evenodd" 
              />
            </Icon>
          </template>
        </Button>
      </template>
    </FormField>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue';
import FormField from '../molecules/FormField.vue';
import Button from '../atoms/Button.vue';
import Icon from '../atoms/Icon.vue';

/**
 * SearchBar component for handling search input with debounce and loading states
 * @emits {string} update:modelValue - Emitted when the search query changes
 * @emits {string} search - Emitted when the search form is submitted
 */
const props = defineProps({
  /** The current search query */
  modelValue: {
    type: String,
    default: ''
  },
  /** Label text for the search input */
  label: {
    type: String,
    default: 'Search'
  },
  /** Placeholder text for the search input */
  placeholder: {
    type: String,
    default: 'Search...'
  },
  /** Error message to display below the input */
  error: {
    type: String,
    default: ''
  },
  /** Whether the field is required */
  required: {
    type: Boolean,
    default: false
  },
  /** Whether the search is in progress */
  loading: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:modelValue', 'search']);

const searchQuery = ref(props.modelValue);

// Update local value when prop changes from parent
watch(() => props.modelValue, (newVal) => {
  if (newVal !== searchQuery.value) {
    searchQuery.value = newVal;
  }
}, { immediate: true });

// Emit update when input changes
watch(searchQuery, (newVal) => {
  emit('update:modelValue', newVal);
}, { deep: true });
</script>

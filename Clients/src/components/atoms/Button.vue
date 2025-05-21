<template>
    <button
      :type="type"
      :disabled="disabled || loading"
      :aria-busy="loading"
      :aria-disabled="disabled || loading"
      class="relative px-6 py-3 font-medium rounded-lg focus:ring-2 focus:ring-offset-2 transition-all duration-300 overflow-hidden group inline-flex items-center justify-center"
      :class="[
        baseClasses[variant],
        sizeClasses[size],
        {
          'opacity-50 cursor-not-allowed': disabled || loading,
          'pointer-events-none': disabled
        },
        customClasses
      ]"
      @click="handleClick"
    >
      <!-- Loading Spinner -->
      <span 
        v-if="loading" 
        class="absolute inset-0 flex items-center justify-center"
        aria-hidden="true"
      >
        <svg
          class="w-5 h-5 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </span>
  
      <!-- Button Content -->
      <span 
        class="flex items-center justify-center transition-opacity duration-200"
        :class="{'opacity-0': loading, 'opacity-100': !loading}"
      >
        <slot name="icon-left"></slot>
        <span class="whitespace-nowrap">{{ label }}</span>
        <slot name="icon-right"></slot>
      </span>
  
      <!-- Hover/Active Effects -->
      <span
        v-if="variant === 'primary' && !disabled && !loading"
        class="absolute inset-0 bg-gradient-to-r from-red-600/80 to-red-700/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      ></span>
  
      <span
        v-if="!disabled && !loading"
        class="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 group-active:opacity-20 transition-opacity duration-300"
      ></span>
    </button>
  </template>
  
  <script setup>
  import { debounce } from 'lodash-es';
  
  const props = defineProps({
    type: {
      type: String,
      default: 'button',
      validator: (v) => ['button', 'submit', 'reset'].includes(v)
    },
    label: {
      type: String,
      default: 'Submit'
    },
    variant: {
      type: String,
      default: 'primary',
      validator: (v) => ['primary', 'secondary', 'ghost', 'danger', 'success'].includes(v)
    },
    size: {
      type: String,
      default: 'medium',
      validator: (v) => ['small', 'medium', 'large'].includes(v)
    },
    disabled: Boolean,
    loading: Boolean,
    debounce: {
      type: Number,
      default: 0
    },
    customClasses: {
      type: String,
      default: ''
    }
  });
  
  const emit = defineEmits(['click']);
  
  const baseClasses = {
    primary: 'bg-gradient-to-br from-red-700/20 to-black/20 text-white hover:from-red-600 hover:to-red-700 focus:ring-red-400 shadow-white/5',
    secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 focus:ring-gray-300',
    ghost: 'bg-transparent text-red-600 hover:bg-red-50 focus:ring-red-200',
    danger: 'bg-red-100 text-red-700 hover:bg-red-200 focus:ring-red-300',
    success: 'bg-green-100 text-green-700 hover:bg-green-200 focus:ring-green-300'
  };
  
  const sizeClasses = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg'
  };
  
  const handleClick = (event) => {
    if (props.disabled || props.loading) return;
    
    if (props.debounce > 0) {
      debounce(() => emit('click', event), props.debounce)();
    } else {
      emit('click', event);
    }
  };
  </script>
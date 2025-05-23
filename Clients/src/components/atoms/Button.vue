<template>
  <button
    :type="type"
    :disabled="isDisabled"
    :aria-busy="loading"
    :aria-disabled="isDisabled"
    class="relative inline-flex items-center justify-center px-6 py-3 font-medium transition-all duration-300 rounded-lg focus:ring-2 focus:ring-offset-2 overflow-hidden group"
    :class="[
      variantClasses[variant],
      sizeClasses[size],
      {
        'opacity-50 cursor-not-allowed pointer-events-none': isDisabled,
        'hover:shadow-lg': variant === 'primary' && !isDisabled
      },
      customClasses
    ]"
    @click="handleClick"
  >
    <LoadingSpinner v-if="loading" :absolute="true" :size="size" />
    
    <ButtonContent :label="label" :loading="loading">
      <template #icon-left><slot name="icon-left"></slot></template>
      <template #icon-right><slot name="icon-right"></slot></template>
    </ButtonContent>
    
    <PrimaryHoverEffect v-if="variant === 'primary'" :disabled="isDisabled" />
    <SecondaryHoverEffect v-else :disabled="isDisabled" />
  </button>
</template>

<script setup>
import { computed } from 'vue';
import { debounce } from 'lodash-es';
import LoadingSpinner from './LoadingSpinner.vue';
import ButtonContent from './ButtonContent.vue';
import PrimaryHoverEffect from './effects/PrimaryHoverEffect.vue';
import SecondaryHoverEffect from './effects/SecondaryHoverEffect.vue';

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


const variantClasses = {
  primary: `
    bg-gradient-to-br 
    from-indigo-900 to-purple-900 
    text-white 
    hover:from-indigo-800 hover:to-purple-800 
    focus:ring-indigo-400 
    shadow-lg shadow-indigo-500/20
    dark:from-indigo-950 dark:to-purple-950
    dark:hover:from-indigo-900 dark:hover:to-purple-900
  `,
  secondary: `
    bg-slate-800 text-slate-100 
    hover:bg-slate-700 
    focus:ring-slate-500 
    dark:bg-slate-900 dark:text-slate-200 
    dark:hover:bg-slate-800
    border border-slate-700
  `,
  ghost: `
    bg-transparent text-indigo-400 
    hover:bg-indigo-900/30 
    focus:ring-indigo-300 
    dark:text-indigo-300 
    dark:hover:bg-indigo-900/50
    border border-indigo-900/20
  `,
  danger: `
    bg-rose-900/80 text-rose-100 
    hover:bg-rose-800/90 
    focus:ring-rose-400 
    dark:bg-rose-950 dark:text-rose-200 
    dark:hover:bg-rose-900
    shadow-lg shadow-rose-500/10
  `,
  success: `
    bg-emerald-900/80 text-emerald-100 
    hover:bg-emerald-800/90 
    focus:ring-emerald-400 
    dark:bg-emerald-950 dark:text-emerald-200 
    dark:hover:bg-emerald-900
    shadow-lg shadow-emerald-500/10
  `
};


const sizeClasses = {
  small: 'px-4 py-2 text-sm',
  medium: 'px-6 py-3 text-base',
  large: 'px-8 py-4 text-lg'
};

const isDisabled = computed(() => props.disabled || props.loading);

const handleClick = (event) => {
  if (isDisabled.value) return;
  
  if (props.debounce > 0) {
    debounce(() => emit('click', event), props.debounce)();
  } else {
    emit('click', event);
  }
};
</script>
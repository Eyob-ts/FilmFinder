<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-9xl font-bold text-pink-400">404</h1>
      <p class="text-2xl text-gray-600 mt-4">Page Not Found</p>
      <p class="text-gray-500 mt-2">The page you're looking for doesn't exist or you don't have permission to access it.</p>
      <router-link to="/" class="inline-block mt-6">
        <Button variant="primary">
          Go to Login
        </Button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import Button from '../components/atoms/Button.vue';
</script>
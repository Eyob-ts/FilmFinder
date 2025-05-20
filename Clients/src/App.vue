<script setup>
import { RouterView } from 'vue-router'
import { useToast } from 'vue-toastification'
import { onMounted } from 'vue'
import { useAuthStore } from './store/auth.store'

const toast = useToast()
const authStore = useAuthStore()

// Initialize auth and handle errors
onMounted(() => {
  authStore.setAuthHeader() // Initialize axios headers
  
  // Watch for auth store error changes
  const unsubscribe = authStore.$subscribe((mutation, state) => {
    if (state.error && state.error.message) {
      toast.error(state.error.message)
    }
  })

  return () => unsubscribe()
})
</script>

<template>
  <div class="bg-gradient-to-br from-red-800 to-black ">
    <RouterView />
  </div>
</template>

<style>
/* Add this to ensure toasts appear above all content */
.toast-container {
  z-index: 9999 !important;
}
</style>
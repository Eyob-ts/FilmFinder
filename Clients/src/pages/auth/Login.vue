<template>
  <div class="h-[100vh] w-full flex items-center justify-center p-8 ">
    <form @submit.prevent="handleLogin" 
    class="w-full max-w-md  p-16 md:p-12 flex flex-col gap-6">
      <h1 class="text-3xl font-extralight text-gray-500 text-center t ">Login</h1>
      <p class="text-gray-600 text-center font-mono">welcome</p>
      <FormField
        v-model="form.email"
        label="Email Address"
        type="email"
        placeholder="example@mail.com"
        :error="errors.email"
        autocomplete="email"
        inputmode="email"
        required
        class="w-full"
      />

      <FormField
        v-model="form.password"
        label="Password"
        type="password"
        placeholder="Enter your password"
        :error="errors.password"
        autocomplete="current-password"
        required
        class="w-full mt-4"
      />

      <Button
      type="submit"
        label="Login"
        variant="primary"
        :loading="isLoading"
        :disabled="isLoading"
        class="mt-6 w-full"
      />

      <div v-if="authStore.error" class="error-message">
        {{ authStore.error.message }}
      </div>

      <!-- Register Link -->
      <div class="text-center">
        <p class="text-sm text-gray-600">
          Don't have an account?
          <router-link
            to="/register"
            class="font-medium text-blue-600 hover:text-blue-500"
          >
            Register here
          </router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useAuthStore } from '../../store/auth.store'
import FormField from '../../components/molecules/FormField.vue'
import Button from '../../components/atoms/Button.vue'

const router = useRouter()
const toast = useToast()
const authStore = useAuthStore()

const form = ref({
  email: '',
  password: ''
})

const errors = ref({})
const isLoading = ref(false)

const handleLogin = async () => {
  if (isLoading.value) return;
  
  isLoading.value = true;
  errors.value = {};
  authStore.error = null;

  try {
    const { success, error } = await authStore.login(form.value);

    if (success) {
      toast.success('Login successful!');
      return router.push('/search');
    }
    
    authStore.error = error;
    toast.error(error?.message || 'Login failed');
  } catch (error) {
    console.error('Login error:', error);
    const message = error.response?.data?.message || 'An unexpected error occurred';
    authStore.error = { message };
    toast.error(message);
  } finally {
    isLoading.value = false;
  }
}
</script>
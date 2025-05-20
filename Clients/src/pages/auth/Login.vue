<template>
  <div class="h-[100vh] w-full flex items-center justify-center p-24 ">
    <form @submit.prevent="handleLogin" 
    class="w-full max-w-md mb-6  backdrop-blur-xl shadow-xl p-16 md:p-12 flex flex-col gap-6">
      <h1 class="text-3xl font-extralight text-gray-500 text-center t mb-2">Login</h1>
      <p class="text-gray-600 text-center mb-6 font-mono">welcome</p>
      <Input
        v-model="form.email"
        label="Email Address"
        type="email"
        placeholder="example@mail.com"
      />

      <Input
        v-model="form.password"
        label="Password"
        type="password"
        placeholder="••••••••"
      />

      <Button
        type="submit"
        label="Login"
        variant="primary"
        :loading="isLoading"
        class="btn-primary"
      />

      <div v-if="authStore.error" class="error-message">
        {{ authStore.error.message }}
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useAuthStore } from '../../store/auth.store'
import Input from '../../components/ui/Input.vue'
import Button from '../../components/ui/Button.vue'

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
  isLoading.value = true
  errors.value = {}
  authStore.error = null

  try {
    const response = await authStore.login(form.value)
    isLoading.value = false

    if (response.success) {
      toast.success('Login successful!')
      router.push('/')
    } else {
      authStore.error = response.error
      toast.error(authStore.error?.message || 'Login failed')
    }
  } catch (error) {
    console.error('Login error:', error)
    authStore.error = error.response?.data || { message: 'An unexpected error occurred' }
    toast.error(authStore.error?.message || 'An unexpected error occurred')
  }
}
</script>

<style scoped>
.centered-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.auth-form {
  max-width: 400px;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.input-field {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.btn-primary {
  background-color: #4CAF50;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #3e8e41;
}

.error-message {
  color: #f00;
  font-size: 14px;
  margin-top: 10px;
}
</style>
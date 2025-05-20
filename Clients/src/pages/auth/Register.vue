<template>
  <div class="h-[100vh] w-full flex items-center justify-center p-24 ">
    <form 
      @submit.prevent="handleRegister" 
      class="w-full max-w-md mb-6  backdrop-blur-xl shadow-xl p-16 md:p-12 flex flex-col gap-6"
    >
      <h1 class="text-3xl font-bold text-center text-white mb-2">Create Account</h1>
      <p class="text-gray-300 text-center mb-6">Join our community today</p>

      <Input
        v-model="form.name"
        label="Full Name"
        type="text"
        placeholder="John Doe"
      />

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
        label="Register"
        variant="primary"
        :loading="isLoading"
        class="btn-primary"
      />

      <p v-if="errorMessage" class="text-red-300 text-sm text-center mt-2">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Input from '../../components/ui/Input.vue'
import Button from '../../components/ui/Button.vue'
import { useAuthStore } from '../../store/auth.store'
import { useToast } from 'vue-toastification'

const router = useRouter()
const toast = useToast()
const authStore = useAuthStore()

const form = ref({
  name: '',
  email: '',
  password: ''
})

const isLoading = ref(false)
const errorMessage = ref('')

const handleRegister = async () => {
  isLoading.value = true
  errorMessage.value = ''
  authStore.error = null

  const { success, error } = await authStore.register(form.value)
  if (success) {
    toast.success('Registration successful!')
    router.push('/login')
  } else {
    errorMessage.value = error?.message || 'Something went wrong'
    toast.error(errorMessage.value)
  }

  isLoading.value = false
}
</script>

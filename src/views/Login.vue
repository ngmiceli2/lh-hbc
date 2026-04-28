<template>
  <div class="auth-container">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit" :disabled="loading">
        {{ loading ? 'Logging in...' : 'Login' }}
      </button>
      <p v-if="error" class="error">{{ error }}</p>
      <p>Don't have an account? <router-link to="/signup">Sign up</router-link></p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '../services/auth'

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref<string | null>(null)
const router = useRouter()

async function handleLogin() {
  loading.value = true
  error.value = null
  
  const { error: authError } = await authService.signIn(email.value, password.value)
  
  if (authError) {
    error.value = authError.message
    loading.value = false
  } else {
    router.push('/dashboard')
  }
}
</script>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 2rem auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}
.form-group {
  margin-bottom: 1rem;
}
.form-group label {
  display: block;
  margin-bottom: 0.5rem;
}
.form-group input {
  width: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
}
.error {
  color: red;
  margin-top: 1rem;
}
</style>

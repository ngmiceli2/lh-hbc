<template>
  <div class="auth-container">
    <h1>Login</h1>
    
    <div class="social-login">
      <button @click="handleGoogleLogin" class="btn-social google">
        Login with Google
      </button>
      <button @click="handleFacebookLogin" class="btn-social facebook">
        Login with Facebook
      </button>
    </div>

    <div class="separator">
      <span>OR</span>
    </div>

    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit" :disabled="loading" class="btn-primary">
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

async function handleGoogleLogin() {
  const { error: authError } = await authService.signInWithGoogle()
  if (authError) error.value = authError.message
}

async function handleFacebookLogin() {
  const { error: authError } = await authService.signInWithFacebook()
  if (authError) error.value = authError.message
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
.social-login {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}
.btn-social {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  font-weight: bold;
}
.separator {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 1.5rem 0;
  color: #666;
}
.separator::before, .separator::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #ddd;
}
.separator span {
  padding: 0 10px;
}
.form-group {
  margin-bottom: 1rem;
}
.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  text-align: left;
}
.form-group input {
  width: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
}
.btn-primary {
  width: 100%;
  padding: 0.75rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.error {
  color: red;
  margin-top: 1rem;
}
</style>

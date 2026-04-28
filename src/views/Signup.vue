<template>
  <div class="auth-container">
    <h1>Sign Up</h1>
    <form @submit.prevent="handleSignup">
      <div class="form-group">
        <label for="fullName">Full Name</label>
        <input type="text" id="fullName" v-model="fullName" required />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <div class="form-group">
        <label for="role">Role</label>
        <select id="role" v-model="role">
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
      </div>
      <button type="submit" :disabled="loading">
        {{ loading ? 'Signing up...' : 'Sign Up' }}
      </button>
      <p v-if="error" class="error">{{ error }}</p>
      <p>Already have an account? <router-link to="/login">Login</router-link></p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '../services/auth'

const email = ref('')
const password = ref('')
const fullName = ref('')
const role = ref<'student' | 'teacher'>('student')
const loading = ref(false)
const error = ref<string | null>(null)
const router = useRouter()

async function handleSignup() {
  loading.value = true
  error.value = null
  
  const { error: authError } = await authService.signUp(email.value, password.value, fullName.value, role.value)
  
  if (authError) {
    error.value = authError.message
    loading.value = false
  } else {
    // Supabase usually sends a confirmation email
    alert('Sign up successful! Please check your email for confirmation.')
    router.push('/login')
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
.form-group input, .form-group select {
  width: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
}
.error {
  color: red;
  margin-top: 1rem;
}
</style>

<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    <p v-if="user">Welcome, {{ user.email }}!</p>
    <button @click="handleSignOut">Sign Out</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '../services/auth'

const user = ref<any>(null)
const router = useRouter()

onMounted(async () => {
  const { session } = await authService.getSession()
  if (session) {
    user.value = session.user
  }
})

async function handleSignOut() {
  await authService.signOut()
  router.push('/login')
}
</script>

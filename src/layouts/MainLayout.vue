<template>
  <div class="main-layout">
    <nav class="navbar">
      <div class="nav-brand">Bookclub Manager</div>
      <div class="nav-links">
        <router-link to="/dashboard">Dashboard</router-link>
        <router-link v-if="role === 'student'" to="/log-book">Log a Book</router-link>
        <button @click="handleSignOut">Sign Out</button>
      </div>
    </nav>
    <main class="content">
      <slot></slot>
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '../services/auth'

const role = ref<string | null>(null)
const router = useRouter()

onMounted(async () => {
  const { session } = await authService.getSession()
  if (session) {
    role.value = session.user.user_metadata.role
  }
})

async function handleSignOut() {
  await authService.signOut()
  router.push('/login')
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
}
.nav-brand {
  font-weight: bold;
  font-size: 1.25rem;
}
.nav-links {
  display: flex;
  gap: 1rem;
  align-items: center;
}
.content {
  padding: 2rem;
}
</style>

<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    <p v-if="user">Welcome, {{ user.email }}!</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { authService } from '../services/auth'

const user = ref<any>(null)

onMounted(async () => {
  const { session } = await authService.getSession()
  if (session) {
    user.value = session.user
  }
})
</script>

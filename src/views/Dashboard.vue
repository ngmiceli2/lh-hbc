<template>
  <div class="dashboard">
    <h1>Your Reading History</h1>
    
    <div v-if="loading" class="loading">Loading your logs...</div>
    
    <div v-else-if="logs.length" class="log-list">
      <div v-for="log in logs" :key="log.id" class="log-item">
        <div class="log-date">{{ new Date(log.date).toLocaleDateString() }}</div>
        <div class="log-details">
          <strong>{{ log.books.title }}</strong>
          <p>Read {{ log.pages_read }} pages</p>
          <p v-if="log.notes" class="notes">"{{ log.notes }}"</p>
        </div>
      </div>
    </div>
    
    <div v-else class="empty-state">
      <p>No reading logs yet. Start by logging a book!</p>
      <router-link to="/log-book" class="btn-primary">Log a Book</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { authService } from '../services/auth'
import { logService } from '../services/logService'

const logs = ref<any[]>([])
const loading = ref(true)

onMounted(async () => {
  const { session } = await authService.getSession()
  if (session) {
    const { data } = await logService.getUserLogs(session.user.id)
    if (data) logs.value = data
  }
  loading.value = false
})
</script>

<style scoped>
.log-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 600px;
  margin: 2rem auto;
  text-align: left;
}
.log-item {
  display: flex;
  gap: 1.5rem;
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 8px;
  background: white;
}
.log-date {
  color: #666;
  font-size: 0.9rem;
  min-width: 100px;
}
.notes {
  font-style: italic;
  color: #555;
  margin-top: 0.5rem;
  padding-left: 0.5rem;
  border-left: 2px solid #ddd;
}
.btn-primary {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: bold;
}
</style>

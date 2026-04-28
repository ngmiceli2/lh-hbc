<template>
  <div class="teacher-dashboard">
    <h1>Teacher Dashboard</h1>
    <div v-if="loading">Loading class data...</div>
    <div v-else class="student-grid">
      <div v-for="student in students" :key="student.id" class="student-card">
        <h3>{{ student.full_name }}</h3>
        <div class="stats">
          <p><strong>Total Pages:</strong> {{ calculateTotalPages(student.reading_logs) }}</p>
          <p><strong>Books Started:</strong> {{ countUniqueBooks(student.reading_logs) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { teacherService } from '../services/teacherService'

const students = ref<any[]>([])
const loading = ref(true)

onMounted(async () => {
  const { data } = await teacherService.getStudentsInClass()
  if (data) students.value = data
  loading.value = false
})

function calculateTotalPages(logs: any[]) {
  return logs.reduce((acc, log) => acc + (log.pages_read || 0), 0)
}

function countUniqueBooks(logs: any[]) {
  return new Set(logs.map(log => log.book_id)).size
}
</script>

<style scoped>
.student-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}
.student-card {
  border: 1px solid #ddd;
  padding: 1.5rem;
  border-radius: 10px;
  background: #fff;
  text-align: left;
}
.stats {
  margin-top: 1rem;
  color: #444;
}
</style>

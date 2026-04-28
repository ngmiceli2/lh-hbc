<template>
  <div class="log-entry">
    <h1>Log Your Reading</h1>
    
    <div class="book-preview" v-if="book">
      <img v-if="book.cover_url" :src="book.cover_url" :alt="book.title" class="small-cover" />
      <div class="book-info">
        <h3>{{ book.title }}</h3>
        <p>By {{ book.author }}</p>
      </div>
    </div>

    <form @submit.prevent="handleSubmit" class="log-form">
      <div class="form-group">
        <label for="date">Date</label>
        <input type="date" id="date" v-model="form.date" required />
      </div>
      
      <div class="form-group">
        <label for="pages">Pages Read</label>
        <input type="number" id="pages" v-model.number="form.pages_read" min="1" required />
      </div>

      <div class="form-group">
        <label for="notes">Notes (Optional)</label>
        <textarea id="notes" v-model="form.notes" placeholder="What happened in these pages?"></textarea>
      </div>

      <button type="submit" :disabled="loading" class="btn-primary">
        {{ loading ? 'Saving...' : 'Save Log Entry' }}
      </button>
      
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { authService } from '../services/auth'
import { bookService, BookMetadata } from '../services/bookService'
import { logService } from '../services/logService'

const route = useRoute()
const router = useRouter()
const loading = ref(false)
const error = ref<string | null>(null)

const book = ref<BookMetadata | null>(null)

const form = reactive({
  date: new Date().toISOString().split('T')[0],
  pages_read: 0,
  notes: ''
})

onMounted(() => {
  if (route.query.id) {
    book.value = {
      id: route.query.id as string,
      title: route.query.title as string,
      author: route.query.author as string,
      cover_url: route.query.cover_url as string,
      page_count: route.query.page_count ? parseInt(route.query.page_count as string) : undefined
    }
  } else {
    router.push('/log-book')
  }
})

async function handleSubmit() {
  if (!book.value) return
  
  loading.value = true
  error.value = null

  try {
    const { session } = await authService.getSession()
    if (!session) throw new Error('Not authenticated')

    // 1. Ensure book is in our database
    await bookService.saveBook(book.value)

    // 2. Create log entry
    const { error: logError } = await logService.createLogEntry({
      profile_id: session.user.id,
      book_id: book.value.id,
      date: form.date,
      pages_read: form.pages_read,
      notes: form.notes
    })

    if (logError) throw logError

    router.push('/dashboard')
  } catch (err: any) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.log-form {
  max-width: 500px;
  margin: 2rem auto;
  text-align: left;
}
.book-preview {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 2rem;
}
.small-cover {
  height: 80px;
  width: auto;
}
.form-group {
  margin-bottom: 1.5rem;
}
.form-group label {
  display: block;
  margin-bottom: 0.5rem;
}
.form-group input, .form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}
.form-group textarea {
  height: 100px;
  resize: vertical;
}
.btn-primary {
  width: 100%;
  padding: 1rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
}
.error {
  color: red;
  margin-top: 1rem;
}
</style>

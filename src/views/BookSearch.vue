<template>
  <div class="book-search">
    <h1>Search for a Book</h1>
    <div class="search-box">
      <input 
        type="text" 
        v-model="query" 
        placeholder="Enter book title or author..." 
        @keyup.enter="handleSearch"
      />
      <button @click="handleSearch" :disabled="loading">Search</button>
    </div>

    <div v-if="loading" class="loading">Searching...</div>
    
    <div v-if="books.length" class="results">
      <div v-for="book in books" :key="book.id" class="book-card" @click="selectBook(book)">
        <img v-if="book.cover_url" :src="book.cover_url" :alt="book.title" class="cover" />
        <div class="details">
          <h3>{{ book.title }}</h3>
          <p>By {{ book.author }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { bookService, BookMetadata } from '../services/bookService'

const query = ref('')
const loading = ref(false)
const books = ref<BookMetadata[]>([])
const router = useRouter()

async function handleSearch() {
  if (!query.value) return
  loading.value = true
  try {
    books.value = await bookService.searchBooks(query.value)
  } finally {
    loading.value = false
  }
}

function selectBook(book: BookMetadata) {
  // Pass book data via state or query params to LogEntry view
  router.push({
    name: 'LogEntry',
    query: { 
      id: book.id,
      title: book.title,
      author: book.author,
      cover_url: book.cover_url,
      page_count: book.page_count
    }
  })
}
</script>

<style scoped>
.search-box {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
}
.search-box input {
  flex: 1;
  padding: 0.5rem;
}
.results {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
}
.book-card {
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s;
}
.book-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
.cover {
  width: 100%;
  height: 200px;
  object-fit: contain;
  margin-bottom: 0.5rem;
}
</style>

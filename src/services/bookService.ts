export interface BookMetadata {
  id: string
  title: string
  author: string
  cover_url?: string
  page_count?: number
}

export const bookService = {
  async searchBooks(query: string): Promise<BookMetadata[]> {
    const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=10`)
    const data = await response.json()
    
    return data.docs.map((doc: any) => ({
      id: doc.key.replace('/works/', ''),
      title: doc.title,
      author: doc.author_name ? doc.author_name[0] : 'Unknown Author',
      cover_url: doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg` : undefined,
      page_count: doc.number_of_pages_median || undefined
    }))
  },

  async getBookDetails(id: string): Promise<BookMetadata | null> {
    const response = await fetch(`https://openlibrary.org/works/${id}.json`)
    if (!response.ok) return null
    const data = await response.json()
    
    return {
      id: id,
      title: data.title,
      author: 'Unknown', // Works API doesn't include author name directly, would need another call
      cover_url: data.covers ? `https://covers.openlibrary.org/b/id/${data.covers[0]}-M.jpg` : undefined,
    }
  }
}

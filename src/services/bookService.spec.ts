import { describe, it, expect, vi, beforeEach } from 'vitest'
import { bookService } from './bookService'

describe('BookService', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  it('should fetch and map books from Open Library', async () => {
    const mockResponse = {
      docs: [
        {
          key: '/works/OL123W',
          title: 'The Great Gatsby',
          author_name: ['F. Scott Fitzgerald'],
          cover_i: 12345,
          number_of_pages_median: 180
        }
      ]
    }
    
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    } as any)

    const results = await bookService.searchBooks('Gatsby')

    expect(results).toHaveLength(1)
    expect(results[0]).toEqual({
      id: 'OL123W',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      cover_url: 'https://covers.openlibrary.org/b/id/12345-M.jpg',
      page_count: 180
    })
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('q=Gatsby'))
  })
})

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { logService } from './logService'
import { supabase } from '../lib/supabase'

vi.mock('../lib/supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      insert: vi.fn(() => ({
        select: vi.fn(() => Promise.resolve({ data: [{ id: '1' }], error: null }))
      })),
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          order: vi.fn(() => Promise.resolve({ data: [], error: null }))
        }))
      }))
    }))
  }
}))

describe('LogService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should call createLogEntry with correct parameters', async () => {
    const entry = {
      profile_id: 'user123',
      book_id: 'book456',
      date: '2026-04-28',
      pages_read: 20
    }
    
    const result = await logService.createLogEntry(entry)
    
    expect(supabase.from).toHaveBeenCalledWith('reading_logs')
    expect(result.data).toEqual({ id: '1' })
  })
})

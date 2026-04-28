import { describe, it, expect, vi, beforeEach } from 'vitest'
import { teacherService } from './teacherService'
import { supabase } from '../lib/supabase'

vi.mock('../lib/supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => Promise.resolve({ 
          data: [{ id: '1', full_name: 'Student', reading_logs: [{ pages_read: 50, book_id: 'b1' }] }], 
          error: null 
        }))
      }))
    }))
  }
}))

describe('TeacherService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should fetch students with logs', async () => {
    const result = await teacherService.getStudentsInClass()
    expect(supabase.from).toHaveBeenCalledWith('profiles')
    expect(result.data).toHaveLength(1)
    expect(result.data[0].full_name).toBe('Student')
  })
})

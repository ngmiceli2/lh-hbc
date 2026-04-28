import { supabase } from '../lib/supabase'

export const teacherService = {
  async getStudentsInClass() {
    // For MVP, we'll fetch all students as a mock 'class'
    const { data, error } = await supabase
      .from('profiles')
      .select(`
        id,
        full_name,
        reading_logs (
          pages_read,
          book_id
        )
      `)
      .eq('role', 'student')
    
    return { data, error }
  }
}

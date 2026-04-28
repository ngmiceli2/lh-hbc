import { supabase } from '../lib/supabase'

export interface LogEntry {
  profile_id: string
  book_id: string
  date: string
  pages_read: number
  notes?: string
}

export const logService = {
  async createLogEntry(entry: LogEntry) {
    const { data, error } = await supabase
      .from('reading_logs')
      .insert(entry)
      .select()
    return { data: data ? data[0] : null, error }
  },

  async getUserLogs(profileId: string) {
    const { data, error } = await supabase
      .from('reading_logs')
      .select(`
        *,
        books (*)
      `)
      .eq('profile_id', profileId)
      .order('date', { ascending: false })
    return { data, error }
  }
}

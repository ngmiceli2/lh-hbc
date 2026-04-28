import { describe, it, expect } from 'vitest'
import { supabase } from './supabase'

describe('Supabase Integration', () => {
  it('should export a supabase client', () => {
    expect(supabase).toBeDefined()
    expect(typeof supabase.auth.signInWithPassword).toBe('function')
  })
})

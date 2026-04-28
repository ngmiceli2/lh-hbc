import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

describe('Database Schema', () => {
  it('should have a migration file with the correct tables', () => {
    const migrationPath = path.resolve(__dirname, '../../supabase/migrations/20260428000000_initial_schema.sql')
    const sql = fs.readFileSync(migrationPath, 'utf8')
    
    expect(sql).toContain('CREATE TABLE IF NOT EXISTS public.profiles')
    expect(sql).toContain('CREATE TABLE IF NOT EXISTS public.classes')
    expect(sql).toContain('CREATE TABLE IF NOT EXISTS public.books')
    expect(sql).toContain('CREATE TABLE IF NOT EXISTS public.reading_logs')
  })
})

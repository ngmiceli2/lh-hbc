import { describe, it, expect, vi, beforeEach } from 'vitest'
import { authService } from './auth'
import { supabase } from '../lib/supabase'

vi.mock('../lib/supabase', () => ({
  supabase: {
    auth: {
      signUp: vi.fn(),
      signInWithPassword: vi.fn(),
      signInWithOAuth: vi.fn(),
      signOut: vi.fn(),
      getSession: vi.fn()
    }
  }
}))

describe('AuthService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should call signUp with correct parameters', async () => {
    const mockData = { user: { id: '123' }, session: null }
    vi.mocked(supabase.auth.signUp).mockResolvedValue({ data: mockData, error: null } as any)

    const result = await authService.signUp('test@example.com', 'password', 'Test User', 'student')

    expect(supabase.auth.signUp).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password',
      options: {
        data: {
          full_name: 'Test User',
          role: 'student'
        }
      }
    })
    expect(result.data).toEqual(mockData)
  })

  it('should call signInWithPassword with correct parameters', async () => {
    const mockData = { user: { id: '123' }, session: {} }
    vi.mocked(supabase.auth.signInWithPassword).mockResolvedValue({ data: mockData, error: null } as any)

    const result = await authService.signIn('test@example.com', 'password')

    expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password'
    })
    expect(result.data).toEqual(mockData)
  })

  it('should call signInWithOAuth for Google', async () => {
    vi.mocked(supabase.auth.signInWithOAuth).mockResolvedValue({ data: {}, error: null } as any)
    await authService.signInWithGoogle()
    expect(supabase.auth.signInWithOAuth).toHaveBeenCalledWith({
      provider: 'google',
      options: expect.anything()
    })
  })

  it('should call signInWithOAuth for Facebook', async () => {
    vi.mocked(supabase.auth.signInWithOAuth).mockResolvedValue({ data: {}, error: null } as any)
    await authService.signInWithFacebook()
    expect(supabase.auth.signInWithOAuth).toHaveBeenCalledWith({
      provider: 'facebook',
      options: expect.anything()
    })
  })
})

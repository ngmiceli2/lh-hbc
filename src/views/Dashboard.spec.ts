import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Dashboard from './Dashboard.vue'
import { authService } from '../services/auth'

vi.mock('../services/auth', () => ({
  authService: {
    getSession: vi.fn()
  }
}))

describe('Dashboard.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should display user email when session exists', async () => {
    vi.mocked(authService.getSession).mockResolvedValue({ 
      session: { user: { email: 'test@example.com' } }, 
      error: null 
    } as any)
    
    const wrapper = mount(Dashboard)
    
    // Wait for onMounted
    await new Promise(resolve => setTimeout(resolve, 0))
    
    expect(wrapper.find('p').text()).toContain('Welcome, test@example.com!')
  })
})

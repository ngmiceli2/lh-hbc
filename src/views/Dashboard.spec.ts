import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Dashboard from './Dashboard.vue'
import { authService } from '../services/auth'
import { logService } from '../services/logService'
import { createRouter, createWebHistory } from 'vue-router'

vi.mock('../services/auth', () => ({
  authService: {
    getSession: vi.fn()
  }
}))

vi.mock('../services/logService', () => ({
  logService: {
    getUserLogs: vi.fn(() => Promise.resolve({ data: [], error: null }))
  }
}))

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/log-book', name: 'BookSearch', component: { template: '<div>Search</div>' } }]
})

describe('Dashboard.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should display history when session exists', async () => {
    vi.mocked(authService.getSession).mockResolvedValue({ 
      session: { user: { id: '123', email: 'test@example.com' } }, 
      error: null 
    } as any)
    
    vi.mocked(logService.getUserLogs).mockResolvedValue({
      data: [{ id: '1', date: '2026-04-28', pages_read: 10, books: { title: 'Test Book' } }],
      error: null
    } as any)

    const wrapper = mount(Dashboard, {
      global: {
        plugins: [router]
      }
    })
    
    await new Promise(resolve => setTimeout(resolve, 0))
    
    expect(wrapper.text()).toContain('Your Reading History')
    expect(wrapper.text()).toContain('Test Book')
  })
})

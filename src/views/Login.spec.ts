import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Login from './Login.vue'
import { authService } from '../services/auth'
import { createRouter, createWebHistory } from 'vue-router'

vi.mock('../services/auth', () => ({
  authService: {
    signIn: vi.fn(),
    getSession: vi.fn(() => Promise.resolve({ session: null, error: null }))
  }
}))

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/dashboard', name: 'Dashboard', component: { template: '<div>Dashboard</div>' } }]
})

describe('Login.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should call authService.signIn on form submit', async () => {
    vi.mocked(authService.signIn).mockResolvedValue({ data: {}, error: null } as any)
    const wrapper = mount(Login, {
      global: {
        plugins: [router]
      }
    })

    await wrapper.find('#email').setValue('test@example.com')
    await wrapper.find('#password').setValue('password')
    await wrapper.find('form').trigger('submit.prevent')

    expect(authService.signIn).toHaveBeenCalledWith('test@example.com', 'password')
  })
})

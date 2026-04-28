import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Signup from './Signup.vue'
import { authService } from '../services/auth'
import { createRouter, createWebHistory } from 'vue-router'

vi.mock('../services/auth', () => ({
  authService: {
    signUp: vi.fn(),
    getSession: vi.fn(() => Promise.resolve({ session: null, error: null }))
  }
}))

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login', name: 'Login', component: { template: '<div>Login</div>' } }
  ]
})

describe('Signup.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.stubGlobal('alert', vi.fn())
  })

  it('should call authService.signUp on form submit', async () => {
    vi.mocked(authService.signUp).mockResolvedValue({ data: {}, error: null } as any)
    const wrapper = mount(Signup, {
      global: {
        plugins: [router]
      }
    })

    await wrapper.find('#fullName').setValue('Test User')
    await wrapper.find('#email').setValue('test@example.com')
    await wrapper.find('#password').setValue('password')
    await wrapper.find('#role').setValue('student')
    await wrapper.find('form').trigger('submit.prevent')

    expect(authService.signUp).toHaveBeenCalledWith('test@example.com', 'password', 'Test User', 'student')
  })
})

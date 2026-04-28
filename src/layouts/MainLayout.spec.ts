import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import MainLayout from './MainLayout.vue'
import { authService } from '../services/auth'
import { createRouter, createWebHistory } from 'vue-router'

vi.mock('../services/auth', () => ({
  authService: {
    signOut: vi.fn(),
    getSession: vi.fn(() => Promise.resolve({ 
      session: { user: { user_metadata: { role: 'student' } } }, 
      error: null 
    }))
  }
}))

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/dashboard', name: 'Dashboard', component: { template: '<div>Dashboard</div>' } },
    { path: '/login', name: 'Login', component: { template: '<div>Login</div>' } }
  ]
})

describe('MainLayout.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render brand and navigation links', async () => {
    const wrapper = mount(MainLayout, {
      global: {
        plugins: [router]
      }
    })

    expect(wrapper.find('.nav-brand').text()).toBe('Bookclub Manager')
    expect(wrapper.find('.nav-links').exists()).toBe(true)
  })

  it('should call authService.signOut on button click', async () => {
    const wrapper = mount(MainLayout, {
      global: {
        plugins: [router]
      }
    })

    await wrapper.find('button').trigger('click')
    expect(authService.signOut).toHaveBeenCalled()
  })
})

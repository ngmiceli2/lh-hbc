import { createRouter, createWebHistory } from 'vue-router'
import { authService } from '../services/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import('../views/Signup.vue')
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('../views/Dashboard.vue'),
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach(async (to, _from, next) => {
  if (to.meta.requiresAuth) {
    const { session } = await authService.getSession()
    if (!session) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router

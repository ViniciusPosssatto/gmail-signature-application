import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
import { useGoogle } from '@/stores/google'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: LoginPage,
    },
    {
      path: '/application',
      name: 'ApplicationPage',
      component: () => import('../views/ApplicationPage.vue'),
    },
  ],
})
router.beforeEach((to, from, next) => {
  const googleStore = useGoogle()
  if (to.path !== '/login' && !googleStore.googleUser) {
    next('/login')
  } else {
    next()
  }
})

export default router

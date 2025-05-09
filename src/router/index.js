import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/views/LoginPage.vue'
import ApplicationPage from '@/views/ApplicationPage.vue'
import LoadingRedirect from '@/components/LoadingRedirect.vue'
import LoginLoading from '@/components/LoginLoading.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    props: true,
  },
  {
    path: '/application',
    name: 'ApplicationPage',
    component: ApplicationPage,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/login-loading',
    name: 'LoginLoading',
    component: LoginLoading,
  },
  {
    path: '/loading-redirect',
    name: 'LoadingRedirect',
    component: LoadingRedirect,
  },
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: { name: 'LoadingRedirect' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const token = localStorage.getItem('authToken')

  if (requiresAuth && !token) {
    next({ name: 'LoadingRedirect' })
  } else if (to.name === 'Login' && token) {
    next({ name: 'ApplicationPage' })
  } else {
    next()
  }
})

export default router

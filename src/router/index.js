import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/views/LoginPage.vue'
import ApplicationPage from '@/views/ApplicationPage.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    props: true,
  },
  {
    path: '/application/:token?',
    name: 'ApplicationPage',
    component: ApplicationPage,
    props: true,
  },
  {
    path: '/',
    redirect: '/login',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  next()
})

export default router

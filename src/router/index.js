import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
// import { useGoogle } from '@/stores/google'

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

// router.beforeEach((to, from, next) => {
//   const user = useGoogle()
//   const { googleUser } = user
//   if (to.path !== '/' || !googleUser.email) {
//     next('/')
//   } else {
//     next()
//   }
// })

export default router

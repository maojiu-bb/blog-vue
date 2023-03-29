import { createRouter, createWebHistory } from 'vue-router'

import routes from './routes'
import guardPath from './guardPath'

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (router.hasRoute(to.name!)) {
    if (guardPath.indexOf(to.path) !== -1) {
      if (token) {
        next()
      } else {
        next({ path: '/login' })
      }
    } else {
      next()
    }
  } else {
    next({ path: '/404NotFound' })
  }
})

export default router

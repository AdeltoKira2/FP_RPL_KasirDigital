import { createRouter, createWebHashHistory } from 'vue-router'
import { getUserState } from '../firebase'

import DefaultLayout from '@/layouts/DefaultLayout'

const routes = [
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register'),
    meta: { requiresUnauth: true },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login'),
    meta: { requiresUnauth: true },
  },
  {
    path: '/',
    name: 'Home',
    component: DefaultLayout,
    redirect: '/dashboard',
    meta: { requiresAuth: true },
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/manajemen',
        name: 'Manajemen',
        component: () => import('@/views/Manajemen.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/transaksi',
        name: 'Transaksi',
        component: () => import('@/views/Transaksi.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const requiresUnauth = to.matched.some((record) => record.meta.requiresUnauth)

  const isAuth = await getUserState()

  if (requiresAuth && !isAuth) next('/login')
  else if (requiresUnauth && isAuth) next('/')
  else next()
})

export default router

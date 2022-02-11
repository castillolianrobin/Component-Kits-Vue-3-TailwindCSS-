import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login/Login.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "Dashboard" */ '../views/Dashboard/Dashboard.vue')
  },
  {
    path: '/sandbox',
    name: 'Sandbox',
    component: () => import(/* webpackChunkName: "Sandbox" */ '../views/Sandbox.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import { authenticatedMetaKey, routeGuard } from './middleware/authGuard'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login/Login.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "Dashboard" */ '../views/Dashboard/Dashboard.vue'),
    meta: { [authenticatedMetaKey]:true }
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import(/* webpackChunkName: "Users" */ '../views/Users/Users.vue'),
    meta: { [authenticatedMetaKey]:true }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import(/* webpackChunkName: "Settings" */ '../views/Settings/Settings.vue'),
    meta: { [authenticatedMetaKey]:true }
  },


  {
    path: '/sandbox',
    name: 'Sandbox',
    component: () => import(/* webpackChunkName: "Sandbox" */ '../views/Sandbox.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  // beforeEach: routeGuard,
})

router.beforeEach(routeGuard);


export default router;

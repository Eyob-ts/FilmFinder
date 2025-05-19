import { createRouter, createWebHistory } from 'vue-router';
import Register from '../pages/auth/Register.vue';
import Login from '../pages/auth/Login.vue';

const routes = [
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
    {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresGuest: true }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
// router.beforeEach((to, from, next) => {
//   const authStore = useAuthStore()
  
//   if (to.meta.requiresAuth && !authStore.isAuthenticated) {
//     next('/login')
//   } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
//     next('/dashboard')
//   } else {
//     next()
//   }
// })

export default router;
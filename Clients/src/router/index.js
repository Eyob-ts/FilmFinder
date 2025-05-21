import { createRouter, createWebHistory } from 'vue-router';
import Register from '../pages/auth/Register.vue';
import Login from '../pages/auth/Login.vue';
import SearchPage from '../pages/movies/SearchPage.vue';
import NotFound from '../pages/NotFound.vue';
import { useAuthStore } from '../store/auth.store';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: { requiresGuest: true }
  },
  {
    path: '/search',
    name: 'Search',
    component: SearchPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { requiresGuest: true }
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  
  // Check if route requires authentication
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/');
    return;
  }
  
  // Check if route requires guest (not authenticated)
  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next('/search');
    return;
  }
  
  next();
});

export default router;
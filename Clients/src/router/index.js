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

const setupRouterGuard = (router) => {
  router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore();
    
    // Set auth header if token exists
    if (authStore.token) {
      authStore.setAuthHeader();
    }
    
    // Check if route requires authentication
    if (to.meta.requiresAuth) {
      if (!authStore.isAuthenticated) {
        next('/');
        return;
      }
      next();
      return;
    }
    
    // Check if route requires guest (not authenticated)
    if (to.meta.requiresGuest) {
      if (authStore.isAuthenticated) {
        next('/search');
        return;
      }
      next();
      return;
    }
    
    next();
  });
};

setupRouterGuard(router);

export default router;
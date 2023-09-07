import { useUserStore } from '@/stores/user';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home/HomeView.vue'),
      beforeEnter: async (_, __, next) => {
        const userStore = useUserStore();
        const isUserLoggedIn = !!(await userStore.getUser());

        if (!isUserLoggedIn) next();
        else next({ name: 'dashboard' });

        //TODO: Fix the Vue warning: "Invalid vnode type when creating vnode: undefined. "
      },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue'),
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: () => import('@/views/PrivacyView.vue'),
    },
    {
      path: '/terms',
      name: 'terms',
      component: () => import('@/views/TermsView.vue'),
    },
    {
      path: '/faq',
      name: 'faq',
      component: () => import('@/views/FaqView.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/DashboardView.vue'),
      beforeEnter: async (_, __, next) => {
        const userStore = useUserStore();
        const isUserLoggedIn = !!(await userStore.getUser());

        if (isUserLoggedIn) next();
        else next({ name: 'home' });
      },
    },
  ],
});

export default router;

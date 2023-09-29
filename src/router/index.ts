import { useUserStore } from '@/stores/user';
import { createRouter, createWebHistory, type NavigationGuardNext } from 'vue-router';

interface IValidateUserProps {
  next: NavigationGuardNext;
  fallbackRoute: string;
  mustBeLoggedIn: boolean;
}

const validateUser = async ({ next, fallbackRoute, mustBeLoggedIn }: IValidateUserProps) => {
  const userStore = useUserStore();
  const isUserLoggedIn = !!(await userStore.getUser());

  if (mustBeLoggedIn && !isUserLoggedIn) next({ name: fallbackRoute });
  else if (!mustBeLoggedIn && isUserLoggedIn) next({ name: fallbackRoute });
  else next();
};

// TODO: Add Not Found view

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ top: 0, left: 0 }), // Scroll to the top every time the route changes
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/Home/HomeView.vue'),
      beforeEnter: async (_, __, next) => {
        await validateUser({ next, fallbackRoute: 'Dashboard', mustBeLoggedIn: false });

        //TODO: Fix the Vue warning: "Invalid vnode type when creating vnode: undefined. "
      },
    },
    {
      path: '/auth/:form',
      name: 'Auth',
      component: () => import('@/views/Auth/AuthView.vue'),
      beforeEnter: async (_, __, next) => {
        // Only allow access if the form is "login" or "register"
        if (!['login', 'register'].includes(_.params.form as string)) {
          return next({ name: 'Home' });
        }

        await validateUser({ next, fallbackRoute: 'Dashboard', mustBeLoggedIn: false });
      },
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('@/views/AboutView.vue'),
    },
    {
      path: '/privacy',
      name: 'Privacy',
      component: () => import('@/views/PrivacyView.vue'),
    },
    {
      path: '/terms',
      name: 'Terms',
      component: () => import('@/views/TermsView.vue'),
    },
    {
      path: '/faq',
      name: 'Faq',
      component: () => import('@/views/FaqView.vue'),
    },
    {
      path: '/get-help',
      name: 'GetHelp',
      component: () => import('@/views/GetHelpView.vue'),
    },

    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('@/views/DashboardView.vue'),
      beforeEnter: async (_, __, next) => {
        await validateUser({ next, fallbackRoute: 'Home', mustBeLoggedIn: true });
      },
    },
    {
      path: '/calendar/:year',
      name: 'Calendar',
      component: () => import('@/views/CalendarView.vue'),
      beforeEnter: async (_, __, next) => {
        await validateUser({ next, fallbackRoute: 'Home', mustBeLoggedIn: true });
      },
    },
    {
      path: '/add-expense',
      name: 'AddExpense',
      component: () => import('@/views/AddExpenseView.vue'),
      beforeEnter: async (_, __, next) => {
        await validateUser({ next, fallbackRoute: 'Home', mustBeLoggedIn: true });
      },
    },
    {
      path: '/categories',
      name: 'Categories',
      component: () => import('@/views/ManageCategoriesView.vue'),
      beforeEnter: async (_, __, next) => {
        await validateUser({ next, fallbackRoute: 'Home', mustBeLoggedIn: true });
      },
    },
    {
      path: '/years',
      name: 'Years',
      component: () => import('@/views/YearsView.vue'),
      beforeEnter: async (_, __, next) => {
        await validateUser({ next, fallbackRoute: 'Home', mustBeLoggedIn: true });
      },
    },
    {
      path: '/settings',
      name: 'Settings',
      component: () => import('@/views/SettingsView.vue'),
      beforeEnter: async (_, __, next) => {
        await validateUser({ next, fallbackRoute: 'Home', mustBeLoggedIn: true });
      },
    },
  ],
});

export default router;

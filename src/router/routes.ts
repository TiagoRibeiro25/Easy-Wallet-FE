import { useUserStore } from '@/stores/user';
import type { NavigationGuardNext, RouteRecordRaw } from 'vue-router';

interface IValidateUserProps {
  next: NavigationGuardNext;
  fallbackRoute: string;
  mustBeLoggedIn: boolean;
}

const validateUser = ({ next, fallbackRoute, mustBeLoggedIn }: IValidateUserProps) => {
  const userStore = useUserStore();
  const isUserLoggedIn = userStore.isUserLoggedIn();

  if (mustBeLoggedIn && !isUserLoggedIn) next({ name: fallbackRoute });
  else if (!mustBeLoggedIn && isUserLoggedIn) next({ name: fallbackRoute });
  else next();
};

const routes: readonly RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home/HomeView.vue'),
    beforeEnter: async (_, __, next) => {
      validateUser({ next, fallbackRoute: 'Dashboard', mustBeLoggedIn: false });
    },
  },
  {
    path: '/auth/',
    name: 'Auth',
    component: () => import('@/views/Auth/AuthView.vue'),
    beforeEnter: async (_, __, next) => {
      validateUser({ next, fallbackRoute: 'Dashboard', mustBeLoggedIn: false });
    },
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/Auth/_components/LoginForm.vue'),
        beforeEnter: async (_, __, next) => {
          validateUser({ next, fallbackRoute: 'Dashboard', mustBeLoggedIn: false });
        },
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/Auth/_components/RegisterForm.vue'),
        beforeEnter: async (_, __, next) => {
          validateUser({ next, fallbackRoute: 'Dashboard', mustBeLoggedIn: false });
        },
      },
    ],
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
      validateUser({ next, fallbackRoute: 'Home', mustBeLoggedIn: true });
    },
  },
  {
    path: '/calendar/:year',
    name: 'Calendar',
    component: () => import('@/views/CalendarView.vue'),
    beforeEnter: async (_, __, next) => {
      validateUser({ next, fallbackRoute: 'Home', mustBeLoggedIn: true });
    },
  },
  {
    path: '/add-expense',
    name: 'AddExpense',
    component: () => import('@/views/AddExpenseView.vue'),
    beforeEnter: async (_, __, next) => {
      validateUser({ next, fallbackRoute: 'Home', mustBeLoggedIn: true });
    },
  },
  {
    path: '/categories',
    name: 'Categories',
    component: () => import('@/views/ManageCategoriesView.vue'),
    beforeEnter: async (_, __, next) => {
      validateUser({ next, fallbackRoute: 'Home', mustBeLoggedIn: true });
    },
  },
  {
    path: '/years',
    name: 'Years',
    component: () => import('@/views/YearsView.vue'),
    beforeEnter: async (_, __, next) => {
      validateUser({ next, fallbackRoute: 'Home', mustBeLoggedIn: true });
    },
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('@/views/SettingsView.vue'),
    beforeEnter: async (_, __, next) => {
      validateUser({ next, fallbackRoute: 'Home', mustBeLoggedIn: true });
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundView.vue'),
  },
];

export default routes;

import { useUserStore } from '@/stores/user';
import { type NavigationGuardNext, type RouteRecordRaw } from 'vue-router';

interface IValidateUserProps {
  next: NavigationGuardNext;
  fallbackRoute: string;
  mustBeLoggedIn: boolean;
}

/**
 * Validates if a user is logged in and redirects to a fallback route if necessary.
 * @param {IValidateUserProps} props - The properties for validating the user.
 * @param {Function} props.next - The function to call to proceed to the next route.
 * @param {string} props.fallbackRoute - The name of the fallback route to redirect to if the user is not logged in.
 * @param {boolean} props.mustBeLoggedIn - A flag indicating if the user must be logged in to proceed.
 */
const validateUser = ({ next, fallbackRoute, mustBeLoggedIn }: IValidateUserProps) => {
  const userStore = useUserStore();
  const isUserLoggedIn = userStore.isUserLoggedIn();

  if ((mustBeLoggedIn && !isUserLoggedIn) || (!mustBeLoggedIn && isUserLoggedIn)) {
    next({ name: fallbackRoute });
  } else {
    next();
  }
};

let didLoadNotLoggedInViews = false;
let didLoadLoggedInViews = false;

const loadNotLoggedInViews = () => {
  if (didLoadNotLoggedInViews) {
    return;
  }

  didLoadNotLoggedInViews = true;

  import('@/views/Home/HomeView.vue');
  import('@/views/Auth/AuthView.vue');
  import('@/views/Auth/_components/LoginForm.vue');
  import('@/views/Auth/_components/RegisterForm.vue');
  import('@/views/Auth/_components/ChangePasswordForm.vue');
  import('@/views/Auth/_components/VerifyUser.vue');
  import('@/views/AboutView.vue');
  import('@/views/PrivacyView.vue');
  import('@/views/TermsView.vue');
  import('@/views/FaqView.vue');
};

const loadLoggedInViews = () => {
  if (didLoadLoggedInViews) {
    return;
  }

  didLoadLoggedInViews = true;

  import('@/views/DashboardView.vue');
  import('@/views/CalendarView.vue');
  import('@/views/AddExpenseView.vue');
  import('@/views/ManageCategories/ManageCategoriesView.vue');
  import('@/views/YearsView.vue');
  import('@/views/SettingsView.vue');
  import('@/views/ManageCategories/_components/ManageCategory.vue');
  import('@/views/ManageCategories/_components/AddCategory.vue');
};

/**
 * An array of RouteRecordRaw objects that define the routes for the application.
 * Each object contains a path, name, and component property, and may also include
 * a beforeEnter property that defines a function to be called before the route is
 * entered. The array also includes child routes for the Auth route.
 *
 * @type {readonly RouteRecordRaw[]}
 */
const routes: readonly RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home/HomeView.vue'),
    beforeEnter: (_to, _from, next) => {
      validateUser({ next, fallbackRoute: 'Dashboard', mustBeLoggedIn: false });
      loadNotLoggedInViews();
    },
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('@/views/Auth/AuthView.vue'),
    beforeEnter: (_to, _from, next) => {
      validateUser({ next, fallbackRoute: 'Dashboard', mustBeLoggedIn: false });
      loadNotLoggedInViews();
    },
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/Auth/_components/LoginForm.vue'),
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/Auth/_components/RegisterForm.vue'),
      },
      {
        path: 'change-password/:token',
        name: 'ChangePassword',
        component: () => import('@/views/Auth/_components/ChangePasswordForm.vue'),
      },
      {
        path: 'verify-user/:token',
        name: 'VerifyUser',
        component: () => import('@/views/Auth/_components/VerifyUser.vue'),
      },
    ],
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/AboutView.vue'),
    beforeEnter: () => loadNotLoggedInViews(),
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: () => import('@/views/PrivacyView.vue'),
    beforeEnter: () => loadNotLoggedInViews(),
  },
  {
    path: '/terms',
    name: 'Terms',
    component: () => import('@/views/TermsView.vue'),
    beforeEnter: () => loadNotLoggedInViews(),
  },
  {
    path: '/faq',
    name: 'Faq',
    component: () => import('@/views/FaqView.vue'),
    beforeEnter: () => loadNotLoggedInViews(),
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
    beforeEnter: (_to, _from, next) => {
      validateUser({ next, fallbackRoute: 'Home', mustBeLoggedIn: true });
      loadLoggedInViews();
    },
  },
  {
    path: '/calendar/:year',
    name: 'Calendar',
    component: () => import('@/views/CalendarView.vue'),
    beforeEnter: (_to, _from, next) => {
      validateUser({ next, fallbackRoute: 'Home', mustBeLoggedIn: true });
      loadLoggedInViews();
    },
  },
  {
    path: '/add-expense',
    name: 'AddExpense',
    component: () => import('@/views/AddExpenseView.vue'),
    beforeEnter: (_to, _from, next) => {
      validateUser({ next, fallbackRoute: 'Home', mustBeLoggedIn: true });
      loadLoggedInViews();
    },
  },
  {
    path: '/categories',
    name: 'Categories',
    component: () => import('@/views/ManageCategories/ManageCategoriesView.vue'),
    beforeEnter: (_to, _from, next) => {
      validateUser({ next, fallbackRoute: 'Home', mustBeLoggedIn: true });
      loadLoggedInViews();
    },
    children: [
      {
        path: ':id',
        name: 'Categories-Category',
        component: () => import('@/views/ManageCategories/_components/ManageCategory.vue'),
      },
      {
        path: 'add',
        name: 'Categories-AddCategory',
        component: () => import('@/views/ManageCategories/_components/AddCategory.vue'),
      },
    ],
  },
  {
    path: '/years',
    name: 'Years',
    component: () => import('@/views/YearsView.vue'),
    beforeEnter: (_to, _from, next) => {
      validateUser({ next, fallbackRoute: 'Home', mustBeLoggedIn: true });
      loadLoggedInViews();
    },
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('@/views/SettingsView.vue'),
    beforeEnter: (_to, _from, next) => {
      validateUser({ next, fallbackRoute: 'Home', mustBeLoggedIn: true });
      loadLoggedInViews();
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundView.vue'),
  },
];

export default routes;

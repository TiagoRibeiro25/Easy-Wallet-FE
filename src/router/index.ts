import { useUserStore } from '@/stores/user';
import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ top: 0, left: 0 }), // Scroll to the top every time the route changes
  routes,
});

router.beforeEach(async (_, __, next) => {
  const userStore = useUserStore();

  if (!userStore.didFetchFirstTime()) {
    await userStore.getUser();
    userStore.updateFetchedFirstTime();
  }

  return next();
});

export default router;

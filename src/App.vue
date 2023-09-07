<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import FooterLayout from './components/FooterLayout.vue';
import NavbarLayout from './components/NavbarLayout/NavbarLayout.vue';
import TopNavigation from './components/TopNavigation.vue';
import { useUserStore } from './stores/user';
import LoadingFallback from './views/LoadingFallback.vue';

const userStore = useUserStore();
const isUserLogged = ref(false);

onBeforeMount(async () => {
  isUserLogged.value = !!(await userStore.getUser());
});
</script>

<template>
  <div class="flex" :class="{ 'flex-col': !isUserLogged, 'flex-row': isUserLogged }">
    <NavbarLayout />

    <main
      class="flex flex-col w-full h-screen wrapper"
      :class="{ 'w-full pt-28': !isUserLogged, 'overflow-y-auto': isUserLogged }"
    >
      <TopNavigation v-if="isUserLogged" />

      <div
        class="flex-col flex-grow w-full max-w-screen-xl px-4 mx-auto"
        :class="{ 'pt-28 pb-16': isUserLogged }"
      >
        <Suspense>
          <RouterView />

          <template #fallback>
            <LoadingFallback />
          </template>
        </Suspense>
      </div>
      <FooterLayout />
    </main>
  </div>
</template>

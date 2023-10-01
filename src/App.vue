<script setup lang="ts">
import { useDark } from '@vueuse/core';
import { onBeforeMount, ref, watchEffect } from 'vue';
import FooterLayout from './components/FooterLayout.vue';
import LoadingOverlay from './components/LoadingOverlay.vue';
import NavbarLayout from './components/NavbarLayout/NavbarLayout.vue';
import NotificationsLayout from './components/NotificationsLayout.vue';
import TopNavigation from './components/TopNavigation.vue';
import { isUserOnDesktop } from './lib/utils';
import { useUserStore } from './stores/user';

const userStore = useUserStore();
const isLoading = ref<boolean>(true);
const errorOnLoading = ref<boolean>(false);
const isUserLogged = ref<boolean>(false);

onBeforeMount(() => {
  useDark(); // Add the dark class to the body (if the user has dark mode enabled)
});

/**
 * Watches for changes in the user store and updates the UI accordingly.
 * If the server hasn't responded yet, the loading overlay will be shown.
 */
watchEffect(() => {
  if (!userStore.didFetchFirstTime()) {
    return;
  }

  isUserLogged.value = userStore.isUserLoggedIn();
  isLoading.value = false;
  errorOnLoading.value = userStore.didErrorOccur();
});
</script>

<template>
  <LoadingOverlay
    v-if="isLoading || errorOnLoading"
    class="wrapper"
    :status="errorOnLoading ? 'error' : 'loading'"
  />

  <div v-else class="flex flex-col" :class="{ 'sm:flex-row': isUserLogged }">
    <NavbarLayout :is-user-logged="isUserLogged" />

    <main
      class="flex flex-col w-full h-screen wrapper"
      :class="{ 'w-full pt-28': !isUserLogged, 'overflow-y-auto': isUserLogged }"
    >
      <TopNavigation
        v-if="isUserLogged"
        class="hidden"
        :class="{ 'sm:block': isUserOnDesktop() }"
      />

      <div
        class="flex-col flex-grow w-full max-w-screen-xl px-4 mx-auto"
        :class="{
          'pt-44 pb-16': isUserLogged,
          'sm:pt-28': isUserLogged && isUserOnDesktop(),
        }"
      >
        <Suspense>
          <Transition name="main-content">
            <RouterView />
          </Transition>

          <!-- TODO: Fix fallback not triggering when lazy loading the current view -->
          <template #fallback>
            <LoadingFallback />
          </template>
        </Suspense>
      </div>
      <FooterLayout />
      <NotificationsLayout />
    </main>
  </div>
</template>

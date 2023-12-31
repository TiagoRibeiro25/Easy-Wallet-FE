<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import FooterLayout from './components/FooterLayout.vue';
import LoadingOverlay from './components/LoadingOverlay.vue';
import NavbarLayout from './components/NavbarLayout/NavbarLayout.vue';
import NotificationsLayout from './components/NotificationsLayout.vue';
import TopNavigation from './components/TopNavigation.vue';
import { isUserOnDesktop } from './lib/utils';
import { useUserStore } from './stores/user';
import LoadingFallback from './views/LoadingFallback.vue';

const userStore = useUserStore();
const isLoading = ref<boolean>(true);
const errorOnLoading = ref<boolean>(false);
const isUserLogged = ref<boolean>(false);

/**
 * Watches for changes in the user store and updates the UI accordingly.
 * If the server hasn't responded yet, the loading overlay will be shown.
 */
watchEffect(() => {
  isLoading.value = true;
  errorOnLoading.value = false;

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
      :class="isUserLogged ? 'overflow-y-auto' : 'w-full pt-28'"
    >
      <TopNavigation
        v-if="isUserLogged"
        class="hidden"
        :class="{ 'sm:block': isUserOnDesktop() }"
      />

      <div
        class="flex-col flex-grow w-full max-w-screen-xl px-4 mx-auto"
        :class="{ 'pt-44 pb-16': isUserLogged, 'sm:pt-28': isUserLogged && isUserOnDesktop() }"
      >
        <Suspense>
          <Transition name="main-content">
            <RouterView />
          </Transition>

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

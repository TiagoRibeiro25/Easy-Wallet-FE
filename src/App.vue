<script setup lang="ts">
import FooterLayout from './components/FooterLayout.vue';
import NavBar from './components/Navbar/NavBar.vue';
import LoadingFallback from './views/LoadingFallback.vue';
</script>

<template>
  <header>
    <NavBar />
  </header>

  <main class="max-w-screen-xl min-h-[calc(100vh-56px)] mx-auto grow h-fit pt-28 px-4">
    <Suspense>
      <RouterView />

      <template #fallback>
        <LoadingFallback />
      </template>
    </Suspense>
  </main>
  <FooterLayout />
</template>

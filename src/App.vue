<script setup lang="ts">
import { RouterView } from 'vue-router';
import FooterLayout from './components/FooterLayout.vue';
import NavBar from './components/Navbar/NavBar.vue';
</script>

<template>
  <header>
    <NavBar />
  </header>

  <main class="max-w-screen-xl min-h-[calc(100vh-56px)] mx-auto grow h-fit pt-28">
    <RouterView />
  </main>
  <FooterLayout />
</template>

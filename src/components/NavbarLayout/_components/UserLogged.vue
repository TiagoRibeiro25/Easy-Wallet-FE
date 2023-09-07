<script setup lang="ts">
import Logo from '@/assets/logo.png';
import { RouterLink } from 'vue-router';

const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
</script>

<template>
  <nav
    class="w-[250px] dark:bg-secondaryColor min-h-screen h-full flex justify-center items-start p-3"
  >
    <RouterLink :to="{ name: 'home' }" class="flex flex-row" @click="scrollTop()">
      <img :src="Logo" alt="Easy Wallet" width="32" height="32" />
      <span class="self-center mt-1 ml-2 text-2xl whitespace-nowrap hover:text-quaternaryColor">
        Easy Wallet
      </span>
    </RouterLink>
  </nav>
</template>

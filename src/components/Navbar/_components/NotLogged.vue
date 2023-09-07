<script setup lang="ts">
import Logo from '@/assets/logo.png';
import SignInButton from '@/components/SignInButton.vue';
import ThemeButton from '@/components/ThemeSwitcher/ThemeButton.vue';
import { RouterLink } from 'vue-router';
</script>

<template>
  <nav class="fixed top-0 z-50 w-full backdrop-filter backdrop-blur-lg">
    <div class="flex flex-wrap items-center justify-between max-w-screen-xl px-4 py-3 mx-auto">
      <RouterLink to="/" class="flex flex-row">
        <img :src="Logo" alt="Easy Wallet" width="32" height="32" />
        <span class="self-center mt-1 ml-2 text-2xl whitespace-nowrap hover:text-quaternaryColor">
          Easy Wallet
        </span>
      </RouterLink>

      <div className="relative flex items-center">
        <ThemeButton />
        <SignInButton class="ml-3" />
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import Logo from '@/assets/logo.png';
import { RouterLink } from 'vue-router';
</script>

<template>
  <footer class="dark:bg-quinaryColor">
    <div
      class="flex flex-col flex-wrap justify-between max-w-screen-xl px-6 py-6 mx-auto lg:px-4 lg:py-3 lg:items-center lg:flex-row"
    >
      <div class="flex flex-col lg:text-lg lg:flex-row lg:items-center">
        <img :src="Logo" alt="Easy Wallet" width="32" height="32" class="mr-3" />
        <div class="flex flex-col my-3 space-y-3 lg:my-0 lg:space-y-0 lg:flex-row">
          <span>
            Built by
            <a
              href="https://github.com/TiagoRibeiro25"
              target="_blank"
              rel="noopener noreferrer"
              class="mx-1 text-quaternaryColor hover:underline"
            >
              Tiago Ribeiro.
            </a>
          </span>
          <span>
            The source code is available on
            <a
              href="https://github.com/TiagoRibeiro25/Easy-Wallet-FE"
              target="_blank"
              rel="noopener noreferrer"
              class="mx-1 text-quaternaryColor hover:underline"
            >
              Github.
            </a>
          </span>
        </div>
      </div>

      <div class="relative flex items-center lg:mt-0">
        <RouterLink to="/privacy" class="hover:underline"> Privacy </RouterLink>
        <RouterLink to="/terms" class="ml-6 hover:underline"> Terms </RouterLink>
        <RouterLink to="/about" class="ml-6 hover:underline"> About </RouterLink>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core';
import ThemeIcon from '../Icons/theme-icon.vue';

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<template>
  <button
    class="flex items-center justify-center p-2 transition-all duration-200 ease-in-out border rounded-lg focus:outline-none border-septenaryColor dark:border-tertiaryColor dark:hover:bg-tertiaryColor hover:bg-septenaryColor"
    @click="toggleDark()"
  >
    <ThemeIcon :theme="isDark ? 'dark' : 'light'" class="w-5 h-5" />
  </button>
</template>

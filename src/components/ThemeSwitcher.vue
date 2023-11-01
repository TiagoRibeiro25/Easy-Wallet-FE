<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core';
import ThemeIcon from './Icons/theme-icon.vue';

interface IProps {
  showText?: boolean;
}

const props = defineProps<IProps>();

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<template>
  <button
    class="flex items-center p-2 transition-all duration-200 ease-in-out border rounded-lg focus:outline-none border-septenaryColor dark:border-tertiaryColor dark:hover:bg-tertiaryColor hover:bg-septenaryColor bg-senaryColor dark:bg-primaryColor"
    @click="toggleDark()"
  >
    <ThemeIcon :theme="isDark ? 'dark' : 'light'" class="w-5 h-5" />
    <span v-if="props.showText" class="ml-2 font-medium">{{ isDark ? 'Dark' : 'Light' }}</span>
  </button>
</template>

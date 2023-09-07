<script setup lang="ts">
import GithubIcon from './Icons/github-icon.vue';
</script>

<template>
  <button
    class="flex items-center justify-center h-[38px] sm:px-4 px-2 border rounded-lg focus:outline-none border-septenaryColor dark:border-tertiaryColor dark:hover:bg-tertiaryColor hover:bg-septenaryColor"
  >
    <GithubIcon class="w-5 h-5 sm:mr-2" />
    <span class="hidden sm:block"> Sign In </span>
  </button>
</template>

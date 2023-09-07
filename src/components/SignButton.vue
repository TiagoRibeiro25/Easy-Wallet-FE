<script setup lang="ts">
import GithubIcon from './Icons/github-icon.vue';

const props = defineProps({
  text: { type: String, required: false, default: 'Sign In' },
  hideTextOnMobile: { type: Boolean, required: false, default: false },
});
</script>

<template>
  <button
    class="flex items-center justify-center h-[38px] sm:px-4 px-2 border rounded-lg focus:outline-none border-septenaryColor dark:border-tertiaryColor dark:hover:bg-tertiaryColor hover:bg-septenaryColor space-x-2"
  >
    <GithubIcon class="w-5 h-5" />
    <span :class="{ 'hidden sm:block': props.hideTextOnMobile }"> {{ props.text }} </span>
  </button>
</template>

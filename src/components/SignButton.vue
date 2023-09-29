<script setup lang="ts">
import AuthIcon from './Icons/auth-icon.vue';

interface IProps {
  text?: string;
  hideTextOnMobile?: boolean;
  form?: 'login' | 'register';
}

const props = defineProps<IProps>();
</script>

<template>
  <RouterLink
    :to="{ name: 'Auth', params: { form: props.form || 'login' } }"
    class="flex items-center justify-center sm:h-[38px] h-[34px] sm:px-4 px-2 border rounded-lg focus:outline-none border-septenaryColor dark:border-tertiaryColor dark:hover:bg-tertiaryColor hover:bg-septenaryColor space-x-2"
    :class="{ 'sm:w-auto w-[34px]': props.hideTextOnMobile }"
  >
    <AuthIcon class="w-4 h-4" />
    <span :class="{ 'hidden sm:block': props.hideTextOnMobile }">
      {{ props.text || 'Sign In' }}
    </span>
  </RouterLink>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
import GithubIcon from './Icons/github-icon.vue';

interface IProps {
  text?: string;
  hideTextOnMobile?: boolean;
}

const props = defineProps<IProps>();
const userStore = useUserStore();
const router = useRouter();

const handleClick = async () => {
  userStore.updateUser();
  router.push({ name: 'Dashboard' });
};
</script>

<template>
  <button
    class="flex items-center justify-center h-[38px] sm:px-4 px-2 border rounded-lg focus:outline-none border-septenaryColor dark:border-tertiaryColor dark:hover:bg-tertiaryColor hover:bg-septenaryColor space-x-2"
    @click="handleClick"
  >
    <GithubIcon class="w-5 h-5" />
    <span :class="{ 'hidden sm:block': props.hideTextOnMobile }">
      {{ props.text || 'Sign In' }}
    </span>
  </button>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
import AuthIcon from './Icons/auth-icon.vue';

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
    class="flex items-center justify-center sm:h-[38px] h-[34px] sm:px-4 px-2 border rounded-lg focus:outline-none border-septenaryColor dark:border-tertiaryColor dark:hover:bg-tertiaryColor hover:bg-septenaryColor space-x-2"
    :class="{ 'sm:w-auto w-[34px]': props.hideTextOnMobile }"
    @click="handleClick"
  >
    <AuthIcon class="w-4 h-4" />
    <span :class="{ 'hidden sm:block': props.hideTextOnMobile }">
      {{ props.text || 'Sign In' }}
    </span>
  </button>
</template>

<script setup lang="ts">
import Logo from '@/assets/logo.svg';
import { RouterLink } from 'vue-router';

interface IProps {
  clickable?: boolean; // default: true
}

const props = defineProps<IProps>();

const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
</script>

<template>
  <div v-if="props.clickable" class="flex flex-row">
    <RouterLink :to="{ name: 'Home' }" class="flex flex-row" @click="scrollTop()">
      <img :src="Logo" alt="Easy Wallet" width="32" height="32" />
      <span class="self-center mt-1 ml-2 text-2xl whitespace-nowrap hover:text-quaternaryColor"
        >Easy Wallet</span
      >
    </RouterLink>
  </div>
  <div v-else class="flex flex-row">
    <div class="flex flex-row">
      <img :src="Logo" alt="Easy Wallet" width="32" height="32" />
      <span class="self-center mt-1 ml-2 text-2xl whitespace-nowrap">Easy Wallet</span>
    </div>
  </div>
</template>

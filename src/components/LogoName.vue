<script lang="ts">
interface IProps {
  clickable?: boolean; // default: true
}
</script>

<script setup lang="ts">
import Logo from '@/assets/logo.svg';

const props = defineProps<IProps>();

const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
</script>

<template>
  <RouterLink
    v-if="props.clickable"
    :to="{ name: 'Home' }"
    class="flex flex-row"
    @click="scrollTop()"
  >
    <img :src="Logo" alt="Easy Wallet" width="32" height="32" />
    <span class="self-center mt-1 ml-2 text-2xl whitespace-nowrap hover:text-quaternaryColor">
      Easy Wallet
    </span>
  </RouterLink>

  <div v-else class="flex flex-row">
    <img :src="Logo" alt="Easy Wallet" width="32" height="32" />
    <span class="self-center mt-1 ml-2 text-2xl whitespace-nowrap">Easy Wallet</span>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { onBeforeMount, ref } from 'vue';
import NavbarUserLogged from './_components/UserLogged.vue';
import NavbarUserNotLogged from './_components/UserNotLogged.vue';

const userStore = useUserStore();
const isUserLogged = ref(false);

onBeforeMount(async () => {
  isUserLogged.value = !!(await userStore.getUser());
});
</script>

<template>
  <header>
    <NavbarUserNotLogged v-if="!isUserLogged" />
    <NavbarUserLogged v-else />
  </header>
</template>

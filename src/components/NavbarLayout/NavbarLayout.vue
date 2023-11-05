<script lang="ts">
interface IProps {
  isUserLogged: boolean;
}
</script>

<script setup lang="ts">
import NavbarUserLogged from './_components/UserLogged.vue';
import NavbarUserNotLogged from './_components/UserNotLogged.vue';

const props = defineProps<IProps>();
</script>

<template>
  <header>
    <NavbarUserLogged v-if="props.isUserLogged" />
    <NavbarUserNotLogged v-else />
  </header>
</template>

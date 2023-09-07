<script setup lang="ts">
import navbarNotLogged from './_components/NotLogged.vue';

const isUserLogged = false;
</script>

<template>
  <navbarNotLogged v-if="!isUserLogged" />
</template>

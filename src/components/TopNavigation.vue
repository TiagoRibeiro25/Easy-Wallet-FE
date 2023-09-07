<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <nav
    class="fixed w-full p-4 border-b dark:bg-secondaryColor dark:border-tertiaryColor bg-senaryColor border-septenaryColor"
  >
    {{ route.name }}
  </nav>
</template>

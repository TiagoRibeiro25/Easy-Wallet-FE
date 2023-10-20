<script setup lang="ts">
/**
 * Formats a route name by splitting it at each capital letter and joining with a space.
 * @param {string | undefined} name - The name of the route to format.
 * @returns {string} The formatted route name.
 */
const formatRouteName = (name: string | undefined): string => {
  return name?.split(/(?=[A-Z])/).join(' ') ?? '';
};
</script>

<template>
  <nav
    class="fixed w-full p-4 border-b dark:bg-secondaryColor dark:border-tertiaryColor bg-senaryColor border-septenaryColor"
  >
    {{ formatRouteName($route.name?.toString()) }}
  </nav>
</template>

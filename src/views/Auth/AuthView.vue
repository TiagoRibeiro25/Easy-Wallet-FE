<script setup lang="ts">
import { useRoute } from 'vue-router';

interface INavLink {
  name: string;
}

const routeHook = useRoute();

const navLinks: INavLink[] = [{ name: 'Login' }, { name: 'Register' }];
</script>

<template>
  <div class="max-w-xl mx-auto mb-12 space-y-10">
    <nav class="flex flex-row dark:bg-secondaryColor">
      <RouterLink
        v-for="link in navLinks"
        :key="link.name"
        :to="{ name: link.name }"
        class="flex-1 px-4 py-2 text-center transition-all duration-300 ease-in-out border border-octonaryColor"
        :class="{
          'bg-quaternaryColor text-black border-quaternaryColor':
            routeHook.name?.toString() === link.name,
          'dark:border-tertiaryColor dark:hover:bg-tertiaryColor':
            routeHook.name?.toString() !== link.name,
          'rounded-l-lg': link.name === navLinks[0].name,
          'rounded-r-lg': link.name === navLinks[1].name,
        }"
        draggable="false"
      >
        {{ link.name }}
      </RouterLink>
    </nav>

    <div
      class="p-5 border rounded-md border-octonaryColor dark:border-tertiaryColor dark:bg-secondaryColor"
    >
      <Transition name="main-content">
        <RouterView />
      </Transition>
    </div>
  </div>
</template>

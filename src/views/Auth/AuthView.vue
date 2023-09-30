<script setup lang="ts">
interface INavLink {
  name: string;
  path: string;
}

const navLinks: INavLink[] = [
  { name: 'Login', path: '/auth/login' },
  { name: 'Register', path: '/auth/register' },
];
</script>

<template>
  <div class="max-w-xl mx-auto mb-12 space-y-10">
    <nav class="flex flex-row dark:bg-secondaryColor">
      <RouterLink
        v-for="link in navLinks"
        :key="link.name"
        :to="link.path"
        class="flex-1 px-4 py-2 text-center transition-all duration-300 ease-in-out border border-octonaryColor"
        :class="{
          'bg-quaternaryColor text-black border-quaternaryColor': $route.path === link.path,
          'dark:border-tertiaryColor dark:hover:bg-tertiaryColor': $route.path !== link.path,
          'rounded-l-lg': link.path === navLinks[0].path,
          'rounded-r-lg': link.path === navLinks[1].path,
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

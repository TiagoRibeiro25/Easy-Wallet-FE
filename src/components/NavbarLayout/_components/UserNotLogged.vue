<script setup lang="ts">
import LogoName from '@/components/LogoName.vue';
import SignButton from '@/components/SignButton.vue';
import ThemeSwitcher from '@/components/ThemeSwitcher.vue';
</script>

<template>
  <nav class="fixed top-0 z-50 w-full backdrop-filter backdrop-blur-lg">
    <div class="flex flex-wrap items-center justify-between max-w-screen-xl px-4 py-3 mx-auto">
      <LogoName clickable />

      <div className="relative flex items-center">
        <ThemeSwitcher class="justify-center" />
        <SignButton
          class="ml-3 bg-senaryColor dark:bg-primaryColor"
          form="login"
          hideTextOnMobile
        />
      </div>
    </div>
  </nav>
</template>

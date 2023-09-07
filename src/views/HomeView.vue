<script setup lang="ts">
import CustomButton from '@/components/CustomButton.vue';
import HeroIllustration from '@/components/Illustrations/hero-illustration.vue';
</script>

<template>
  <section
    id="hero"
    class="flex flex-col md:flex-row items-center justify-center md:min-h-[500px] md:h-[600px]"
  >
    <div class="flex flex-col items-center justify-center my-10 md:w-1/2 md:h-full md:my-0">
      <h1 class="text-3xl text-center">
        Streamline Your Spending,
        <br />
        Amplify Your Savings with EasyWallet
      </h1>
      <CustomButton id="learn-more" name="learn-more" class="mt-8">
        <template v-slot:default>
          <a href="#what-is"> Learn More </a>
        </template>
      </CustomButton>
    </div>

    <div class="flex items-center justify-center w-full p-16 md:p-5 md:w-1/2 md:h-full">
      <HeroIllustration name="hero" />
    </div>
  </section>

  <section id="what-is"></section>
</template>

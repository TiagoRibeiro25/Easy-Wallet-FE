<script setup lang="ts">
import CustomButton from '@/components/CustomButton.vue';
import HeroIllustration from '@/components/Illustrations/hero-illustration.vue';
import WhatIsIllustration from '@/components/Illustrations/what-is-illustration.vue';
import WhyUseIllustration from '@/components/Illustrations/why-use-illustration.vue';
import SignButton from '@/components/SignButton.vue';
import { RouterLink } from 'vue-router';
import UsersReviews from './_components/UsersReviews.vue';
</script>

<template>
  <section
    id="hero"
    class="flex flex-col md:flex-row items-center justify-center min-h-[680px] md:min-h-[500px] h-[calc(100vh-4rem)]"
  >
    <div class="flex flex-col items-center justify-center mb-10 md:w-1/2 md:h-full">
      <h1 class="text-3xl text-center">
        Streamline Your Spending,
        <br />
        Amplify Your Savings with Easy Wallet
      </h1>
      <a href="#what-is">
        <CustomButton id="learn-more" name="learn-more" class="mt-8">
          <template v-slot:default> Learn More </template>
        </CustomButton>
      </a>
    </div>

    <div class="flex items-center justify-center w-full p-16 md:p-5 md:w-1/2 md:h-full">
      <HeroIllustration />
    </div>
  </section>

  <section
    id="what-is"
    class="flex flex-col items-center justify-center pt-12 mb-12 md:flex-row md:mb-0"
  >
    <div
      class="flex flex-col items-center justify-center my-10 md:pr-10 md:items-end md:w-2/3 md:h-full md:my-0"
    >
      <h2 class="mb-4 text-3xl">What is Easy Wallet?</h2>
      <p class="text-center md:text-end opacity-80">
        EasyWallet is your minimalist expense tracking solution. Effortlessly manage your finances
        by recording daily expenses and income with a clean and intuitive interface. Gain a clear
        overview of your financial situation, understand spending patterns, and make informed
        decisions. With EasyWallet, managing your money becomes stress-free and insightful.
      </p>
    </div>
    <div class="flex items-center justify-center w-full px-28 md:p-5 md:w-1/3 md:h-full">
      <WhatIsIllustration class="max-w-xs" />
    </div>
  </section>

  <section id="why-use" class="flex flex-col items-center justify-center my-44 md:flex-row">
    <div
      class="flex items-center justify-center order-last w-full px-28 md:p-5 md:w-1/3 md:h-full md:order-first"
    >
      <WhyUseIllustration class="max-w-xs" />
    </div>
    <div
      class="flex flex-col items-center justify-center my-10 md:pr-10 md:items-start md:w-2/3 md:h-full md:my-0"
    >
      <h2 class="mb-4 text-3xl">Why Use Easy Wallet?</h2>
      <ul class="px-8 space-y-4 list-disc list-inside md:text-start opacity-80 md:px-0">
        <li>
          Simplicity at Its Best: No complicated spreadsheets or convoluted features. Easy Wallet
          keeps expense tracking straightforward and hassle-free.
        </li>
        <li>
          Instant Insights: Understand where your money goes at a glance. EasyWallet provides clear
          summaries of your finances, helping you make smarter decisions
        </li>
        <li>
          Tailored for You: Whether you're a student, professional, or anyone in between, Easy
          Wallet adapts to your lifestyle, making financial management accessible to all.
        </li>
        <li>
          Empower Your Financial Journey: Take control of your financial future. Easy Wallet is your
          companion for achieving a clearer, more organized financial life.
        </li>
      </ul>
    </div>
  </section>

  <section id="faq">
    <h2 class="mb-4 text-3xl text-center">Frequently Asked Questions</h2>
    <p class="text-center opacity-80">
      Got questions about using EasyWallet? We've got answers. Check out our FAQ section for quick
      insights into how Easy Wallet works, its features, and how it can simplify your financial
      management. Get clarity on everything from getting started to maximizing the app's potential.
      If you don't find what you're looking for, feel free to reach out to our support team for
      personalized assistance. Easy Wallet is here to empower you on your financial journey, step by
      step.
    </p>

    <div class="flex justify-center mb-28">
      <RouterLink to="/faq">
        <CustomButton id="faq" name="faq" class="mt-8">
          <template v-slot:default> Check FAQs </template>
        </CustomButton>
      </RouterLink>
    </div>
  </section>

  <section id="reviews" class="my-44">
    <h2 class="mb-8 text-3xl text-center">Discover What Others Are Saying</h2>
    <UsersReviews />
  </section>

  <section id="sign-up" class="mb-28">
    <h2 class="mb-2 text-3xl text-center">Start Using Easy Wallet Today</h2>
    <p class="text-center opacity-80">Try it out - you won't regret it</p>
    <div className="flex mt-6 justify-center">
      <SignButton class="ml-3 scale-125 bg-senaryColor dark:bg-primaryColor" text="Sign Up" />
    </div>
  </section>
</template>

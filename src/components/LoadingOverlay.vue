<script setup lang="ts">
import { onUnmounted, ref } from 'vue';
import ClockLoadingIcon from './Icons/clock-loading.vue';
import LogoName from './LogoName.vue';

interface IProps {
  status: 'loading' | 'error';
}

const props = defineProps<IProps>();

const EXPECTED_TIME = 40; // seconds
const time = ref<number>(0);

const interval = setInterval(() => {
  time.value += 1;
}, 1000);

onUnmounted(() => clearInterval(interval));
</script>

<template>
  <div class="flex flex-col items-center justify-center w-screen h-screen max-w-2xl px-6 mx-auto">
    <LogoName class="scale-125" />
    <div v-if="props.status === 'loading'" class="flex flex-col items-center justify-center">
      <h2 class="my-6 text-xl font-bold text-center text-gray-500 dark:text-gray-400">
        Looks like our servers are sleeping, please wait a few seconds while we wake them up.
      </h2>

      <div
        class="flex flex-row items-center space-x-3"
        :class="time >= EXPECTED_TIME ? 'text-red-500 dark:text-red-400' : 'text-quaternaryColor'"
      >
        <ClockLoadingIcon class="w-10 h-10 hover:animate-spin" />
        <span class="font-bold"> {{ time }} seconds </span>
      </div>
    </div>

    <div v-else class="flex flex-col items-center justify-center">
      <h2 class="mt-6 mb-2 text-xl font-bold text-center text-gray-500 dark:text-gray-400">
        Unfortunately, we were unable to wake up the servers 😢
      </h2>

      <p class="text-sm font-medium text-center text-gray-500 dark:text-gray-400">
        If this problems persists, please
        <a href="https://tiagoribeiro.tech/contact" class="text-quaternaryColor" target="_blank"
          >contact me</a
        >.
      </p>
    </div>
  </div>

  <div
    v-if="props.status === 'loading'"
    class="absolute bottom-0 left-0 right-0 flex items-center justify-center w-screen h-16 px-6 mx-auto"
  >
    <span class="text-sm font-medium text-center text-gray-500 dark:text-gray-400">
      This shouldn't take more than {{ EXPECTED_TIME }} seconds
    </span>
  </div>
</template>
1

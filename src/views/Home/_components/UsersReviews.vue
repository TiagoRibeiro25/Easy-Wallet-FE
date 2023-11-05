<script lang="ts">
interface IReview {
  username: string;
  img: string;
  review: string;
  rating: number;
}
</script>

<script setup lang="ts">
import StarIcon from '@/components/Icons/star-icon.vue';
import { useDark } from '@vueuse/core';
import { onBeforeMount, ref } from 'vue';
import UsersReviews from './users-reviews.json';

const isDark = useDark();
const reviews: IReview[] = UsersReviews;

const screenWidth = ref<number>(window.innerWidth);

onBeforeMount(() => {
  const resize = () => (screenWidth.value = window.innerWidth);

  window.addEventListener('resize', resize);

  return () => {
    window.removeEventListener('resize', resize);
  };
});
</script>

<template>
  <Vue3Marquee
    direction="reverse"
    :duration="screenWidth > 640 ? 100 : 60"
    gradient
    :gradient-color="isDark ? [2, 8, 23] : [249, 250, 251]"
    gradient-length="100px"
    :vertical="screenWidth < 640"
    class="overflow-y-hidden max-h-[600px]"
  >
    <div
      v-for="(review, index) in reviews"
      :key="index"
      class="flex flex-col p-5 sm:mx-6 sm:my-0 my-6 border-2 dark:border-tertiaryColor border-septenaryColor rounded-xl w-[90vw] sm:w-[350px] h-full"
    >
      <div class="flex flex-row">
        <img
          height="40"
          width="40"
          :src="review.img"
          alt="User Picture"
          class="object-cover object-center mr-4 rounded-full"
        />
        <div class="flex flex-col">
          <h3>@{{ review.username }}</h3>
          <div class="flex flex-row">
            <StarIcon v-for="star in review.rating" :key="star" class="w-4 h-4 mr-1" />
          </div>
        </div>
      </div>
      <p class="mt-4 text-sm text-justify opacity-80">{{ review.review }}</p>
    </div>
  </Vue3Marquee>
</template>

<script setup lang="ts">
import StarIcon from '@/components/Icons/star-icon.vue';
import { useDark } from '@vueuse/core';
import UsersReviews from './users-reviews.json';

interface IReview {
  username: string;
  img: string;
  review: string;
  rating: number;
}

const isDark = useDark();
const reviews: IReview[] = UsersReviews;
</script>

<template>
  <Vue3Marquee
    :duration="100"
    pauseOnHover
    gradient
    :gradientColor="isDark ? [2, 8, 23] : [249, 250, 251]"
    gradientLength="100px"
  >
    <div
      v-for="(review, index) in reviews"
      :key="index"
      class="flex flex-col p-5 mx-6 border-2 border-gray-200 rounded-xl w-[350px]"
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
          <h3 class="">@{{ review.username }}</h3>
          <div class="flex flex-row">
            <StarIcon v-for="star in review.rating" :key="star" class="w-4 h-4 mr-1" />
          </div>
        </div>
      </div>
      <p class="mt-4 text-sm text-justify opacity-80">{{ review.review }}</p>
    </div>
  </Vue3Marquee>
</template>

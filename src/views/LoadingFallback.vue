<script setup lang="ts">
const timesToRepeat = 5;
</script>

<template>
  <div v-for="n in timesToRepeat" :key="n" class="space-y-2.5 animate-pulse mb-3">
    <div class="flex items-center w-full space-x-2">
      <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
      <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
      <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
    </div>
    <div class="flex items-center w-full space-x-2">
      <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
      <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
      <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
    </div>
    <div class="flex items-center w-full space-x-2">
      <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
      <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
      <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
    </div>
    <div class="flex items-center w-full space-x-2">
      <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
      <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
      <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
    </div>
    <div class="flex items-center w-full space-x-2">
      <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-32"></div>
      <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
      <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
    </div>
    <div class="flex items-center w-full space-x-2">
      <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
      <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
      <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
    </div>

    <span class="sr-only">Loading...</span>
  </div>
</template>

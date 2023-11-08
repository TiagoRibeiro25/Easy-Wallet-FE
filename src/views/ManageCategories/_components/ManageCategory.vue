<script setup lang="ts">
import { useCategoriesStore } from '@/stores/categories';
import type { ICategory } from '@/types';
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const categoriesStore = useCategoriesStore();
const category = ref<ICategory | undefined>(undefined);

watchEffect(() => {
  const categoryId = route.params.id as string;
  category.value = categoriesStore.getOne(+categoryId);
});
</script>

<template>
  <div>
    <p class="text-justify">
      <span class="block mb-6 truncate">
        {{ JSON.stringify(category) }}
      </span>
    </p>
  </div>
</template>

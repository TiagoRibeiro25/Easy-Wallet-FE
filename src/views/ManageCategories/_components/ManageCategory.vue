<script setup lang="ts">
import { useCategoriesStore } from '@/stores/categories';
import type { ICategory } from '@/types';
import { ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const categoriesStore = useCategoriesStore();
const category = ref<ICategory | undefined>(undefined);

watchEffect(() => {
  const categoryId = route.params.id as string;
  category.value = categoriesStore.getOne(+categoryId);

  if (!category.value) {
    router.push({ name: 'Categories-AddCategory' });
  }
});
</script>

<template>
  <div>
    {{ JSON.stringify(category) }}
  </div>
</template>

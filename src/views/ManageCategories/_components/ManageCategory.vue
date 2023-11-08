<script setup lang="ts">
import CustomInput from '@/components/CustomInput.vue';
import { useCategoriesStore } from '@/stores/categories';
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const categoriesStore = useCategoriesStore();

const categoryName = ref<string>('');

watchEffect(() => {
  const category = categoriesStore.getOne(parseInt(route.params.id as string));
  categoryName.value = category?.name ?? '';
});
</script>

<template>
  <div>
    <CustomInput
      id="category-name"
      name="category-name"
      type="text"
      placeholder="Category name"
      v-model="categoryName"
      required
    />
  </div>
</template>

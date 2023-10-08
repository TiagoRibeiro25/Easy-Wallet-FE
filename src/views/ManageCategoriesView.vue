<script setup lang="ts">
import CustomButton from '@/components/CustomButton.vue';
import AddIcon from '@/components/Icons/add-icon.vue';
import LoadingIcon from '@/components/Icons/loading-icon.vue';
import { useCategoriesStore } from '@/stores/categories';
import { type ICategory } from '@/types';
import { ref, watchEffect } from 'vue';

const categoriesStore = useCategoriesStore();
const loading = ref<boolean>(true);
const categories = ref<ICategory[]>([]);

watchEffect(() => {
  categoriesStore
    .getAll()
    .then(data => {
      categories.value = data;
    })
    .finally(() => {
      if (loading.value) {
        loading.value = false;
      }
    });
});
</script>

<template>
  <div class="w-full h-full min-h-[450px] max-h-[800px]">
    <div
      v-if="loading"
      class="flex items-center justify-center h-full border shadow-sm rounded-2xl bg-senaryColor dark:bg-secondaryColor dark:border-tertiaryColor"
    >
      <LoadingIcon class="w-12 h-12" />
    </div>

    <div
      v-else
      class="flex flex-row min-h-[500px] h-[80vh] border shadow-sm rounded-2xl bg-senaryColor dark:bg-secondaryColor dark:border-tertiaryColor"
    >
      <div
        class="min-w-[250px] max-w-[250px] p-6 space-y-3 border-r rounded-2xl dark:border-tertiaryColor dark:shadow-2xl"
      >
        <ul
          class="border-b h-[90%] wrapper overflow-y-auto dark:border-b-tertiaryColor space-y-4 w-full pb-6"
        >
          <li v-for="category of categories" :key="category.id" class="text-center truncate">
            {{ category.name }}
          </li>

          <li v-if="categories.length === 0" class="text-center">No Categories Found</li>
        </ul>
        <div class="flex items-center justify-center">
          <CustomButton
            id="add-category-button"
            name="add-category-button"
            :icon="AddIcon"
            icon-position="left"
            class="shadow-none hover:text-quaternaryColor"
          >
            <template v-slot:default>
              <span> Add Category </span>
            </template>
          </CustomButton>
        </div>
      </div>

      <div class="w-full h-full py-6">
        <div class="h-full px-6 overflow-y-auto wrapper"></div>
      </div>
    </div>
  </div>
</template>

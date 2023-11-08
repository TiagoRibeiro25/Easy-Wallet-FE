<script setup lang="ts">
import CustomButton from '@/components/CustomButton.vue';
import CustomInput from '@/components/CustomInput.vue';
import { useCategoriesStore } from '@/stores/categories';
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import RenderCategoryIcons from './RenderCategoryIcons.vue';

const route = useRoute();
const categoriesStore = useCategoriesStore();

const categoryName = ref<string>('');
const categoryIconId = ref<number>(0);

watchEffect(() => {
  const category = categoriesStore.getOne(parseInt(route.params.id as string));
  categoryName.value = category?.name ?? '';
  categoryIconId.value = category?.iconId ?? 0;
});
</script>

<template>
  <form>
    <RenderCategoryIcons
      :selected-icon-id="categoryIconId"
      @update:selected-icon-id="categoryIconId = $event"
    />

    <CustomInput
      class="mt-10 mb-14"
      id="category-name"
      name="category-name"
      type="text"
      placeholder="Category name"
      v-model="categoryName"
      required
    />

    <div class="flex flex-col items-center space-y-5 sm:space-y-0 sm:justify-around sm:flex-row">
      <CustomButton
        type="submit"
        id="update-category"
        name="update-category"
        class="text-quinaryColor bg-quaternaryColor w-[142px] justify-center"
      >
        <template v-slot:default> Apply Changes </template>
      </CustomButton>

      <CustomButton
        id="delete-category"
        name="delete-category"
        type="button"
        class="bg-red-400 text-quinaryColor w-[142px] justify-center m-0"
      >
        <template v-slot:default> Delete </template>
      </CustomButton>
    </div>
  </form>
</template>

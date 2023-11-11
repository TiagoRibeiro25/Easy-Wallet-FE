<script setup lang="ts">
import CustomButton from '@/components/CustomButton.vue';
import CustomInput from '@/components/CustomInput.vue';
import { useCategoriesStore } from '@/stores/categories';
import { useNotificationsStore } from '@/stores/notifications';
import { ref } from 'vue';
import RenderCategoryIcons from './RenderCategoryIcons.vue';

const categoriesStore = useCategoriesStore();
const notificationsStore = useNotificationsStore();

const categoryName = ref<string>('');
const categoryIconId = ref<number>(0);
const loading = ref<boolean>(false);

const handleSubmit = async (): Promise<void> => {
  loading.value = true;

  notificationsStore.add({
    type: 'info',
    title: 'Add Category',
    message: 'Adding category...',
  });

  const res = await categoriesStore.addOne(categoryName.value, categoryIconId.value);

  notificationsStore.add({
    type: res.success ? 'success' : 'error',
    title: 'Add Category',
    message: res.success ? 'Category added successfully!' : 'Something went wrong!',
  });

  loading.value = false;
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
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

    <div class="flex justify-center">
      <CustomButton
        type="submit"
        id="update-category"
        name="update-category"
        class="text-quinaryColor bg-quaternaryColor w-full sm:w-[142px] justify-center disabled:cursor-not-allowed disabled:opacity-60"
        :disabled="loading || !categoryName || !categoryIconId"
      >
        <template v-slot:default> Create </template>
      </CustomButton>
    </div>
  </form>
</template>

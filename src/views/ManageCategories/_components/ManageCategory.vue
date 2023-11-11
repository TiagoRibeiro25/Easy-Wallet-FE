<script setup lang="ts">
import ConfirmationModal from '@/components/ConfirmationModal.vue';
import CustomButton from '@/components/CustomButton.vue';
import CustomInput from '@/components/CustomInput.vue';
import { useCategoriesStore } from '@/stores/categories';
import { useNotificationsStore } from '@/stores/notifications';
import { ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import RenderCategoryIcons from './RenderCategoryIcons.vue';

const router = useRouter();
const route = useRoute();
const categoriesStore = useCategoriesStore();
const notificationsStore = useNotificationsStore();

const categoryName = ref<string>('');
const categoryIconId = ref<number>(0);

const showModal = ref<boolean>(false);
const loading = ref<boolean>(false);

/**
 * Handles the submission of the form to update a category.
 * Displays a notification with the message "Updating category...".
 * Calls the categoriesStore updateOne method with the category id, name and icon id.
 * Displays a notification with the result of the update operation.
 * @returns {Promise<void>}
 */
const handleSubmit = async (): Promise<void> => {
  loading.value = true;

  notificationsStore.add({
    type: 'info',
    title: 'Categories',
    message: 'Updating category...',
  });

  const res = await categoriesStore.updateOne(
    parseInt(route.params.id as string),
    categoryName.value,
    categoryIconId.value,
  );

  notificationsStore.add({
    type: res.success ? 'success' : 'error',
    title: 'Categories',
    message: res.message,
  });

  loading.value = false;
};

/**
 * Handles the deletion of a category.
 * Displays a notification with the message "Deleting category...".
 * Calls the categoriesStore deleteOne method with the category id.
 * Displays a notification with the result of the delete operation.
 * If the delete operation was a success, it navigates to the first category (if there is one).
 * @returns {Promise<void>}
 */
const handleDelete = async (): Promise<void> => {
  loading.value = true;

  notificationsStore.add({
    type: 'info',
    title: 'Categories',
    message: 'Deleting category...',
  });

  const res = await categoriesStore.deleteOne(parseInt(route.params.id as string));

  notificationsStore.add({
    type: res.success ? 'success' : 'error',
    title: 'Categories',
    message: res.message,
  });

  loading.value = false;

  // If it was a success, navigate to the first category (if there is one)
  if (res.success) {
    const categories = await categoriesStore.getAll();

    if (categories.length > 0) {
      await router.push({ name: 'Categories-Category', params: { id: categories[0].id } });
    }
  }
};

watchEffect(() => {
  const category = categoriesStore.getOne(parseInt(route.params.id as string));
  categoryName.value = category?.name ?? '';
  categoryIconId.value = category?.iconId ?? 0;
});
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

    <div class="flex flex-col items-center space-y-5 sm:space-y-0 sm:justify-around sm:flex-row">
      <CustomButton
        type="submit"
        id="update-category"
        name="update-category"
        class="text-quinaryColor bg-quaternaryColor w-full sm:w-[142px] justify-center"
        :disabled="loading"
      >
        <template v-slot:default> Apply Changes </template>
      </CustomButton>

      <CustomButton
        id="delete-category"
        name="delete-category"
        type="button"
        class="bg-red-400 text-quinaryColor w-full sm:w-[142px] justify-center m-0"
        :disabled="loading"
        @click="showModal = true"
      >
        <template v-slot:default> Delete </template>
      </CustomButton>
    </div>

    <ConfirmationModal
      v-model="showModal"
      title="Delete Category"
      text="Are you sure you want to delete this category? This action cannot be undone."
      @on-confirm="handleDelete"
    />
  </form>
</template>

<script setup lang="ts">
import CustomButton from '@/components/CustomButton.vue';
import AddIcon from '@/components/Icons/add-icon.vue';
import LoadingIcon from '@/components/Icons/loading-icon.vue';
import RenderIcon from '@/components/RenderCategoryIcon.vue';
import { useCategoriesStore } from '@/stores/categories';
import { type ICategory } from '@/types';
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const categoriesStore = useCategoriesStore();
const loading = ref<boolean>(true);
const categories = ref<ICategory[]>([]);
const categorySelected = ref<number>(0); // id of the selected category (0 = no category selected)

/**
 * Updates the selected category and updates the view.
 * @param {number} categoryId - The ID of the category to be selected.
 */
const updateCategorySelected = async (categoryId: number): Promise<void> => {
  categorySelected.value = categoryId;
  await router.push({ name: 'Category', params: { id: categoryId } });
};

//TODO: Figure why the user can't navigate to a different route if a category is selected.
// the user can navigate to add category
// the user can only navigate to other routes if the category is not selected
// it only happens if the user is already authenticated when the application loads (wth?)

/**
 * Watch for changes in the categoriesStore.
 * When changes occur, it retrieves all categories from the store and sets the categories.value to the retrieved data.
 * It then selects the first category by calling the updateCategorySelected function with the id of the first category.
 * Finally, it sets the loading.value to false.
 */
watchEffect(async () => {
  categories.value = await categoriesStore.getAll();

  if (categories.value.length > 0) {
    await updateCategorySelected(categories.value[0].id);
  } else {
    await router.push({ name: 'AddCategory' });
  }

  loading.value = false;
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
          <li
            v-for="category in categories"
            :key="category.id"
            class="flex items-center space-x-2 cursor-pointer hover:opacity-80"
            :class="{ 'text-quaternaryColor': categorySelected === category.id }"
            @click="updateCategorySelected(category.id)"
          >
            <RenderIcon :iconId="category.iconId" class="w-6 h-6" />
            <span class="flex-1 text-center truncate">{{ category.name }}</span>
          </li>

          <li v-if="categories.length === 0" class="text-center truncate">No Categories Found</li>
        </ul>
        <div class="flex items-center justify-center">
          <RouterLink :to="{ name: 'AddCategory' }">
            <CustomButton
              id="add-category-button"
              name="add-category-button"
              :icon="AddIcon"
              icon-position="left"
              class="shadow-none hover:text-quaternaryColor"
              @click="() => (categorySelected = 0)"
            >
              <template v-slot:default>
                <span> Add Category </span>
              </template>
            </CustomButton>
          </RouterLink>
        </div>
      </div>

      <div class="w-full h-full py-6">
        <div class="h-full px-6 overflow-y-auto wrapper">
          <Transition name="fade">
            <RouterView />
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>
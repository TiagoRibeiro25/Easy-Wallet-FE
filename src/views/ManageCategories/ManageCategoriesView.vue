<script setup lang="ts">
import CustomButton from '@/components/CustomButton.vue';
import AddIcon from '@/components/Icons/add-icon.vue';
import LoadingIcon from '@/components/Icons/loading-icon.vue';
import RenderCategoryIcon from '@/components/RenderCategoryIcon.vue';
import { useCategoriesStore } from '@/stores/categories';
import { type ICategory } from '@/types';
import { ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const categoriesStore = useCategoriesStore();
const loading = ref<boolean>(true);
const categories = ref<ICategory[]>([]);

/**
 * Watch for changes in the categoriesStore.
 * When changes occur, it retrieves all categories from the store and sets the categories.value to the retrieved data.
 * It then selects the first category by default and navigates to the category route.
 * Finally, it sets the loading.value to false.
 */
watchEffect(async () => {
  categories.value = await categoriesStore.getAll();

  // Check if there's a category with the id in the route params.
  const matchingCategory = categories.value.some(
    (category: ICategory) => category.id.toString() === route.params.id,
  );

  // If there's no category with the id in the route params -  redirect to the first category.
  // If there's no category in the store - redirect to the add category route.
  if ((!route.params.id && categories.value.length > 0) || matchingCategory) {
    await router.push({
      name: 'Categories-Category',
      params: { id: route.params.id ?? categories.value[0]?.id },
    });
  } else {
    await router.push({ name: 'Categories-AddCategory' });
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
      <!-- Desktop navigation -->
      <nav
        class="lg:block hidden min-w-[250px] max-w-[250px] p-6 space-y-3 border-r rounded-2xl dark:border-tertiaryColor dark:shadow-2xl"
      >
        <ul
          class="border-b h-[90%] wrapper overflow-y-auto dark:border-b-tertiaryColor space-y-4 w-full pb-6"
        >
          <li v-for="category in categories" :key="category.id">
            <RouterLink
              :to="{ name: 'Categories-Category', params: { id: category.id } }"
              class="flex items-center space-x-2 hover:opacity-80"
              :class="{
                'text-quaternaryColor':
                  route.name === 'Categories-Category' &&
                  route.params.id === category.id.toString(),
              }"
              @click="route.params.id = category.id.toString()"
            >
              <RenderCategoryIcon :iconId="category.iconId" class="w-6 h-6" />
              <span class="flex-1 text-center truncate">{{ category.name }}</span>
            </RouterLink>
          </li>

          <li v-if="categories.length === 0" class="text-center truncate">No Categories Found</li>
        </ul>
        <div class="flex items-center justify-center">
          <RouterLink :to="{ name: 'Categories-AddCategory' }">
            <CustomButton
              id="desktop-add-category-button"
              name="desktop-add-category-button"
              :icon="AddIcon"
              icon-position="left"
              class="shadow-none hover:text-quaternaryColor"
              :class="{ 'text-quaternaryColor': route.name === 'Categories-AddCategory' }"
              @click="route.params.id = ''"
            >
              <template v-slot:default>
                <span> Add Category </span>
              </template>
            </CustomButton>
          </RouterLink>
        </div>
      </nav>

      <div class="h-full w-full lg:max-w-[calc(100%-250px)] pt-6 pb-6">
        <div class="h-full px-6 overflow-y-auto wrapper">
          <!-- Mobile Navigation -->
          <div
            v-if="categories.length > 0 && route.name === 'Categories-Category'"
            class="flex flex-row justify-center mb-6 space-x-2 border-b lg:hidden dark:border-tertiaryColor dark:bg-secondaryColor"
          >
            <select
              id="category-select"
              v-model="route.params.id"
              class="w-full h-10 px-4 py-2 text-base font-semibold text-center bg-transparent cursor-pointer text-quaternaryColor hover:opacity-80"
              @change="
                () => router.push({ name: 'Categories-Category', params: { id: route.params.id } })
              "
            >
              <option
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
                class="text-septenaryColor"
              >
                {{ category.name }}
              </option>
            </select>

            <RouterLink :to="{ name: 'Categories-AddCategory' }" class="w-[50px]">
              <CustomButton
                id="mobile-add-category-button"
                name="mobile-add-category-button"
                :icon="AddIcon"
                icon-position="left"
                class="scale-110 shadow-none hover:text-quaternaryColor"
                @click="route.params.id = ''"
              >
              </CustomButton>
            </RouterLink>
          </div>

          <div
            v-else
            class="flex justify-center w-full pb-1 mb-6 border-b lg:hidden dark:border-tertiaryColor dark:bg-secondaryColor"
          >
            <RouterLink
              :to="{
                name: categories.length === 0 ? '' : 'Categories-Category',
                params: { id: categories[0]?.id ?? 0 },
              }"
              :class="{ 'disabled: opacity-50 cursor-default': categories.length === 0 }"
              @click="categories.length > 0 ? (route.params.id = categories[0].id.toString()) : ''"
            >
              <CustomButton
                id="show-category-button"
                name="show-category-button"
                class="scale-110 shadow-none"
                :class="categories.length === 0 ? 'cursor-default' : 'hover:text-quaternaryColor'"
              >
                <template v-slot:default>
                  <span class="text-sm"> Show Categories </span>
                </template>
              </CustomButton>
            </RouterLink>
          </div>

          <!-- Main Content -->
          <Transition name="fade">
            <RouterView />
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

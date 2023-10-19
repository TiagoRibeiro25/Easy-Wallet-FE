import requests from '@/api/requests';
import { type ICategory } from '@/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCategoriesStore = defineStore('categories', () => {
  const categories = ref<ICategory[]>([]);

  /**
   * Returns the current categories array.
   * @returns {ICategory[]} The current categories array.
   */
  const getAll = async (): Promise<ICategory[]> => {
    if (categories.value.length === 0) {
      try {
        const res = await requests.categories.getCategories();

        if (res.success) {
          categories.value = res.data;
        }
      } catch (error: any) {
        // ...
      }
    }

    return categories.value;
  };

  /**
   * Returns a single category object from the categories array based on the provided id.
   * @param id - The id of the category to retrieve.
   * @returns The category object with the matching id, or undefined if no match is found.
   */
  const getOne = (id: number): ICategory | undefined => {
    return categories.value.find((category: ICategory) => category.id === id);
  };

  return { getAll, getOne };
});

import requests from '@/api/requests';
import type { IAPIResponse } from '@/api/types';
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

  /**
   * Updates a category with the given ID with the provided name and icon ID.
   * @param id - The ID of the category to update.
   * @param name - The new name for the category.
   * @param iconId - The new icon ID for the category.
   * @returns A Promise that resolves to a boolean indicating whether the update was successful.
   */
  const updateOne = async (id: number, name: string, iconId: number): Promise<IAPIResponse> => {
    try {
      const res = await requests.categories.updateCategory({ id, name, iconId });
      if (res.success) {
        const category = getOne(id);
        if (category) {
          category.name = name;
          category.iconId = iconId;
        }
      }

      return res;
    } catch (error: any) {
      return {
        success: false,
        message: "An error occurred while updating the category's details.",
        data: null,
      };
    }
  };

  return { getAll, getOne, updateOne };
});

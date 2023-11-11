import requests from '@/api/requests';
import type { IAddCategoryData } from '@/api/requests/categories/addCategory';
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

  /**
   * Deletes a category with the specified ID.
   * @param id The ID of the category to delete.
   * @returns A Promise that resolves to an IAPIResponse object.
   */
  const deleteOne = async (id: number): Promise<IAPIResponse> => {
    try {
      const res = await requests.categories.deleteCategory(id);
      if (res.success) {
        const index = categories.value.findIndex((category: ICategory) => category.id === id);
        if (index !== -1) {
          categories.value.splice(index, 1);
        }
      }

      return res;
    } catch (error: any) {
      return {
        success: false,
        message: 'An error occurred while deleting the category.',
        data: null,
      };
    }
  };

  /**
   * Adds a new category with the given name and icon ID to the list of categories.
   * @param name The name of the new category.
   * @param iconId The ID of the icon to use for the new category.
   * @returns A Promise that resolves to an object containing either the new category data or an error message.
   */
  const addOne = async (name: string, iconId: number): Promise<IAddCategoryData | IAPIResponse> => {
    try {
      const res = await requests.categories.addCategory(name, iconId);
      if (res.success) {
        categories.value.push(res.data);
      }

      return res;
    } catch (error: any) {
      return {
        success: false,
        message: 'An error occurred while adding the category.',
        data: null,
      };
    }
  };

  return { getAll, getOne, updateOne, deleteOne, addOne };
});

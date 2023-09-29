import type { IUser } from '@/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import requests from '../api/requests/index';

export const useUserStore = defineStore('user', () => {
  const user = ref<IUser>();

  // Get the logged user (if any)
  const getUser = async (): Promise<IUser | undefined> => {
    if (!user.value) {
      try {
        const response = await requests.user.getLoggedUser();
        user.value = response.data;
      } catch (error) {
        console.log(error);
      }
    }

    return user.value;
  };

  return { getUser };
});

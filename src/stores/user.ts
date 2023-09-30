import { type IAPIResponse } from '@/api/types';
import type { IUser } from '@/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import requests from '../api/requests/index';

export const useUserStore = defineStore('user', () => {
  const user = ref<IUser>();

  /**
   * Checks if a user is currently logged in.
   * @returns {boolean} - True if a user is logged in, false otherwise.
   */
  const isUserLoggedIn = (): boolean => {
    return !!user.value;
  };

  /**
   * Retrieves the logged-in user from the server.
   * If the user is not already stored in the store, it will make a request to the server to get the user.
   * @returns A Promise that resolves to the logged-in user, or undefined if the user is not logged in.
   */
  const getUser = async (): Promise<IUser | undefined> => {
    if (!user.value) {
      try {
        const response = await requests.user.getLoggedUser();
        user.value = response.data;
      } catch (error) {
        console.log(error);
      }

      await new Promise(resolve => setTimeout(resolve, 1000));

      return user.value;
    }
  };

  /**
   * Logs in a user with the given email and password.
   * @param email - The email of the user.
   * @param password - The password of the user.
   * @param rememberMe - Whether to remember the user's login or not.
   * @returns A Promise that resolves to an IAPIResponse object.
   */
  const login = async (
    email: string,
    password: string,
    rememberMe: boolean,
  ): Promise<IAPIResponse> => {
    try {
      const res = await requests.auth.login(email, password, rememberMe);
      user.value = res.data;
      return {
        success: true,
        message: res.message,
        data: res.data,
      };
    } catch (error: any) {
      const message =
        error.response.status === 400 ? 'Invalid credentials' : error.response.data.message;

      return {
        success: false,
        message: error.response.status >= 500 ? 'Something went wrong' : message,
        data: null,
      };
    }
  };

  return { isUserLoggedIn, getUser, login };
});

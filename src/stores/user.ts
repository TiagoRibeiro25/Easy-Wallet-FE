import { type IAPIResponse } from '@/api/types';
import { isEmailValid, isPasswordValid } from '@/lib/validateData';
import type { IUser } from '@/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import requests from '../api/requests/index';

export const useUserStore = defineStore('user', () => {
  const fetchedFirstTime = ref(false);
  const didAnErrorOccur = ref(false);
  const user = ref<IUser>();

  /**
   * Returns a boolean indicating whether the data has been fetched for the first time.
   * @returns {boolean} A boolean indicating whether the data has been fetched for the first time.
   */
  const didFetchFirstTime = (): boolean => fetchedFirstTime.value;

  /**
   * Updates the fetchedFirstTime value to true.
   * @returns void
   */
  const updateFetchedFirstTime = (): void => {
    fetchedFirstTime.value = true;
  };

  /**
   * Returns a boolean indicating whether an error occurred.
   * @returns {boolean} A boolean indicating whether an error occurred.
   */
  const didErrorOccur = (): boolean => didAnErrorOccur.value;

  /**
   * Sets the value of `didAnErrorOccur` to `true`.
   */
  const updateDidErrorOccur = (): void => {
    didAnErrorOccur.value = true;
  };

  /**
   * Checks if a user is currently logged in.
   * @returns {boolean} - True if a user is logged in, false otherwise.
   */
  const isUserLoggedIn = (): boolean => !!user.value;

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
      } catch (error: any) {
        if (error.response?.status !== 401 && !didFetchFirstTime()) {
          updateDidErrorOccur();
        }
      }
    }

    return user.value;
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
    if (!isEmailValid(email)) {
      return {
        success: false,
        message: 'Invalid email',
        data: null,
      };
    }

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

  /**
   * Logs out the current user.
   * @returns A Promise that resolves to an IAPIResponse object.
   */
  const logout = async (): Promise<IAPIResponse> => {
    try {
      const res = await requests.auth.logout();
      user.value = undefined;
      return {
        success: true,
        message: res.message,
        data: res.data,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Couldn't log out",
        data: null,
      };
    }
  };

  /**
   * Registers a new user with the provided email, display name, and password.
   * @param email The email address of the user to register.
   * @param displayName The display name of the user to register.
   * @param password The password of the user to register.
   * @returns A Promise that resolves to an IAPIResponse object.
   */
  const register = async (
    email: string,
    displayName: string,
    password: string,
  ): Promise<IAPIResponse> => {
    if (!isEmailValid(email)) {
      return {
        success: false,
        message: 'Invalid email',
        data: null,
      };
    }

    try {
      const res = await requests.auth.register(email, displayName, password);

      return {
        success: true,
        message: res.message,
        data: res.data,
      };
    } catch (error: any) {
      let message = error.response.data.message;

      if (error.response.status === 400) {
        if (message.toLowerCase().includes('email')) {
          message = 'Invalid email';
        } else if (message.toLowerCase().includes('password')) {
          message = 'Invalid password';
        } else if (message.toLowerCase().includes('display_name')) {
          message = 'Invalid username';
        }
      }

      return {
        success: false,
        message,
        data: null,
      };
    }
  };

  /**
   * Sends a forgot password request to the server.
   * @param email - The email address of the user.
   * @returns A Promise that resolves to an IAPIResponse object.
   */
  const forgotPassword = async (email: string): Promise<IAPIResponse> => {
    if (!isEmailValid(email)) {
      return {
        success: false,
        message: 'Invalid email',
        data: null,
      };
    }

    try {
      const res = await requests.auth.forgotPassword(email);
      return {
        success: true,
        message: res.message,
        data: res.data,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response.status === 400 ? 'Invalid email' : error.response.data.message,
        data: null,
      };
    }
  };

  /**
   * Changes the user's password.
   * @param token - The user's token.
   * @param password - The new password.
   * @returns An object containing the success status, a message, and data.
   */
  const changePassword = async (token: string, password: string): Promise<IAPIResponse> => {
    if (!isPasswordValid(password)) {
      return {
        success: false,
        message: 'Invalid password',
        data: null,
      };
    }

    try {
      const res = await requests.auth.resetPassword(token, password);
      return {
        success: true,
        message: res.message,
        data: res.data,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response.status === 400 ? 'Invalid password' : error.response.data.message,
        data: null,
      };
    }
  };

  /**
   * Verifies the user with the given token.
   * @param token The token to verify the user.
   * @returns A promise that resolves to an IAPIResponse object.
   */
  const verifyUser = async (token: string): Promise<IAPIResponse> => {
    try {
      const res = await requests.user.verifyUser(token);
      return {
        success: true,
        message: res.message,
        data: res.data,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response.data.message,
        data: null,
      };
    }
  };

  return {
    didFetchFirstTime,
    updateFetchedFirstTime,
    didErrorOccur,
    updateDidErrorOccur,
    isUserLoggedIn,
    getUser,
    login,
    logout,
    register,
    forgotPassword,
    changePassword,
    verifyUser,
  };
});

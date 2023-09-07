import { defineStore } from 'pinia';
import { ref } from 'vue';

interface User {
  id: number;
  name: string;
  email: string;
  picture: string;
}

export const useUserStore = defineStore('user', () => {
  const user = ref<User>();

  const getUser = async (): Promise<User | undefined | boolean> => {
    console.log(user);
    // return user.value;

    return true;
  };

  return { getUser };
});

import { defineStore } from 'pinia';
import { ref } from 'vue';

interface IUser {
  id: number;
  name: string;
  email: string;
  picture: string;
}

export const useUserStore = defineStore('user', () => {
  const user = ref<IUser>();

  const getUser = async (): Promise<IUser | undefined> => {
    return user.value;
  };

  const updateUser = (): void => {
    user.value = {
      id: 1,
      name: 'Tiago Ribeiro',
      email: 'random@email.com',
      picture: 'https://avatars.githubusercontent.com/u/92998482?v=4',
    };
  };

  return { getUser, updateUser };
});

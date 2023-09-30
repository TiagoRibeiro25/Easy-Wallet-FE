import { type INewNotification, type INotification } from '@/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useNotificationsStore = defineStore('notifications', () => {
  const notifications = ref<INotification[]>([]);

  /**
   * Returns the current notifications array.
   * @returns {INotification[]} The current notifications array.
   */
  const getAll = (): INotification[] => {
    return notifications.value;
  };

  /**
   * Adds a new notification to the notifications array.
   * The notification will be deleted after 5 seconds.
   * @param notification - The new notification to be added.
   * @returns {string} The id of the new notification.
   */
  const add = (notification: INewNotification): string => {
    const id = crypto.randomUUID();

    notifications.value.push({ ...notification, id });

    // Delete the notification after 5 seconds.
    setTimeout(() => {
      del(id);
    }, 5000);

    return id;
  };

  /**
   * Deletes a notification from the notifications array by its id.
   * @param id - The id of the notification to be deleted.
   */
  const del = (id: string) => {
    const index = notifications.value.findIndex((notification: INotification) => {
      return notification.id === id;
    });

    if (index !== -1) {
      notifications.value.splice(index, 1);
    }
  };

  return { getAll, add, del };
});

<script setup lang="ts">
import { useNotificationsStore } from '@/stores/notifications';
import { type INotification } from '@/types';
import { ref } from 'vue';
import CloseIcon from './Icons/close-icon.vue';

const notificationsStore = useNotificationsStore();
const notifications = ref<INotification[]>(notificationsStore.getAll());

const deleteIcon = (id: string) => {
  notificationsStore.del(id);
};
</script>

<template>
  <ul class="fixed bottom-0 right-0 z-50">
    <li
      v-for="notification in notifications"
      :key="notification.id"
      class="flex flex-col p-4 m-4 rounded-lg shadow-lg notification w-72"
      :class="{
        'bg-green-600 text-senaryColor': notification.type === 'success',
        'bg-red-600 text-senaryColor': notification.type === 'error',
        'bg-yellow-500 text-senaryColor': notification.type === 'warning',
        'bg-blue-500 text-senaryColor': notification.type === 'info',
      }"
    >
      <div class="flex flex-row space-x-5">
        <h2 class="text-lg font-bold">{{ notification.title }}</h2>
        <div class="flex justify-end flex-1">
          <CloseIcon class="w-6 h-6 cursor-pointer" @click="deleteIcon(notification.id)" />
        </div>
      </div>
      <span class="text-sm text-senaryColor">{{ notification.message }}</span>
    </li>
  </ul>
</template>

<style scoped>
.notification {
  animation: slide-in 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

@keyframes slide-in {
  0% {
    transform: translateX(-150px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>

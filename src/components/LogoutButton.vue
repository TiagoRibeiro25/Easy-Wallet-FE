<script setup lang="ts">
import { useNotificationsStore } from '@/stores/notifications';
import { useUserStore } from '@/stores/user';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import CustomButton from './CustomButton.vue';
import CustomModal from './CustomModal.vue';
import LeaveIcon from './Icons/leave-icon.vue';

const router = useRouter();
const userStore = useUserStore();
const notificationsStore = useNotificationsStore();

const showModal = ref<boolean>(false);
const loading = ref<boolean>(false);

/**
 * Handles the sign out confirmation button click event.
 * Sets the loading state to true, adds a notification, and calls the userStore's logout method.
 * Adds a notification with the result of the logout operation and sets the loading state to false.
 * Hides the modal and navigates to the Login page.
 */
const handleConfirm = async () => {
  loading.value = true;

  notificationsStore.add({
    type: 'info',
    title: 'Sign Out',
    message: 'Signing out...',
  });

  const res = await userStore.logout();

  notificationsStore.add({
    type: res.success ? 'success' : 'error',
    title: 'Sign Out',
    message: res.success ? res.message : "Couldn't sign out. Please try again.",
  });

  loading.value = false;
  showModal.value = false;

  await router.push({ name: 'Auth-Login' });
};
</script>

<template>
  <CustomButton
    id="logout-button"
    type="button"
    name="logout-button"
    :icon="LeaveIcon"
    icon-position="left"
    :disabled="loading"
    class="px-6 py-0.5 border bg-quaternaryColor text-quinaryColor hover:opacity-80 border-quaternaryColor focus:border-primaryColor dark:focus:border-septenaryColor disabled:cursor-default disabled:opacity-50"
    @click="showModal = true"
  >
    <template v-slot:default>
      <span class="font-medium"> Logout </span>
    </template>
  </CustomButton>

  <!-- Confirmation Modal -->
  <CustomModal id="logout-modal" title="Sign Out" :show="showModal" @close="showModal = false">
    <template v-slot:body>
      <p class="text-lg text-center">Are you sure you want to sign out?</p>
    </template>
    <template v-slot:footer>
      <div class="flex flex-row w-full justify-evenly">
        <CustomButton
          type="button"
          id="submit-logout"
          name="submit-logout"
          class="w-[125px] px-4 sm:px-4 bg-quaternaryColor text-quinaryColor focus:border focus:border-primaryColor dark:focus:border-septenaryColor hover:opacity-80 disabled:cursor-default disabled:opacity-50"
          :icon="LeaveIcon"
          icon-position="left"
          :disabled="loading"
          @click="handleConfirm"
        >
          <template v-slot:default>
            <span class="font-medium"> Sign Out </span>
          </template>
        </CustomButton>

        <CustomButton
          type="button"
          id="cancel-logout"
          name="cancel-logout"
          class="w-[125px] hidden sm:block border border-octonaryColor bg-senaryColor hover:bg-septenaryColor dark:border-tertiaryColor dark:bg-primaryColor dark:hover:bg-tertiaryColor dark:hover:border-primaryColor focus:border-septenaryColor dark:focus:border-septenaryColor disabled:cursor-default disabled:opacity-50"
          @click="showModal = false"
        >
          <template v-slot:default>
            <span class="font-medium"> Cancel </span>
          </template>
        </CustomButton>
      </div>
    </template>
  </CustomModal>
</template>

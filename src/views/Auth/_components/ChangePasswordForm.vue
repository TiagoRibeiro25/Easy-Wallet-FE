<script setup lang="ts">
import CustomButton from '@/components/CustomButton.vue';
import CustomInput from '@/components/CustomInput.vue';
import EditIcon from '@/components/Icons/edit-icon.vue';
import { useNotificationsStore } from '@/stores/notifications';
import { useUserStore } from '@/stores/user';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const userStore = useUserStore();
const notificationsStore = useNotificationsStore();

const password = ref<string>('');
const confirmPassword = ref<string>('');
const loading = ref<boolean>(false);

/**
 * Handles the submission of the change password form.
 * @returns {Promise<void>}
 */
const handleSubmit = async (): Promise<void> => {
  loading.value = true;
  notificationsStore.add({
    type: 'info',
    title: 'Authentication',
    message: 'Updating password...',
  });

  const res = await userStore.changePassword(route.params.token as string, password.value);

  notificationsStore.add({
    type: res.success ? 'success' : 'error',
    title: 'Authentication',
    message: res.message,
  });

  // If the response was a success, redirect to the login view
  if (res.success) {
    await router.push({ name: 'Login' });
  }

  loading.value = false;
};
</script>

<template>
  <div class="h-96">
    <h1 class="text-xl text-center">Change Password</h1>
    <p class="mt-8 text-sm text-center opacity-90">
      Enter your new password below. Your password must be at least 4 characters long.
    </p>

    <form id="change-password-form" class="mt-12 space-y-6" @submit.prevent="handleSubmit">
      <CustomInput
        id="password"
        type="password"
        name="Password"
        auto-complete="password"
        placeholder="Password"
        v-model="password"
        :disabled="loading"
        required
      />

      <CustomInput
        id="confirm-password"
        type="password"
        name="Confirm-password"
        auto-complete="confirm-password"
        placeholder="Confirm-password"
        v-model="confirmPassword"
        :disabled="loading"
        required
      />

      <div class="flex justify-center pt-6">
        <CustomButton
          id="login-button"
          type="submit"
          name="Log in"
          :icon="EditIcon"
          icon-position="left"
          :disabled="loading || password !== confirmPassword"
          class="px-6 bg-quaternaryColor text-quinaryColor hover:opacity-80 focus:border focus:border-primaryColor dark:focus:border-septenaryColor disabled:cursor-default disabled:opacity-50"
        >
          <template v-slot:default>
            <span class="font-medium"> Update Password </span>
          </template>
        </CustomButton>
      </div>
    </form>
  </div>
</template>

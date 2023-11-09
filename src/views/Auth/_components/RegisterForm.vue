<script setup lang="ts">
import CustomButton from '@/components/CustomButton.vue';
import CustomInput from '@/components/CustomInput.vue';
import RegisterIcon from '@/components/Icons/register-icon.vue';
import { useNotificationsStore } from '@/stores/notifications';
import { useUserStore } from '@/stores/user';
import { ref } from 'vue';

const userStore = useUserStore();
const notificationsStore = useNotificationsStore();

const email = ref<string>('');
const displayName = ref<string>('');
const password = ref<string>('');
const loading = ref<boolean>(false);

/**
 * This function handles the form submission for user registration.
 * It sets the loading state to true, adds an info notification, and calls the userStore's register
 * method with the email, display name, and password values.
 * After the registration attempt, it adds a success or error notification depending on the response
 * from the server and sets the loading state to false.
 */
const handleSubmit = async (): Promise<void> => {
  loading.value = true;
  notificationsStore.add({
    type: 'info',
    title: 'Authentication',
    message: 'Signing up...',
  });

  const res = await userStore.register(email.value, displayName.value, password.value);

  notificationsStore.add({
    type: res.success ? 'success' : 'error',
    title: 'Authentication',
    message: res.success
      ? 'Account created! Please check your email to verify your account.'
      : res.message,
  });

  loading.value = false;
};
</script>

<template>
  <div class="sm:h-96">
    <h1 class="text-xl text-center">Create an account to start using the app</h1>

    <form id="register-form" class="mt-12 space-y-6" @submit.prevent="handleSubmit">
      <CustomInput
        id="email"
        type="email"
        name="Email"
        auto-complete="email"
        placeholder="Email"
        v-model="email"
        :disabled="loading"
        required
      />

      <CustomInput
        id="username"
        type="text"
        name="Username"
        auto-complete="Username"
        placeholder="Username"
        v-model="displayName"
        :disabled="loading"
        required
      />

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

      <p class="mx-5 text-xs text-center dark:text-septenaryColor">
        By signing up, you agree to our
        <RouterLink :to="{ name: 'Terms' }" class="hover:underline text-quaternaryColor"
          >Terms</RouterLink
        >. Learn how we collect and use your data in our
        <RouterLink :to="{ name: 'Privacy' }" class="hover:underline text-quaternaryColor">
          Privacy Policy
        </RouterLink>
        and how we use cookies and similar technology in our Cookies Policy.
      </p>

      <div class="flex justify-center">
        <CustomButton
          id="login-button"
          type="submit"
          name="Log in"
          :icon="RegisterIcon"
          icon-position="left"
          :disabled="loading"
          class="px-6 border border-quaternaryColor bg-quaternaryColor text-quinaryColor hover:opacity-80 focus:border-primaryColor dark:focus:border-septenaryColor disabled:cursor-default disabled:opacity-50"
        >
          <template v-slot:default>
            <span class="font-medium"> Sign Up </span>
          </template>
        </CustomButton>
      </div>
    </form>
  </div>
</template>

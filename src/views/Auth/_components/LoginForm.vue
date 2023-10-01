<script setup lang="ts">
import CustomButton from '@/components/CustomButton.vue';
import CustomInput from '@/components/CustomInput.vue';
import CustomSelectBox from '@/components/CustomSelectBox.vue';
import LoginIcon from '@/components/Icons/enter-icon.vue';
import { useNotificationsStore } from '@/stores/notifications';
import { useUserStore } from '@/stores/user';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const userStore = useUserStore();
const notificationsStore = useNotificationsStore();

const email = ref<string>('');
const password = ref<string>('');
const rememberMe = ref<boolean>(false);
const loading = ref<boolean>(false);

const handleSubmit = async () => {
  loading.value = true;
  notificationsStore.add({
    type: 'info',
    title: 'Authentication',
    message: 'Logging in...',
  });

  const res = await userStore.login(email.value, password.value, rememberMe.value);

  if (!res.success) {
    notificationsStore.add({
      type: 'error',
      title: 'Authentication',
      message: res.message,
    });
  } else {
    notificationsStore.add({
      type: 'success',
      title: 'Authentication',
      message: 'Logged in successfully',
    });

    await router.push({ name: 'Dashboard' });
  }

  loading.value = false;
};
</script>

<template>
  <div class="h-96">
    <h2 class="text-xl text-center">Log in to your account</h2>

    <form class="mt-12 mb-8 space-y-6" @submit.prevent="handleSubmit">
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
        id="password"
        type="password"
        name="Password"
        auto-complete="password"
        placeholder="Password"
        v-model="password"
        :disabled="loading"
        required
      />

      <CustomSelectBox
        id="remember_me"
        text="Remember me"
        v-model="rememberMe"
        :disabled="loading"
      />

      <div class="flex justify-center">
        <CustomButton
          id="login-button"
          type="submit"
          name="Log in"
          :icon="LoginIcon"
          icon-position="left"
          :disabled="loading"
          class="px-6 border border-octonaryColor bg-senaryColor hover:bg-septenaryColor dark:border-tertiaryColor dark:bg-primaryColor dark:hover:bg-tertiaryColor dark:hover:border-primaryColor focus:border-quaternaryColor dark:focus:border-quaternaryColor disabled:cursor-default disabled:opacity-50"
        >
          <template v-slot:default>
            <span class="font-medium"> Sign In </span>
          </template>
        </CustomButton>
      </div>
    </form>

    <div class="flex flex-col space-y-1 text-sm text-center">
      <span>
        <button
          class="transition-all duration-300 ease-in-out opacity-50 hover:opacity-100 hover:underline"
        >
          Forgot your password?
        </button>
      </span>
      <span>
        <RouterLink
          :to="{ name: 'Register' }"
          class="transition-all duration-300 ease-in-out opacity-50 hover:opacity-100 hover:underline"
        >
          Don't have an account?
        </RouterLink>
      </span>
    </div>
  </div>
</template>

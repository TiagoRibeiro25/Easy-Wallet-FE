<script setup lang="ts">
import CustomButton from '@/components/CustomButton.vue';
import CustomInput from '@/components/CustomInput.vue';
import CustomModalVue from '@/components/CustomModal.vue';
import SendEmailIcon from '@/components/Icons/dashboard-icon.vue';
import { ref, watch, watchEffect } from 'vue';

interface IProps {
  modelValue: boolean;
}

const props = defineProps<IProps>();
const emits = defineEmits(['update:modelValue']);

const showModal = ref<boolean>(props.modelValue);
const email = ref<string>('');
const loading = ref<boolean>(false);

const handleSubmit = () => {
  console.log('hello world');
};

watch(showModal, value => {
  emits('update:modelValue', value);
});

watchEffect(() => {
  showModal.value = props.modelValue;
});
</script>

<template>
  <CustomModalVue
    id="login-modal"
    title="Forgot Password"
    :show="showModal"
    @close="showModal = false"
  >
    <template v-slot:body>
      <p class="mb-6 text-center text-md">
        Enter the email address associated with your account <br class="hidden sm:block" />
        and we'll send you a link to reset your password.
      </p>
      <form @submit.prevent="handleSubmit">
        <CustomInput
          id="forgot-password-email"
          type="email"
          name="forgot-password-email"
          auto-complete="email"
          placeholder="Account Email"
          v-model="email"
          :disabled="loading"
          required
        />
      </form>
    </template>
    <template v-slot:footer>
      <div class="flex flex-row w-full justify-evenly">
        <CustomButton
          type="submit"
          id="submit-forgot-password"
          name="submit-forgot-password"
          class="sm:w-[145px] px-4 sm:px-4 bg-quaternaryColor text-quinaryColor focus:border focus:border-primaryColor dark:focus:border-septenaryColor hover:opacity-80 disabled:cursor-default disabled:opacity-50"
          :icon="SendEmailIcon"
          icon-position="left"
          :disabled="loading"
          @click="handleSubmit"
        >
          <template v-slot:default>
            <span class="font-medium"> Send Email </span>
          </template>
        </CustomButton>

        <CustomButton
          type="button"
          id="cancel-forgot-password"
          name="cancel-forgot-password"
          class="w-[145px] hidden sm:block border border-octonaryColor bg-senaryColor hover:bg-septenaryColor dark:border-tertiaryColor dark:bg-primaryColor dark:hover:bg-tertiaryColor dark:hover:border-primaryColor focus:border-septenaryColor dark:focus:border-septenaryColor disabled:cursor-default disabled:opacity-50"
          @click="showModal = false"
        >
          <template v-slot:default>
            <span class="font-medium"> Cancel </span>
          </template>
        </CustomButton>
      </div>
    </template>
  </CustomModalVue>
</template>

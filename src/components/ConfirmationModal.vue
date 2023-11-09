<script lang="ts">
interface IProps {
  modelValue: boolean;
  title: string;
  text: string;
}
</script>

<script setup lang="ts">
import CustomModalVue from '@/components/CustomModal.vue';
import { ref, watch, watchEffect } from 'vue';
import CustomButton from './CustomButton.vue';

const props = defineProps<IProps>();
const emits = defineEmits(['update:modelValue', 'onConfirm']);

const showModal = ref<boolean>(props.modelValue);

const handleConfirm = (): void => {
  emits('onConfirm');
  showModal.value = false;
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
    id="confirm-modal"
    :title="props.title"
    :show="showModal"
    @close="() => (showModal = false)"
  >
    <template v-slot:body>
      <p class="text-center">{{ props.text }}</p>
    </template>
    <template v-slot:footer>
      <div
        class="flex flex-col items-center w-full space-y-5 sm:space-y-0 sm:flex-row sm:justify-evenly"
      >
        <CustomButton
          id="confirm-action-button"
          name="confirm-action-button"
          class="justify-center w-full sm:w-[145px] bg-quaternaryColor text-quinaryColor focus:border focus:border-primaryColor dark:focus:border-septenaryColor hover:opacity-80"
          @click="handleConfirm"
        >
          <template v-slot:default>
            <span class="font-medium"> Yes </span>
          </template>
        </CustomButton>

        <CustomButton
          id="cancel-action-button"
          name="cancel-action-button"
          class="justify-center w-full sm:w-[145px] border border-octonaryColor bg-senaryColor hover:bg-septenaryColor dark:border-tertiaryColor dark:bg-primaryColor dark:hover:bg-tertiaryColor dark:hover:border-primaryColor focus:border-septenaryColor dark:focus:border-septenaryColor"
          @click="() => (showModal = false)"
        >
          <template v-slot:default>
            <span class="font-medium"> No </span>
          </template>
        </CustomButton>
      </div>
    </template>
  </CustomModalVue>
</template>

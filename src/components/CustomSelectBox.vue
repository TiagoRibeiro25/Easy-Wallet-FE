<script lang="ts">
interface IProps {
  id: string;
  text: string;
  modelValue: boolean;
  required?: boolean;
  disabled?: boolean;
}
</script>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<IProps>();
const emits = defineEmits(['update:modelValue']);

const localValue = ref<boolean>(props.modelValue);

const handleChange = () => {
  localValue.value = !localValue.value;
  emits('update:modelValue', localValue.value);
};
</script>

<template>
  <!-- TODO: Find a way to change the background to the quaternaryColor when the box is selected -->
  <div class="flex items-center">
    <input
      :id="props.id"
      type="checkbox"
      :value="localValue"
      :required="required"
      :disabled="disabled"
      @change="handleChange"
      class="w-4 h-4 rounded-lg cursor-pointer border-septenaryColor focus:ring-quaternaryColor dark:focus:ring-quaternaryColor dark:ring-offset-quaternaryColor focus:ring-1 dark:bg-quaternaryColor dark:border-quaternaryColor focus:outline-none"
    />
    <label
      :for="id"
      class="ml-2 text-sm text-gray-900 cursor-pointer select-none dark:text-gray-300"
    >
      {{ text }}
    </label>
  </div>
</template>

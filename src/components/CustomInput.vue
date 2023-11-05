<script lang="ts">
interface InputProps {
  placeholder?: string;
  type: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search';
  name: string;
  id: string;
  modelValue: string;
  required?: boolean;
  disabled?: boolean;
  autoComplete?: string;
}
</script>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<InputProps>();
const emits = defineEmits(['update:modelValue']);

const localValue = ref<string>(props.modelValue);

watch(localValue, value => {
  emits('update:modelValue', value);
});

const updateValue = (event: Event) => {
  if (event instanceof Event && event.target instanceof HTMLInputElement) {
    localValue.value = event.target.value;
  }
};
</script>

<template>
  <input
    :id="props.id"
    :type="props.type"
    :name="props.name"
    :placeholder="props.placeholder"
    :value="localValue"
    :required="props.required"
    :disabled="props.disabled"
    :autocomplete="props.autoComplete"
    @input="updateValue($event)"
    class="w-full px-4 py-2 border rounded-lg focus:outline-none border-octonaryColor bg-senaryColor dark:border-tertiaryColor dark:bg-primaryColor focus:border-quaternaryColor active:border-quaternaryColor dark:focus:border-quaternaryColor dark:active:border-quaternaryColor disabled:opacity-50 disabled:cursor-not-allowed"
  />
</template>

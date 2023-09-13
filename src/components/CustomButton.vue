<script setup lang="ts">
interface IProps {
  id?: string;
  name: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  icon?: any;
  iconPosition?: 'left' | 'right';
}

type IEmits = (event: 'click') => void;

const props = defineProps<IProps>();
const emits = defineEmits<IEmits>();
</script>

<template>
  <button
    class="flex items-center px-4 py-2 font-semibold transition duration-200 ease-in-out rounded-md shadow-sm text-quinaryColor bg-quaternaryColor hover:bg-opacity-90 focus:outline-none disabled:cursor-default"
    :id="props.id || props.name"
    :type="props.type || 'button'"
    :disabled="props.disabled || false"
    @click="emits('click')"
  >
    <slot v-if="props.iconPosition !== 'left'" name="default"></slot>
    <props.icon :class="props.iconPosition === 'left' ? 'mr-1' : 'ml-1'" />
    <slot v-if="props.iconPosition === 'left'" name="default"></slot>
  </button>
</template>

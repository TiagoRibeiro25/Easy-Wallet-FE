<script setup lang="ts">
interface IProps {
  id?: string;
  name: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  icon?: string;
  iconPosition?: 'left' | 'right';
}

const props = defineProps<IProps>();
</script>

<template>
  <button
    :id="props.id || props.name"
    :type="props.type || 'button'"
    :disabled="props.disabled || false"
    :class="`flex items-center justify-center px-4 py-2 text-lg font-semibold text-quinaryColor transition duration-200 ease-in-out rounded-md shadow-sm bg-quaternaryColor hover:bg-opacity-90 focus:outline-none ${
      props.iconPosition === 'left' ? 'space-x-2' : 'space-x-reverse'
    }`"
  >
    <slot name="default"></slot>
  </button>
</template>

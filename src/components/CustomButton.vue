<script setup lang="ts">
interface IProps {
  id?: string;
  name: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  icon?: any;
  iconPosition?: 'left' | 'right';
}

const props = defineProps<IProps>();
</script>

<template>
  <button
    :id="props.id || props.name"
    :type="props.type || 'button'"
    :disabled="props.disabled || false"
    class="flex items-center justify-center px-4 py-2 text-lg font-semibold transition duration-200 ease-in-out rounded-md shadow-sm text-quinaryColor bg-quaternaryColor hover:bg-opacity-90 focus:outline-none"
  >
    <div class="flex items-center">
      <slot v-if="props.iconPosition !== 'left'" name="default"></slot>
      <props.icon :class="props.iconPosition === 'left' ? 'mr-1' : 'ml-1'" />
      <slot v-if="props.iconPosition === 'left'" name="default"></slot>
    </div>
  </button>
</template>

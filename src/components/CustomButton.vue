<script lang="ts">
interface IProps {
  id?: string;
  name: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  icon?: any;
  iconPosition?: 'left' | 'right';
}

type Emits = (event: 'click') => void;
</script>

<script setup lang="ts">
const props = defineProps<IProps>();
const emits = defineEmits<Emits>();
</script>

<template>
  <button
    class="flex items-center px-4 py-2 space-x-2 font-semibold transition duration-200 ease-in-out rounded-md hover:bg-opacity-90 focus:outline-none"
    :id="props.id || props.name"
    :type="props.type || 'button'"
    :disabled="props.disabled || false"
    @click="emits('click')"
  >
    <slot v-if="props.iconPosition !== 'left'" name="default"></slot>
    <props.icon />
    <slot v-if="props.iconPosition === 'left'" name="default"></slot>
  </button>
</template>

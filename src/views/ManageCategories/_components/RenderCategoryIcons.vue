<script lang="ts">
interface IProps {
  selectedIconId: number;
}

type Emits = (event: 'update:selectedIconId', icon: number) => void;
</script>

<script setup lang="ts">
import RenderCategoryIcon from '@/components/RenderCategoryIcon.vue';
import { ref, watch } from 'vue';

const props = defineProps<IProps>();
const emits = defineEmits<Emits>();
const icons = import.meta.glob('../../../components/Icons/category/*.vue');

const selectedIcon = ref<number>(props.selectedIconId);

const getIconId = (path: string): number => {
  const splitPath = path.split('/');
  const iconId = splitPath[splitPath.length - 1].split('.')[0].split('-')[1];
  return parseInt(iconId);
};

const handleChange = (icon: number): void => {
  selectedIcon.value = icon;
  emits('update:selectedIconId', icon);
};

watch(
  () => props.selectedIconId,
  value => {
    selectedIcon.value = value;
  },
);
</script>

<template>
  <div class="flex flex-wrap justify-center min-h-[47px] max-h-[219px] overflow-y-auto wrapper">
    <RenderCategoryIcon
      v-for="icon in Object.keys(icons)"
      :key="icon"
      :icon-id="getIconId(icon)"
      class="m-5 scale-125 cursor-pointer hover:opacity-75"
      :class="{ 'text-quaternaryColor': getIconId(icon) === selectedIcon }"
      @click="handleChange(getIconId(icon))"
    />
  </div>
</template>

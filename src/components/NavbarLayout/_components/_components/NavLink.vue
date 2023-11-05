<script lang="ts">
interface IProps {
  name: string;
  icon?: any;
  route: { name: string; params?: { year: number } };
  customDarkBorder?: 'primary' | 'secondary';
}
</script>

<script setup lang="ts">
import CustomButton from '@/components/CustomButton.vue';
import { useRoute } from 'vue-router';

const props = defineProps<IProps>();
const routeHook = useRoute();

const darkBorder =
  props.customDarkBorder === 'primary' || !props.customDarkBorder
    ? 'dark:border-septenaryColor'
    : 'dark:border-tertiaryColor';
</script>

<template>
  <RouterLink :key="props.name" :to="{ name: props.route.name, params: props.route.params }">
    <CustomButton
      :id="props.name.toLowerCase() + '-button'"
      :name="props.name.toLowerCase() + '-button'"
      class="py-[4px] my-3 w-[175px] sm:w-[200px] justify-center sm:justify-start border text-base disabled:opacity-100"
      :class="
        routeHook.name?.toString().includes(props.route.name)
          ? 'text-quinaryColor dark:border-quaternaryColor bg-quaternaryColor'
          : `dark:text-septenaryColor ${darkBorder} bg-transparent dark:hover:bg-tertiaryColor hover:bg-septenaryColor`
      "
      :icon="props.icon"
      icon-position="left"
      :disabled="routeHook.name?.toString().startsWith(props.route.name)"
    >
      <template v-slot:default>
        <span class="font-medium sm:ml-2">{{ props.name }}</span>
      </template>
    </CustomButton>
  </RouterLink>
</template>

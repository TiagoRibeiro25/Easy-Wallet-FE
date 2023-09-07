<script setup lang="ts">
import CustomButton from '@/components/CustomButton.vue';
import { useRoute } from 'vue-router';

interface IProps {
  name: string;
  icon: any;
  route: { name: string; params?: { year: number } };
}

const props = defineProps<IProps>();
const routeHook = useRoute();
</script>

<template>
  <RouterLink :key="props.name" :to="{ name: props.route.name, params: props.route.params }">
    <CustomButton
      :id="props.name.toLowerCase() + '-button'"
      :name="props.name.toLowerCase() + '-button'"
      class="py-1 my-3 w-[200px] justify-start border text-base disabled:opacity-100"
      :class="
        routeHook.name === props.route.name
          ? 'text-quinaryColor dark:border-quinaryColor bg-quaternaryColor'
          : 'dark:text-septenaryColor dark:border-septenaryColor bg-transparent dark:hover:bg-tertiaryColor hover:bg-septenaryColor'
      "
      :icon="props.icon"
      icon-position="left"
      :disabled="routeHook.name === props.route.name"
    >
      <template v-slot:default>
        <span class="ml-2 font-medium">{{ props.name }}</span>
      </template>
    </CustomButton>
  </RouterLink>
</template>

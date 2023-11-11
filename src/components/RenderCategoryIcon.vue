<script lang="ts">
interface IProps {
  iconId: number;
}
</script>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const props = defineProps<IProps>();

const TOTAL_ICONS = 10;

const Icon = defineAsyncComponent(() => import(`./Icons/category/icon-${props.iconId}.vue`));
</script>

<template>
  <span v-if="props.iconId < 1 || props.iconId > TOTAL_ICONS" class="font-semibold text-center">
    ?
  </span>
  <Icon v-else />
</template>

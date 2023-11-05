<script lang="ts">
interface IProps {
  iconId: number;
}
</script>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const props = defineProps<IProps>();

const Icon = defineAsyncComponent(() => import(`./Icons/category/icon-${props.iconId}.vue`));
</script>

<template>
  <Icon />
</template>

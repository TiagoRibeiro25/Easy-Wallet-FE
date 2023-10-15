<script setup lang="ts">
import { defineAsyncComponent, defineProps } from 'vue';

interface IProps {
  iconId: number;
}

const props = defineProps<IProps>();

const Icon = defineAsyncComponent(() => import(`./Icons/category/icon-${props.iconId}.vue`));
</script>

<template>
  <Icon />
</template>

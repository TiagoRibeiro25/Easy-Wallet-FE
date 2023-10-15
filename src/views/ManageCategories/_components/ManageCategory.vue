<script setup lang="ts">
import type { ICategory } from '@/types';

interface IProps {
  category: ICategory;
}

const props = defineProps<IProps>();
</script>

<template>
  <div>
    {{ JSON.stringify(props.category) }}
  </div>
</template>

<script setup lang="ts">
import LoadingIcon from '@/components/Icons/loading-icon.vue';
import { useUserStore } from '@/stores/user';
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const userStore = useUserStore();
const statusMsg = ref<string>('');

onBeforeMount(async () => {
  const token = route.params.token as string;
  const res = await userStore.verifyUser(token);

  statusMsg.value = res.message;
});
</script>

<template>
  <div class="flex items-center justify-center h-96">
    <h1 class="text-xl text-center">{{ statusMsg }}</h1>

    <LoadingIcon v-if="!statusMsg" class="w-12 h-12" />
  </div>
</template>

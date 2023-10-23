<script setup lang="ts">
import { useCategoriesStore } from '@/stores/categories';
import type { ICategory } from '@/types';
import { ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const categoriesStore = useCategoriesStore();
const category = ref<ICategory | undefined>(undefined);

watchEffect(() => {
  const categoryId = route.params.id as string;
  category.value = categoriesStore.getOne(+categoryId);

  if (!category.value) {
    router.push({ name: 'Categories-AddCategory' });
  }
});
</script>

<template>
  <div>
    <p class="text-justify">
      <span class="block mb-6 truncate">
        {{ JSON.stringify(category) }}
      </span>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi, vitae officiis, tempora sunt
      necessitatibus modi aut quis deleniti optio blanditiis eum itaque dolores accusamus labore
      dolor reiciendis voluptatem nihil rerum repudiandae in corporis eius ullam nisi. Qui incidunt
      neque molestias, suscipit exercitationem ipsum voluptates at fuga possimus reprehenderit,
      natus praesentium optio. Quibusdam, esse eum autem maxime provident quidem itaque amet beatae
      blanditiis neque soluta sapiente qui sit corporis ipsum eveniet, ipsa iste? Ipsam rem expedita
      repellendus voluptatum quae tenetur odit assumenda! Neque dolores rem vero saepe quo ex
      molestias amet aspernatur quia eligendi, et nesciunt illo quaerat suscipit maxime labore.
    </p>
  </div>
</template>

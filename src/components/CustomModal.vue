<script setup lang="ts">
import CloseIconVue from './Icons/close-icon.vue';

interface IProps {
  id: string;
  title: string;
  show: boolean;
}

const props = defineProps<IProps>();
const emits = defineEmits(['close']);

const handleClickOutside = (e: MouseEvent) => {
  if (e.target === e.currentTarget) {
    emits('close');
  }
};
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-show="props.show"
        :id="props.id"
        tabindex="-1"
        class="fixed inset-0 z-50 flex items-center justify-center w-full h-full px-3 bg-black bg-opacity-50"
        @click="handleClickOutside"
      >
        <div class="relative overflow-y-auto rounded-lg shadow max-h-[90vh] w-[90vw] max-w-2xl">
          <!-- Modal content -->
          <div
            class="relative border rounded-lg shadow bg-senaryColor dark:bg-secondaryColor border-octonaryColor dark:border-tertiaryColor"
          >
            <header
              class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600"
            >
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">{{ title }}</h3>
              <button
                type="button"
                class="inline-flex items-center justify-center w-8 h-8 ml-auto text-sm text-gray-400 transition-all duration-300 ease-in-out bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                @click="$emit('close')"
              >
                <CloseIconVue class="w-6 h-6" />
                <span class="sr-only">Close modal</span>
              </button>
            </header>

            <main class="p-6">
              <slot name="body"></slot>
            </main>

            <footer
              class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600"
            >
              <slot name="footer"></slot>
            </footer>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

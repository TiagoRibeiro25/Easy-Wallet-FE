<script setup lang="ts">
import CustomButton from '@/components/CustomButton.vue';
import AddIcon from '@/components/Icons/add-icon.vue';
import CalendarIcon from '@/components/Icons/calendar-icon.vue';
import CategoryIcon from '@/components/Icons/category-icon.vue';
import DashboardIcon from '@/components/Icons/dashboard-icon.vue';
import GetHelpIcon from '@/components/Icons/get-help-icon.vue';
import PreviousYearsIcon from '@/components/Icons/previous-years-icon.vue';
import SearchIcon from '@/components/Icons/search-icon.vue';
import SettingsIcon from '@/components/Icons/settings-icon.vue';
import LogoName from '@/components/LogoName.vue';
import ThemeSwitcher from '@/components/ThemeSwitcher.vue';
import { isUserOnDesktop } from '@/lib/utils';
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import NavLink from './_components/NavLink.vue';

interface INavigationLink {
  name: string;
  icon: any;
  route: { name: string; params?: { year: number } };
}

const topNavigationLinks: INavigationLink[] = [
  {
    name: 'Dashboard',
    icon: DashboardIcon,
    route: { name: 'Dashboard' },
  },
  {
    name: 'Calendar',
    icon: CalendarIcon,
    route: { name: 'Calendar', params: { year: new Date().getFullYear() } },
  },
  {
    name: 'Add Expense',
    icon: AddIcon,
    route: { name: 'AddExpense' },
  },
  {
    name: 'Categories',
    icon: CategoryIcon,
    route: { name: 'Categories' },
  },
  {
    name: 'Previous Years',
    icon: PreviousYearsIcon,
    route: { name: 'Years' },
  },
];

/**
 * Computed property that returns the title to be displayed in the mobile navigation bar.
 * The title is based on the current route name.
 *
 * @returns {string} The title to be displayed in the mobile navigation bar.
 */
const getMobileNavTitle = computed(() => {
  const routeHook = useRoute();

  switch (routeHook.name) {
    case 'Settings':
      return 'Settings';
    case 'GetHelp':
      return 'Get Help';
    default:
      return 'Easy Wallet';
  }
});
</script>

<template>
  <!-- Desktop Navbar -->
  <nav
    class="hidden w-[250px] bg-senaryColor dark:bg-secondaryColor h-screen flex-col justify-start items-center p-3 border-r border-septenaryColor dark:border-tertiaryColor wrapper overflow-y-auto"
    :class="isUserOnDesktop() ? 'sm:flex' : ''"
    aria-label="Main Desktop Navigation"
  >
    <LogoName clickable />

    <CustomButton
      id="search-button"
      name="search-button"
      class="py-[4px] my-10 w-[200px] justify-start bg-transparent border dark:border-septenaryColor dark:text-septenaryColor"
      :icon="SearchIcon"
      icon-position="left"
    >
      <template v-slot:default>
        <span class="ml-2 text-base font-medium opacity-60">Search</span>
      </template>
    </CustomButton>

    <div class="mb-8">
      <NavLink
        v-for="link in topNavigationLinks"
        :key="link.name"
        :name="link.name"
        :icon="link.icon"
        :route="link.route"
      />
    </div>

    <div class="mt-auto">
      <NavLink
        name="Get Help"
        :icon="GetHelpIcon"
        :route="{ name: 'GetHelp' }"
        custom-dark-border="secondary"
      />

      <ThemeSwitcher
        class="w-[200px] py-1 dark:border-senaryColor rounded-md px-4 space-x-4 dark:bg-transparent"
        showText
      />

      <NavLink
        name="Settings"
        :icon="SettingsIcon"
        :route="{ name: 'Settings' }"
        custom-dark-border="secondary"
      />
    </div>
  </nav>

  <!-- Mobile Navbar -->
  <nav
    class="w-full fixed flex flex-col h-[120px] border-b bg-senaryColor dark:bg-secondaryColor border-septenaryColor dark:border-tertiaryColor"
    :class="isUserOnDesktop() ? 'sm:hidden' : ''"
    aria-label="Main Mobile Navigation"
  >
    <div class="flex flex-wrap items-center justify-between px-4 h-1/2">
      <RouterLink :to="{ name: 'Settings' }">
        <SettingsIcon class="w-11 h-11" />
      </RouterLink>

      <span class="self-center text-2xl"> {{ getMobileNavTitle }} </span>

      <RouterLink :to="{ name: 'GetHelp' }">
        <GetHelpIcon class="w-11 h-11" />
      </RouterLink>
    </div>
    <div class="flex flex-row px-4 h-1/2">
      <div class="flex flex-row justify-between w-full px-1 space-x-5 overflow-x-auto wrapper">
        <NavLink
          v-for="link in topNavigationLinks"
          :key="link.name"
          :name="link.name"
          :icon="link.icon"
          :route="link.route"
          draggable="false"
        />
      </div>
    </div>
  </nav>
</template>

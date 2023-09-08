<script setup lang="ts">
import Logo from '@/assets/logo.png';
import CustomButton from '@/components/CustomButton.vue';
import AddIcon from '@/components/Icons/add-icon.vue';
import CalendarIcon from '@/components/Icons/calendar-icon.vue';
import CategoryIcon from '@/components/Icons/category-icon.vue';
import DashboardIcon from '@/components/Icons/dashboard-icon.vue';
import GetHelpIcon from '@/components/Icons/get-help-icon.vue';
import PreviousYearsIcon from '@/components/Icons/previous-years-icon.vue';
import SearchIcon from '@/components/Icons/search-icon.vue';
import SettingsIcon from '@/components/Icons/settings-icon.vue';
import ThemeSwitcher from '@/components/ThemeSwitcher.vue';
import { RouterLink } from 'vue-router';
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

const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
</script>

<template>
  <nav
    class="w-[250px] bg-senaryColor dark:bg-secondaryColor h-screen flex flex-col justify-start items-center p-3 border-r border-septenaryColor dark:border-tertiaryColor wrapper overflow-y-auto"
  >
    <RouterLink :to="{ name: 'Dashboard' }" class="flex flex-row" @click="scrollTop()">
      <img :src="Logo" alt="Easy Wallet" width="32" height="32" />
      <span class="self-center mt-1 ml-2 text-2xl whitespace-nowrap hover:text-quaternaryColor">
        Easy Wallet
      </span>
    </RouterLink>

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
        @click="scrollTop()"
      />
    </div>

    <div class="mt-auto">
      <NavLink
        name="Get Help"
        :icon="GetHelpIcon"
        :route="{ name: 'GetHelp' }"
        custom-dark-border="secondary"
        @click="scrollTop()"
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
        @click="scrollTop()"
      />
    </div>
  </nav>
</template>

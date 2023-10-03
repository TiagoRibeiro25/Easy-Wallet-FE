import AddIcon from '@/components/Icons/add-icon.vue';
import CalendarIcon from '@/components/Icons/calendar-icon.vue';
import CategoryIcon from '@/components/Icons/category-icon.vue';
import DashboardIcon from '@/components/Icons/dashboard-icon.vue';
import PreviousYearsIcon from '@/components/Icons/previous-years-icon.vue';

interface INavigationLink {
  name: string;
  icon: any;
  route: { name: string; params?: { year: number } };
}

const topNavigationLinks: readonly INavigationLink[] = [
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

export default topNavigationLinks;

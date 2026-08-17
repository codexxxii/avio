import {
  LayoutDashboard,
  Calendar,
  ChartLineIcon,
  Settings,
  ForkKnife,
} from "lucide-react";

export const sidebar = {
  general: [
    { id: 1, label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { id: 2, label: "Calendar", icon: Calendar, href: "/calendar" },
    { id: 3, label: "Recipes", icon: ForkKnife, href: "/recipes" },
    { id: 4, label: "Statistics", icon: ChartLineIcon, href: "/statistics" },
  ],
  tools: [{ id: 1, label: "Settings", icon: Settings, href: "/settings" }],
};

export const categories = [
  { id: 1, label: "Breakfast", value: "breakfast" },
  { id: 2, label: "Brunch", value: "brunch" },
  { id: 3, label: "Lunch", value: "lunch" },
  { id: 4, label: "Snack", value: "snack" },
  { id: 5, label: "Dinner", value: "dinner" },
  { id: 7, label: "Drink", value: "drink" },
  { id: 8, label: "Smoothie", value: "smoothie" },
  { id: 9, label: "Dessert", value: "dessert" },
];

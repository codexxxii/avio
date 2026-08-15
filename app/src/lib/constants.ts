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

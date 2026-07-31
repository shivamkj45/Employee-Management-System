import type { ReactNode } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import BusinessIcon from "@mui/icons-material/Business";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HistoryIcon from "@mui/icons-material/History";
import SettingsIcon from "@mui/icons-material/Settings";
import EventBusyIcon from "@mui/icons-material/EventBusy";
export interface SidebarItem {
  title: string;
  path: string;
  icon: ReactNode;
}

export const adminMenu: SidebarItem[] = [
  {
    title: "Dashboard",
    path: "/admin",
    icon: <DashboardIcon />,
  },
  {
    title: "Employees",
    path: "/employees",
    icon: <PeopleIcon />,
  },
  {
    title: "Departments",
    path: "/departments",
    icon: <BusinessIcon />,
  },
  {
    title: "Attendance",
    path: "/attendance",
    icon: <EventAvailableIcon />,
  },
  {
    title: "Leave",
    path: "/leave",
    icon: <EventBusyIcon />,
  },
  {
    title: "Notifications",
    path: "/notifications",
    icon: <NotificationsIcon />,
  },
  {
    title: "Audit Logs",
    path: "/audit",
    icon: <HistoryIcon />,
  },
  {
    title: "Profile",
    path: "/profile",
    icon: <AccountCircleIcon />,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: <SettingsIcon />,
  },
];
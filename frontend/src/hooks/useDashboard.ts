import { useQuery } from "@tanstack/react-query";

import {
  getAttendanceTrend,
  getDashboardSummary,
  getDepartmentStats,
  getEmployeeGrowth,
  getLeaveStats,
  getRecentEmployees,
} from "../api/dashboard.api";

export const useDashboardSummary = () =>
  useQuery({
    queryKey: ["dashboard-summary"],
    queryFn: getDashboardSummary,
  });
export const useEmployeeGrowth = () =>
  useQuery({
    queryKey: ["employee-growth"],
    queryFn: getEmployeeGrowth,
  });

export const useDepartmentStats = () =>
  useQuery({
    queryKey: ["department-stats"],
    queryFn: getDepartmentStats,
  });

export const useLeaveStats = () =>
  useQuery({
    queryKey: ["leave-stats"],
    queryFn: getLeaveStats,
  });

export const useRecentEmployees = () =>
  useQuery({
    queryKey: ["recent-employees"],
    queryFn: getRecentEmployees,
  });

export const useAttendanceTrend = () =>
  useQuery({
    queryKey: ["attendance-trend"],
    queryFn: getAttendanceTrend,
  });
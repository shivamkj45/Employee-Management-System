import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  checkIn,
  checkOut,
  getTodayAttendance,
  getAttendanceHistory,
} from "../api/attendance.api";

import toast from "react-hot-toast";

export const useTodayAttendance = (
  date?: string
) =>
  useQuery({
    queryKey: [
      "today-attendance",
      date,
    ],
    queryFn: () =>
      getTodayAttendance(date),
  });

export const useAttendanceHistory =
  (id: string) =>
    useQuery({
      queryKey: [
        "attendance-history",
        id,
      ],
      queryFn: () =>
        getAttendanceHistory(id),
      enabled: !!id,
    });

export const useCheckIn = () => {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      employee,
      remarks,
    }: {
      employee: string;
      remarks?: string;
    }) =>
      checkIn(employee, remarks),

    onSuccess: () => {
      toast.success(
        "Checked in successfully"
      );

      queryClient.invalidateQueries({
        queryKey: [
          "today-attendance",
        ],
      });
    },
  });
};

export const useCheckOut = () => {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (employee: string) =>
      checkOut(employee),

    onSuccess: () => {
      toast.success(
        "Checked out successfully"
      );

      queryClient.invalidateQueries({
        queryKey: [
          "today-attendance",
        ],
      });
    },
  });
};
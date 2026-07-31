import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import {
  deleteEmployee,
} from "../services/employee.service";

export function useDeleteEmployee() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      deleteEmployee(id),

    onSuccess: () => {
      toast.success(
        "Employee deleted successfully"
      );

      queryClient.invalidateQueries({
        queryKey: ["employees"],
      });
    },

    onError: () => {
      toast.error(
        "Failed to delete employee"
      );
    },
  });
}
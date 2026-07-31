import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateEmployee } from "../services/employee.service";

export function useUpdateEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: unknown;
    }) => updateEmployee(id, data),

    onSuccess: () => {
      toast.success("Employee updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["employees"],
      });
    },

    onError: () => {
      toast.error("Failed to update employee");
    },
  });
}
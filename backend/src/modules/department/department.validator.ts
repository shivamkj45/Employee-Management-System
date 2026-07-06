import { z } from "zod";

export const createDepartmentSchema = z.object({
  name: z
    .string()
    .min(2, "Department name is required"),

  description: z
    .string()
    .optional(),

  manager: z
    .string()
    .optional(),
});
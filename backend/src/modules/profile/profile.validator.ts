import { z } from "zod";

export const updateProfileSchema = z.object({
  firstName: z.string().min(2).optional(),

  lastName: z.string().min(2).optional(),

  phone: z.string().min(10).optional(),

  address: z.string().min(5).optional(),
});
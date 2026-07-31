import { z } from "zod";

export const checkInSchema = z.object({
  remarks: z.string().optional(),
});
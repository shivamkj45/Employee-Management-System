import { z } from "zod";

export const employeeSchema = z.object({
  employeeId: z
    .string()
    .min(1, "Employee ID is required"),

  firstName: z
    .string()
    .min(2, "First name is required"),

  lastName: z
    .string()
    .min(2, "Last name is required"),

  email: z
    .string()
    .email("Invalid email address"),

  phone: z
    .string()
    .min(10, "Phone number is required"),

  designation: z
    .string()
    .min(2, "Designation is required"),

  department: z
    .string()
    .min(1, "Department is required"),

  salary: z.coerce
    .number()
    .min(0, "Salary is required"),

  joiningDate: z
    .string()
    .min(1, "Joining date is required"),

  role: z.enum([
    "admin",
    "hr",
    "manager",
    "employee",
  ]),

  status: z.enum([
    "Active",
    "Inactive",
  ]),

  address: z
    .string()
    .min(5, "Address is required"),
});

export type EmployeeFormData =
  z.infer<typeof employeeSchema>;
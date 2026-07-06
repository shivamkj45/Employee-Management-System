import { Request, Response, NextFunction } from "express";
import { z } from "zod";

export const createEmployeeSchema = z.object({
  employeeId: z
    .string()
    .min(3, "Employee ID must be at least 3 characters"),

  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters"),

  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters"),

  email: z
    .string()
    .email("Invalid email address"),

  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits"),

  designation: z.string(),

  department: z.string(),

  salary: z
    .number()
    .positive("Salary must be greater than zero"),

  joiningDate: z.string(),

  address: z
    .string()
    .min(5, "Address is too short"),
});

export const validateEmployee = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    createEmployeeSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.issues,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
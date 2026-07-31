export interface Department {
  _id: string;
  name: string;
}

export type EmployeeRole =
  | "admin"
  | "hr"
  | "manager"
  | "employee";

export type EmployeeStatus =
  | "Active"
  | "Inactive";

export interface Employee {
  _id: string;

  employeeId: string;

  firstName: string;

  lastName: string;

  email: string;

  phone: string;

  designation: string;

  department: Department;

  salary: number;

  joiningDate: string;

  status: EmployeeStatus;

  role: EmployeeRole;

  address: string;

  profileImage: string;
}

export interface EmployeeResponse {
  success: boolean;

  statusCode: number;

  message: string;

  data: Employee[];
}
export type UserRole =
  | "admin"
  | "hr"
  | "manager"
  | "employee";

export interface Employee {
  _id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  designation: string;
  department: string;
  salary: number;
  joiningDate: string;
  status: string;
  role: UserRole;
  address: string;
  profileImage: string;
}

export interface User {
  _id: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  employee: Employee;
}

export interface LoginResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    user: User;
    accessToken: string;
    refreshToken: string;
  };
}
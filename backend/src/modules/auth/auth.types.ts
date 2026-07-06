export interface RegisterUserDto {
  employeeId: string;
  email: string;
  password: string;
  role: "admin" | "hr" | "manager" | "employee";
}

export interface LoginUserDto {
  email: string;
  password: string;
}
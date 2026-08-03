export interface Department {
  _id: string;

  name: string;

  description: string;

  manager?: {
    _id: string;
    firstName: string;
    lastName: string;
    profileImage?: string;
  };

  employeeCount: number;

  status: "Active" | "Inactive";

  createdAt: string;

  updatedAt: string;
}

export interface DepartmentStats {
  totalDepartments: number;
  activeDepartments: number;
  inactiveDepartments: number;
  totalEmployees: number;
}

export interface DepartmentsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Department[];
}

export interface DepartmentStatsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: DepartmentStats;
}
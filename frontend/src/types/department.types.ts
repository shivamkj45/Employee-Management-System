export interface Department {
  _id: string;
  name: string;
  description: string;
  manager: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DepartmentsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Department[];
}
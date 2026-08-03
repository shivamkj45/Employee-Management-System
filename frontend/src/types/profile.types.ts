export interface ProfileUser {
  _id: string;
  email: string;
  role: string;
  isActive: boolean;
}

export interface Department {
  _id: string;
  name: string;
}

export interface ProfileEmployee {
  _id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  designation: string;
  address: string;
  joiningDate: string;
  profileImage: string;
  status: string;
  role: string;
  department: Department;
}

export interface ProfileResponse {
  user: ProfileUser;
  employee: ProfileEmployee;
}

export interface ProfileStats {
  yearsInCompany: number;
  totalNotifications: number;
  totalActivities: number;
  department: string;
  designation: string;
}

export interface ProfileCompletion {
  completion: number;
  completedFields: number;
  totalFields: number;
}

export interface Activity {
  _id: string;
  action: string;
  module: string;
  description: string;
  createdAt: string;
}
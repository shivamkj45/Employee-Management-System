export interface EmployeeGrowth {
  year: number;
  month: string;
  employees: number;
}

export interface DepartmentStat {
  department: string;
  employees: number;
}

export interface LeaveStat {
  status: string;
  count: number;
}

export interface RecentEmployee {
  _id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  designation: string;
  profileImage: string;
  department: {
    name: string;
  };
}

export interface AttendanceTrend {
  date: string;
  present: number;
}
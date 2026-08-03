export interface AuditUserEmployee {
  _id: string;
  firstName: string;
  lastName: string;
  designation: string;
  profileImage?: string;
}

export interface AuditUser {
  _id: string;
  email: string;
  role: string;
  employee: AuditUserEmployee;
}

export interface AuditLog {
  _id: string;

  action: string;

  module: string;

  description: string;

  ipAddress?: string;

  userAgent?: string;

  createdAt: string;

  updatedAt: string;

  user: AuditUser;
}

export interface AuditStats {
  totalLogs: number;

  todayLogs: number;

  activeUsers: number;

  criticalLogs: number;
}

export interface AuditResponse {
  success: boolean;

  statusCode: number;

  message: string;

  data: AuditLog[];
}
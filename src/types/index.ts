export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'employee';
  department: string;
  position: string;
  salary: number;
}

export interface AttendanceRecord {
  id: string;
  userId: string;
  date: string;
  punchIn: string;
  punchOut: string | null;
  location: {
    latitude: number;
    longitude: number;
  };
  totalHours: number;
  status: 'present' | 'absent' | 'late' | 'half-day';
}

export interface LeaveRequest {
  id: string;
  userId: string;
  startDate: string;
  endDate: string;
  type: 'sick' | 'vacation' | 'personal';
  status: 'pending' | 'approved' | 'rejected';
  reason: string;
}

export interface SalaryDetails {
  id: string;
  userId: string;
  month: string;
  year: number;
  basicSalary: number;
  deductions: number;
  bonus: number;
  totalSalary: number;
  status: 'pending' | 'paid';
}
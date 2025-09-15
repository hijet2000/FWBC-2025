export interface UpcomingEvent {
  id: string;
  type: 'Exam' | 'Assignment' | 'Holiday';
  title: string;
  date: string;
}

export interface Notification {
  id: string;
  message: string;
  date: string;
  read: boolean;
}

export interface DashboardData {
  totalStudents: number;
  attendancePercentage: number;
  upcomingEvents: UpcomingEvent[];
  notifications: Notification[];
}

export const mockDashboardData: DashboardData = {
  totalStudents: 20,
  attendancePercentage: 92,
  upcomingEvents: [
    { id: 'ev1', type: 'Exam', title: 'Mid-term Mathematics Exam', date: '2023-10-25' },
    { id: 'ev2', type: 'Assignment', title: 'History Essay Due', date: '2023-10-28' },
    { id: 'ev3', type: 'Holiday', title: 'National Day', date: '2023-11-01' },
  ],
  notifications: [
    { id: 'n1', message: 'Parent-Teacher meeting scheduled for Form 3.', date: '2023-10-20T10:00:00Z', read: false },
    { id: 'n2', message: 'School-wide science fair registration is now open.', date: '2023-10-19T14:30:00Z', read: false },
    { id: 'n3', message: 'Reminder: Staff meeting today at 3 PM.', date: '2023-10-18T09:00:00Z', read: true },
    { id: 'n4', message: 'New course "Introduction to Programming" has been added.', date: '2023-10-17T11:00:00Z', read: true },
  ],
};

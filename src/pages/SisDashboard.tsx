import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockDashboardData, UpcomingEvent, Notification } from '../data/dashboardMockData';
import DashboardCard from './dashboard/DashboardCard';

const SisDashboard: React.FC = () => {
  const { siteId } = useParams<{ siteId: string }>();
  const { totalStudents, attendancePercentage, upcomingEvents, notifications } = mockDashboardData;

  // Icons for cards
  const StudentsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a3.001 3.001 0 015.658 0M12 6V4m0 2a2 2 0 100 4 2 2 0 000-4z" /></svg>;
  const AttendanceIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
  const UpcomingIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
  const NotificationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>;
  
  const quickLinks = [
    { name: 'Mark Attendance', path: `/school/${siteId}/attendance` },
    { name: 'View Students', path: `/school/${siteId}/students` },
    { name: 'Manage Courses', path: `/school/${siteId}/courses` },
    { name: 'Manage Academics', path: `/school/${siteId}/academics` },
  ];

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
      <p className="text-gray-400 mb-8">Welcome back, here's a summary of school activities.</p>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <DashboardCard
          title="Total Students"
          value={totalStudents.toString()}
          icon={<StudentsIcon />}
          linkTo={`/school/${siteId}/students`}
          description="View student directory"
        />
        <DashboardCard
          title="Today's Attendance"
          value={`${attendancePercentage}%`}
          icon={<AttendanceIcon />}
          linkTo={`/school/${siteId}/attendance`}
          description="Mark daily attendance"
        />
        <DashboardCard
          title="Upcoming Items"
          value={upcomingEvents.length.toString()}
          icon={<UpcomingIcon />}
          linkTo={`/school/${siteId}/courses`}
          description="Exams, assignments, etc."
        />
        <DashboardCard
          title="Notifications"
          value={notifications.filter(n => !n.read).length.toString()}
          icon={<NotificationIcon />}
          linkTo="#" // No notifications page yet
          description={`${notifications.length} total notifications`}
        />
      </div>

       {/* Quick Links & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-gray-800 rounded-lg p-6 border border-gray-700">
           <h2 className="text-xl font-bold mb-4">Quick Links</h2>
           <div className="flex flex-col space-y-3">
             {quickLinks.map(link => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="bg-gray-700/50 hover:bg-gray-700 text-gray-200 font-medium py-3 px-4 rounded-lg transition-colors flex justify-between items-center"
                >
                  <span>{link.name}</span>
                  <span className="text-gray-400">&rarr;</span>
                </Link>
             ))}
           </div>
        </div>

        <div className="lg:col-span-2 bg-gray-800 rounded-lg p-6 border border-gray-700">
           <h2 className="text-xl font-bold mb-4">Recent Notifications</h2>
            {notifications.length > 0 ? (
                <ul className="space-y-3">
                {notifications.slice(0, 3).map((item: Notification) => (
                    <li key={item.id} className="p-3 bg-gray-900/50 rounded-md">
                        <p className="font-semibold text-gray-300">{item.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{new Date(item.date).toLocaleString()}</p>
                    </li>
                ))}
                 {notifications.length > 3 && <p className="text-sm text-center text-blue-400 mt-4">View all...</p>}
                </ul>
            ) : (
                <p className="text-gray-400">No new notifications.</p>
            )}
        </div>
      </div>
    </div>
  );
};

export default SisDashboard;

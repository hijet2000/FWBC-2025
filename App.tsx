import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './src/components/layout/MainLayout';
import { useAuth } from './src/auth/AuthProvider';
import SisDashboard from './src/pages/SisDashboard';
import Students from './src/pages/students/Students';
import StudentProfile from './src/pages/students/StudentProfile';
import Attendance from './src/pages/attendance/Attendance';
import Academics from './src/pages/academics/Academics';
import Courses from './src/pages/courses/Courses';
import RequireScope from './src/auth/RequireScope';

const App: React.FC = () => {
  const { user, signIn } = useAuth();

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-6">fwm-sis-lms</h1>
          <button
            onClick={signIn}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
          >
            Sign In as Teacher Jane
          </button>
        </div>
      </div>
    );
  }
  
  const NotFound = () => (
    <div className="text-white flex items-center justify-center h-full flex-col">
      <h1 className="text-4xl font-bold">404 - Not Found</h1>
      <p className="mt-2 text-gray-400">Sorry, the page you are looking for does not exist.</p>
    </div>
  );

  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/school/site_123" replace />} />
        <Route path="/school/:siteId" element={<SisDashboard />} />
        <Route path="/school/:siteId/students" element={<Students />} />
        <Route path="/school/:siteId/students/:studentId" element={<StudentProfile />} />
        <Route path="/school/:siteId/attendance" element={<Attendance />} />
        <Route path="/school/:siteId/academics" element={<Academics />} />
        <Route
          path="/school/:siteId/courses"
          element={
            <RequireScope requiredScope="lms:admin">
              <Courses />
            </RequireScope>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
};

export default App;
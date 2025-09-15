import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from '@/auth/AuthProvider';
import { AttendanceProvider } from '@/context/AttendanceContext';
import { AcademicsProvider } from '@/context/AcademicsContext';
import { CoursesProvider } from '@/context/CoursesContext';
import '@/index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AttendanceProvider>
          <AcademicsProvider>
            <CoursesProvider>
              <App />
            </CoursesProvider>
          </AcademicsProvider>
        </AttendanceProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './src/auth/AuthProvider';
import { AttendanceProvider } from './src/context/AttendanceContext';
import { AcademicsProvider } from './src/context/AcademicsContext';
import { CoursesProvider } from './src/context/CoursesContext';
import './src/index.css';

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

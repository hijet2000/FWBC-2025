import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/auth/AuthProvider';

interface RequireScopeProps {
  children: React.ReactNode;
  requiredScope: string;
}

const RequireScope: React.FC<RequireScopeProps> = ({ children, requiredScope }) => {
  const { user } = useAuth();

  if (!user) {
    // If user is not signed in, redirect to the root/login page.
    return <Navigate to="/" replace />;
  }

  if (!user.scopes.includes(requiredScope)) {
    // User is signed in but doesn't have the required permission.
    return (
      <div className="flex items-center justify-center h-full text-white">
        <div className="text-center p-12 bg-gray-800 rounded-lg border border-red-500/50 shadow-xl max-w-lg">
           <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
          </svg>
          <h2 className="mt-6 text-2xl font-bold">Access Denied</h2>
          <p className="mt-2 text-gray-400">
            You do not have the required permissions to view this page.
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Required scope: <code className="bg-gray-700 text-red-400 px-1 py-0.5 rounded font-mono">{requiredScope}</code>
          </p>
        </div>
      </div>
    );
  }

  // User is signed in and has the required scope.
  return <>{children}</>;
};

export default RequireScope;
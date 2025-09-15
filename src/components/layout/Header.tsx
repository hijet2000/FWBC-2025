import React from 'react';
import { useAuth } from '@/auth/AuthProvider';

const Header: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center border-b border-gray-700">
      <h1 className="text-xl font-bold">fwm-sis-lms</h1>
      <div className="flex items-center space-x-6">
        <div className="text-sm text-gray-400">Phase 1 • Foundation</div>
        {user && (
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-300">Welcome, {user.name}</span>
            <button
              onClick={signOut}
              className="bg-red-600 hover:bg-red-700 text-white text-sm font-bold py-1 px-3 rounded transition-colors"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
import React from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '@/auth/AuthProvider';

const SisDashboard: React.FC = () => {
  const { siteId } = useParams<{ siteId: string }>();
  const { user } = useAuth();

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
      <p className="text-gray-400 mb-8">
        Welcome to site <span className="font-mono bg-gray-700 text-green-400 py-1 px-2 rounded">{siteId}</span>
      </p>

      {user && (
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-8">
          <h2 className="text-xl font-bold mb-4">User Information</h2>
          <p className="text-gray-300">
            <strong>Name:</strong> {user.name}
          </p>
          <p className="text-gray-300 mt-2">
            <strong>Scopes:</strong>
            <span className="ml-2 font-mono bg-gray-700 text-yellow-400 py-1 px-2 rounded text-sm">
              {user.scopes.join(', ')}
            </span>
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-bold text-gray-300">Students</h3>
          <p className="mt-2 text-gray-400">Coming soon...</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-bold text-gray-300">Attendance</h3>
          <p className="mt-2 text-gray-400">Coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default SisDashboard;
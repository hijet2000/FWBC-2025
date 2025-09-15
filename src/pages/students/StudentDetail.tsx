import React from 'react';
import { useParams } from 'react-router-dom';

const StudentDetail: React.FC = () => {
  const { siteId, studentId } = useParams<{ siteId: string; studentId: string }>();

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold">Student Detail Page</h1>
      <p className="mt-4 text-gray-400">
        Displaying details for student with ID: <span className="font-mono bg-gray-700 text-green-400 py-1 px-2 rounded">{studentId}</span>
      </p>
      <p className="mt-2 text-gray-400">
        From Site ID: <span className="font-mono bg-gray-700 text-green-400 py-1 px-2 rounded">{siteId}</span>
      </p>
    </div>
  );
};

export default StudentDetail;
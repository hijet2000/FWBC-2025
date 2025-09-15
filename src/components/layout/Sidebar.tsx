import React from 'react';
import { Link, useParams } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const { siteId } = useParams<{ siteId: string }>();

  const navItems = [
    { name: 'Dashboard', path: `/school/${siteId}` },
    { name: 'Students', path: `/school/${siteId}/students` },
    { name: 'Academics', path: `/school/${siteId}/academics` },
    { name: 'Attendance', path: `/school/${siteId}/attendance` },
    { name: 'Courses', path: `/school/${siteId}/courses` },
  ];

  return (
    <aside className="bg-gray-800 text-white w-64 p-4 border-r border-gray-700 h-full">
      <nav>
        <ul>
          {navItems.map((item) => (
            <li key={item.name} className="mb-2">
              {item.path === '#' ? (
                <span
                  className="block py-2 px-4 rounded text-gray-500 cursor-not-allowed"
                >
                  {item.name}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className="block py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-200"
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
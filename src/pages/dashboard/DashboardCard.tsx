import React from 'react';
import { Link } from 'react-router-dom';

interface DashboardCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  linkTo: string;
  description?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, icon, linkTo, description }) => {
  const cardContent = (
    <div className="flex items-start justify-between">
      <div>
        <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">{title}</h3>
        <p className="text-3xl font-bold mt-2">{value}</p>
        {description && <p className="text-xs text-gray-500 mt-2">{description}</p>}
      </div>
      <div className="bg-gray-700/50 p-3 rounded-lg">
        {icon}
      </div>
    </div>
  );

  const baseClasses = "bg-gray-800 p-6 rounded-lg border border-gray-700 transition-all duration-300 shadow-lg";

  if (linkTo === '#') {
    return (
      <div className={`${baseClasses} cursor-not-allowed opacity-60`}>
        {cardContent}
      </div>
    );
  }

  return (
    <Link to={linkTo} className={`${baseClasses} hover:border-blue-500 hover:shadow-blue-500/10 hover:-translate-y-1`}>
      {cardContent}
    </Link>
  );
};

export default DashboardCard;

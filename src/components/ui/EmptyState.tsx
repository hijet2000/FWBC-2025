import React from 'react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  children?: React.ReactNode; // For an action button
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, description, children }) => {
  return (
    <div className="text-center p-12 bg-gray-800/50 rounded-lg border-2 border-dashed border-gray-700">
      {icon && (
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-700 text-gray-400">
          {icon}
        </div>
      )}
      <h3 className="mt-4 text-xl font-semibold text-white">{title}</h3>
      <p className="mt-2 text-base text-gray-400">{description}</p>
      {children && <div className="mt-6">{children}</div>}
    </div>
  );
};

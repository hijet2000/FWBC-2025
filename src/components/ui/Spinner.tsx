import React from 'react';

type SpinnerSize = 'sm' | 'md' | 'lg';

interface SpinnerProps {
  size?: SpinnerSize;
  className?: string;
}

const sizeClasses: Record<SpinnerSize, string> = {
  sm: 'h-4 w-4 border-2',
  md: 'h-8 w-8 border-4',
  lg: 'h-12 w-12 border-4',
};

export const Spinner: React.FC<SpinnerProps> = ({ size = 'md', className = '' }) => {
  const combinedClasses = [
    'animate-spin rounded-full border-solid border-gray-600 border-t-blue-500',
    sizeClasses[size],
    className
  ].join(' ');

  return <div className={combinedClasses} role="status" />;
};

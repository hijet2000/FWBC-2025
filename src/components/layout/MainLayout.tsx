import React from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="grid grid-cols-[auto,1fr] grid-rows-[auto,1fr] h-screen bg-gray-900">
      <div className="col-span-2">
        <Header />
      </div>
      <div className="row-start-2">
        <Sidebar />
      </div>
      <main className="row-start-2 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
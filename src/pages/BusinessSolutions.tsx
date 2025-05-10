
import React from 'react';
import BusinessBenefits from '@/components/BusinessBenefits';
import DashboardHeader from "@/components/DashboardHeader";
import DashboardSidebar from "@/components/DashboardSidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useEffect } from 'react';

const BusinessSolutions = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const isMobile = useIsMobile();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  // Set initial dark mode class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // On mobile, default to closed sidebar
  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [isMobile]);

  return (
    <div className="min-h-screen bg-background flex w-full">
      <DashboardSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div 
        className="flex-1 flex flex-col transition-all duration-300"
        style={{ 
          marginLeft: isMobile ? 0 : (isSidebarOpen ? '16rem' : '4rem')
        }}
      >
        <DashboardHeader 
          toggleSidebar={toggleSidebar} 
          isDarkMode={isDarkMode} 
          toggleDarkMode={toggleDarkMode}
        />
        
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <h1 className="text-2xl font-bold mb-6">Business-Focused AR Advertising Solutions</h1>
          <div className="grid grid-cols-1 gap-6">
            <BusinessBenefits />
          </div>
        </main>
      </div>
    </div>
  );
};

export default BusinessSolutions;

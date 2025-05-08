
import React, { useState } from 'react';
import DashboardHeader from "@/components/DashboardHeader";
import DashboardSidebar from "@/components/DashboardSidebar";
import GeospatialMap from "@/components/GeospatialMap";
import { useIsMobile } from "@/hooks/use-mobile";

const MapAnalytics = () => {
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

  // On mobile, default to closed sidebar
  React.useEffect(() => {
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
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Map Analytics</h2>
            <p className="text-muted-foreground">
              Geographic visualization of advertising metrics and user engagement patterns across regions.
            </p>
            
            <div className="grid grid-cols-1 gap-6">
              <GeospatialMap />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MapAnalytics;

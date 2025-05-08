
import React, { useState } from 'react';
import DashboardHeader from "@/components/DashboardHeader";
import DashboardSidebar from "@/components/DashboardSidebar";
import MetricsCard from "@/components/MetricsCard";
import ARPerformance from "@/components/ARPerformance";
import TrafficHeatmap from "@/components/TrafficHeatmap";
import { ChartBar, MapPin, ChartPie } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Performance = () => {
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
            <h2 className="text-2xl font-bold">Performance Dashboard</h2>
            <p className="text-muted-foreground">
              Comprehensive view of advertising performance metrics and KPIs across your campaigns.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <MetricsCard
                title="Total Ad Impressions"
                value="4.2M"
                change={{ value: 12.5, trend: "up" }}
                color="rgba(51, 195, 240, 1)"
                icon={<ChartBar className="h-4 w-4" />}
                chartData={[
                  { name: 'Jan', value: 30 },
                  { name: 'Feb', value: 40 },
                  { name: 'Mar', value: 45 },
                  { name: 'Apr', value: 55 },
                  { name: 'May', value: 60 },
                  { name: 'Jun', value: 80 },
                  { name: 'Jul', value: 100 },
                ]}
              />
              
              <MetricsCard
                title="Avg. Engagement Rate"
                value="8.7%"
                change={{ value: 2.3, trend: "up" }}
                color="rgba(139, 92, 246, 1)"
                icon={<MapPin className="h-4 w-4" />}
                chartData={[
                  { name: 'Jan', value: 60 },
                  { name: 'Feb', value: 55 },
                  { name: 'Mar', value: 70 },
                  { name: 'Apr', value: 65 },
                  { name: 'May', value: 80 },
                  { name: 'Jun', value: 85 },
                  { name: 'Jul', value: 100 },
                ]}
              />
              
              <MetricsCard
                title="CTR & Conversions"
                value="3.2%"
                change={{ value: 0.5, trend: "down" }}
                color="rgba(74, 222, 128, 1)"
                icon={<ChartPie className="h-4 w-4" />}
                chartData={[
                  { name: 'Jan', value: 75 },
                  { name: 'Feb', value: 90 },
                  { name: 'Mar', value: 100 },
                  { name: 'Apr', value: 95 },
                  { name: 'May', value: 85 },
                  { name: 'Jun', value: 80 },
                  { name: 'Jul', value: 70 },
                ]}
              />
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              <TrafficHeatmap />
              <ARPerformance />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Performance;

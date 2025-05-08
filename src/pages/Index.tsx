import React, { useState, useEffect } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardSidebar from "@/components/DashboardSidebar";
import MetricsCard from "@/components/MetricsCard";
import GeospatialMap from "@/components/GeospatialMap";
import AIRecommendations from "@/components/AIRecommendations";
import ARPerformance from "@/components/ARPerformance";
import TrafficHeatmap from "@/components/TrafficHeatmap";
import TimelineViewer from "@/components/TimelineViewer";
import WallAnalyzer from "@/components/WallAnalyzer";
import TrackingTechnologies from "@/components/TrackingTechnologies";
import UserProfileCard from "@/components/UserProfileCard";

import { ChartBar, MapPin, ChartPie } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeView, setActiveView] = useState("overview");
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

  // Render different content based on active view
  const renderDashboardContent = () => {
    switch (activeView) {
      case "campaigns":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Campaign Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <MetricsCard
                title="Active Campaigns"
                value="12"
                change={{ value: 2, trend: "up" }}
                color="rgba(51, 195, 240, 1)"
                icon={<ChartBar className="h-4 w-4" />}
                chartData={[
                  { name: 'Jan', value: 8 },
                  { name: 'Feb', value: 9 },
                  { name: 'Mar', value: 7 },
                  { name: 'Apr', value: 10 },
                  { name: 'May', value: 8 },
                  { name: 'Jun', value: 12 },
                ]}
              />
              <MetricsCard
                title="Campaign Budget"
                value="₹5.2M"
                change={{ value: 12.5, trend: "up" }}
                color="rgba(74, 222, 128, 1)"
                chartData={[
                  { name: 'Jan', value: 40 },
                  { name: 'Feb', value: 45 },
                  { name: 'Mar', value: 55 },
                  { name: 'Apr', value: 60 },
                  { name: 'May', value: 75 },
                  { name: 'Jun', value: 100 },
                ]}
              />
              <MetricsCard
                title="Avg. ROI"
                value="324%"
                change={{ value: 5.3, trend: "up" }}
                color="rgba(249, 115, 22, 1)"
                chartData={[
                  { name: 'Jan', value: 280 },
                  { name: 'Feb', value: 290 },
                  { name: 'Mar', value: 310 },
                  { name: 'Apr', value: 315 },
                  { name: 'May', value: 320 },
                  { name: 'Jun', value: 324 },
                ]}
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-2">
                <TimelineViewer />
              </div>
              <div>
                <UserProfileCard />
              </div>
            </div>
          </div>
        );
      
      case "analytics":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Deep Analytics</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TrafficHeatmap />
              <GeospatialMap />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <ARPerformance />
              </div>
              <div>
                <TrackingTechnologies />
              </div>
            </div>
            <div className="mt-6">
              <UserProfileCard />
            </div>
          </div>
        );
      
      case "reports":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Reports & Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AIRecommendations />
              <WallAnalyzer />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
              <div className="lg:col-span-2">
                <TimelineViewer />
              </div>
              <div>
                <UserProfileCard />
              </div>
            </div>
          </div>
        );
      
      default: // "overview"
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
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
              
              <MetricsCard
                title="Overall Revenue"
                value="₹14.8M"
                change={{ value: 8.7, trend: "up" }}
                unit="monthly"
                color="rgba(249, 115, 22, 1)"
                chartData={[
                  { name: 'Jan', value: 40 },
                  { name: 'Feb', value: 45 },
                  { name: 'Mar', value: 55 },
                  { name: 'Apr', value: 60 },
                  { name: 'May', value: 75 },
                  { name: 'Jun', value: 85 },
                  { name: 'Jul', value: 100 },
                ]}
              />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-2">
                <GeospatialMap />
              </div>
              <div className="space-y-6">
                <TrackingTechnologies />
                <UserProfileCard />
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-2">
                <TrafficHeatmap />
              </div>
              <div>
                <ARPerformance />
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <TimelineViewer />
              </div>
              <div className="space-y-6">
                <AIRecommendations />
                <WallAnalyzer />
              </div>
            </div>
          </>
        );
    }
  };

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
          {renderDashboardContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;

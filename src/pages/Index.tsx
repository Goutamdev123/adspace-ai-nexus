
import React, { useState, useEffect } from "react";
import AIRecommendations from "@/components/AIRecommendations";
import BangaloreTraffic from "@/components/BangaloreTraffic";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardSidebar from "@/components/DashboardSidebar";
import GeospatialMap from "@/components/GeospatialMap";
import MetricsCard from "@/components/MetricsCard";
import TimelineViewer from "@/components/TimelineViewer";
import TrackingTechnologies from "@/components/TrackingTechnologies";
import UserProfileCard from "@/components/UserProfileCard";
import TrafficHeatmap from "@/components/TrafficHeatmap";
import ARPerformance from "@/components/ARPerformance";
import WallAnalyzer from "@/components/WallAnalyzer";

import { ChartBar, MapPin, ChartPie, Layers3 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [tabIndex, setTabIndex] = useState(0);
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

  const metricsData = [
    { title: "Total Ad Impressions", value: "4.2M", change: { value: 12.5, trend: "up" as const }, changeType: "percentage", icon: <ChartBar className="h-4 w-4" /> },
    { title: "Avg. Engagement Rate", value: "8.7%", change: { value: 2.3, trend: "up" as const }, changeType: "percentage", icon: <MapPin className="h-4 w-4" /> },
    { title: "CTR & Conversions", value: "3.2%", change: { value: 0.5, trend: "down" as const }, changeType: "percentage", icon: <ChartPie className="h-4 w-4" /> },
    { title: "Overall Revenue", value: "₹14.8M", change: { value: 8.7, trend: "up" as const }, unit: "monthly", color: "rgba(249, 115, 22, 1)" },
  ];

  const mapMetricsData = [
    { title: "Total Ad Impressions", value: "4.2M", change: { value: 12.5, trend: "up" as const }, changeType: "percentage", icon: <ChartBar className="h-4 w-4" /> },
    { title: "Avg. Engagement Rate", value: "8.7%", change: { value: 2.3, trend: "up" as const }, changeType: "percentage", icon: <MapPin className="h-4 w-4" /> },
    { title: "CTR & Conversions", value: "3.2%", change: { value: 0.5, trend: "down" as const }, changeType: "percentage", icon: <ChartPie className="h-4 w-4" /> },
    { title: "Overall Revenue", value: "₹14.8M", change: { value: 8.7, trend: "up" as const }, unit: "monthly", color: "rgba(249, 115, 22, 1)" },
  ];

  const renderTabContent = () => {
    if (tabIndex === 0) {
      return (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-6">
            {metricsData.map((metric, index) => (
              <MetricsCard
                key={index}
                title={metric.title}
                value={metric.value}
                change={metric.change}
                changeType={metric.changeType}
                icon={metric.icon}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <AIRecommendations />
            <TrackingTechnologies />
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
    } else if (tabIndex === 1) {
      return (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-6">
            {mapMetricsData.map((metric, index) => (
              <MetricsCard
                key={index}
                title={metric.title}
                value={metric.value}
                change={metric.change}
                changeType={metric.changeType}
                icon={metric.icon}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 mb-6">
            <GeospatialMap />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <BangaloreTraffic
                data={[
                  { name: "Jan", value: 40 },
                  { name: "Feb", value: 30 },
                  { name: "Mar", value: 20 },
                  { name: "Apr", value: 27 },
                  { name: "May", value: 18 },
                  { name: "Jun", value: 23 },
                  { name: "Jul", value: 34 },
                ]}
              />
            </div>
            <div>
              <UserProfileCard />
            </div>
          </div>
        </div>
      );
    }

    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
          <MetricsCard
            title="Total Ad Impressions"
            value="4.2M"
            change={{ value: 12.5, trend: "up" as const }}
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
            change={{ value: 2.3, trend: "up" as const }}
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
            change={{ value: 0.5, trend: "down" as const }}
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
            change={{ value: 8.7, trend: "up" as const }}
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
            <WallAnalyzer />
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-background flex w-full">
      <DashboardSidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

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
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">
                Overview of your billboard advertising analytics
              </p>
            </div>

            <div className="flex mt-4 md:mt-0 space-x-1 bg-muted/50 p-1 rounded-lg">
              <button
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  tabIndex === 0
                    ? "bg-primary text-white"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setTabIndex(0)}
              >
                Overview
              </button>
              <button
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  tabIndex === 1
                    ? "bg-primary text-white"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setTabIndex(1)}
              >
                Map Analytics
              </button>
              <button
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  tabIndex === 2
                    ? "bg-primary text-white"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setTabIndex(2)}
              >
                Performance
              </button>
            </div>
          </div>

          {renderTabContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;

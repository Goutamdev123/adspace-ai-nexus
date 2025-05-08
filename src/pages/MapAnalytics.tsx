import React, { useState } from 'react';
import DashboardHeader from "@/components/DashboardHeader";
import DashboardSidebar from "@/components/DashboardSidebar";
import GeospatialMap from "@/components/GeospatialMap";
import TrafficHeatmap from "@/components/TrafficHeatmap";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Map, TrafficCone } from "lucide-react";

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
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold flex items-center">
                  <Map className="mr-2 h-6 w-6 text-adtech-blue" />
                  India OOH Advertising Map Analytics
                </h2>
                <p className="text-muted-foreground">
                  Interactive geographic visualization of ad performance and traffic patterns across India
                </p>
              </div>
              
              <div className="hidden md:flex items-center gap-2 bg-muted/50 p-2 rounded-md text-xs">
                <span className="font-medium">Last updated:</span>
                <span className="text-muted-foreground">{new Date().toLocaleDateString('en-IN')}</span>
                <span className="text-adtech-blue">•</span>
                <span className="text-muted-foreground">Data refreshes every 4 hours</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
              <Card className="xl:col-span-1">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Regional Coverage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">North India</span>
                      <span className="font-medium">82%</span>
                    </div>
                    <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                      <div className="bg-adtech-blue h-full rounded-full" style={{ width: '82%' }}></div>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">South India</span>
                      <span className="font-medium">95%</span>
                    </div>
                    <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                      <div className="bg-adtech-blue h-full rounded-full" style={{ width: '95%' }}></div>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">East India</span>
                      <span className="font-medium">63%</span>
                    </div>
                    <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                      <div className="bg-adtech-blue h-full rounded-full" style={{ width: '63%' }}></div>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">West India</span>
                      <span className="font-medium">89%</span>
                    </div>
                    <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                      <div className="bg-adtech-blue h-full rounded-full" style={{ width: '89%' }}></div>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Metro Cities</span>
                      <span className="font-medium">100%</span>
                    </div>
                    <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                      <div className="bg-adtech-blue h-full rounded-full" style={{ width: '100%' }}></div>
                    </div>
                    
                    <div className="pt-2 border-t text-xs text-muted-foreground">
                      <p className="flex items-center gap-1">
                        <TrafficCone className="h-3 w-3" />
                        <span>Coverage based on available OOH inventory</span>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="xl:col-span-3">
                <GeospatialMap />
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              <TrafficHeatmap />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MapAnalytics;

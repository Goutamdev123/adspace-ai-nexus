import React, { useState } from 'react';
import DashboardHeader from "@/components/DashboardHeader";
import DashboardSidebar from "@/components/DashboardSidebar";
import GeospatialMap from "@/components/GeospatialMap";
import TrafficHeatmap from "@/components/TrafficHeatmap";
import IndiaTrafficMap from "@/components/IndiaTrafficMap"; // Added import
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
            
            {/* Live Traffic Heatmap at the top */}
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="p-4 bg-muted/50 border-b border-border">
                <h3 className="text-lg font-bold flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                  </svg>
                  Live Traffic Heatmap
                </h3>
                <p className="text-sm text-muted-foreground">
                  Real-time visualization of audience density and movement patterns across India
                </p>
              </div>
              <TrafficHeatmap />
            </div>
            
            {/* India Map with live traffic data visualization */}
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="p-4 bg-muted/50 border-b border-border">
                <h3 className="text-2xl font-bold mb-2 text-center">Live Traffic Data Across India</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Real-time monitoring of 5,000+ locations across India with 97.3% data accuracy.
                  <br />Hover over cities to see detailed metrics.
                </p>
              </div>
              <IndiaTrafficMap />
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
          </div>
        </main>
      </div>
    </div>
  );
};

export default MapAnalytics;

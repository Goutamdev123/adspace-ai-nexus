
import React, { useState } from 'react';
import DashboardHeader from "@/components/DashboardHeader";
import DashboardSidebar from "@/components/DashboardSidebar";
import AIRecommendations from "@/components/AIRecommendations";
import WallAnalyzer from "@/components/WallAnalyzer";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const Forecasts = () => {
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

  // Sample data for forecast charts
  const forecastData = [
    { month: 'Aug', actual: null, forecast: 15200, optimistic: 16400, pessimistic: 14000 },
    { month: 'Sep', actual: null, forecast: 16500, optimistic: 18100, pessimistic: 14900 },
    { month: 'Oct', actual: null, forecast: 17800, optimistic: 19700, pessimistic: 15900 },
    { month: 'Nov', actual: null, forecast: 19200, optimistic: 21400, pessimistic: 17000 },
    { month: 'Dec', actual: null, forecast: 21000, optimistic: 23500, pessimistic: 18500 }
  ];

  const historicalData = [
    { month: 'Jan', actual: 8600, forecast: null, optimistic: null, pessimistic: null },
    { month: 'Feb', actual: 9300, forecast: null, optimistic: null, pessimistic: null },
    { month: 'Mar', actual: 10100, forecast: null, optimistic: null, pessimistic: null },
    { month: 'Apr', actual: 11000, forecast: null, optimistic: null, pessimistic: null },
    { month: 'May', actual: 12000, forecast: null, optimistic: null, pessimistic: null },
    { month: 'Jun', actual: 13400, forecast: null, optimistic: null, pessimistic: null },
    { month: 'Jul', actual: 14800, forecast: null, optimistic: null, pessimistic: null },
  ];

  const combinedData = [...historicalData, ...forecastData];

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
            <h2 className="text-2xl font-bold">Revenue Forecasts</h2>
            <p className="text-muted-foreground">
              AI-powered predictions and forecasts based on historical data and market trends.
            </p>
            
            <div className="grid grid-cols-1 gap-6">
              <Card className="animate-fade-in">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">5-Month Revenue Forecast</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={combinedData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                        <XAxis dataKey="month" className="text-xs" />
                        <YAxis 
                          className="text-xs"
                          domain={[8000, 24000]}
                          tickFormatter={(value) => `₹${value / 1000}K`}
                        />
                        <Tooltip 
                          formatter={(value: any) => value ? [`₹${value.toLocaleString()}`, undefined] : ["N/A", undefined]}
                          labelFormatter={(label) => `Month: ${label}`}
                        />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="actual" 
                          name="Actual Revenue" 
                          stroke="rgba(51, 195, 240, 1)" 
                          strokeWidth={2} 
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="forecast" 
                          name="Forecast" 
                          stroke="rgba(249, 115, 22, 1)" 
                          strokeWidth={2} 
                          strokeDasharray="5 5"
                          dot={{ r: 4 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="optimistic" 
                          name="Optimistic" 
                          stroke="rgba(74, 222, 128, 1)" 
                          strokeWidth={1}
                          strokeDasharray="3 3"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="pessimistic" 
                          name="Pessimistic" 
                          stroke="rgba(248, 113, 113, 1)" 
                          strokeWidth={1}
                          strokeDasharray="3 3" 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AIRecommendations />
                <WallAnalyzer />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Forecasts;

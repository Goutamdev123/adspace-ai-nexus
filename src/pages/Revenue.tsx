
import React, { useState } from 'react';
import DashboardHeader from "@/components/DashboardHeader";
import DashboardSidebar from "@/components/DashboardSidebar";
import MetricsCard from "@/components/MetricsCard";
import TimelineViewer from "@/components/TimelineViewer";
import { ChartLine } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const Revenue = () => {
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

  // Sample data for revenue charts
  const revenueData = [
    { month: 'Jan', digital: 4500, print: 2300, outdoor: 1800, total: 8600 },
    { month: 'Feb', digital: 5000, print: 2200, outdoor: 2100, total: 9300 },
    { month: 'Mar', digital: 5700, print: 2000, outdoor: 2400, total: 10100 },
    { month: 'Apr', digital: 6200, print: 1900, outdoor: 2900, total: 11000 },
    { month: 'May', digital: 7100, print: 1700, outdoor: 3200, total: 12000 },
    { month: 'Jun', digital: 8300, print: 1600, outdoor: 3500, total: 13400 },
    { month: 'Jul', digital: 9200, print: 1500, outdoor: 4100, total: 14800 }
  ];

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
            <h2 className="text-2xl font-bold">Revenue Analytics</h2>
            <p className="text-muted-foreground">
              Detailed analysis of revenue streams and financial performance metrics.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <MetricsCard
                title="Overall Revenue"
                value="₹14.8M"
                change={{ value: 8.7, trend: "up" }}
                unit="monthly"
                color="rgba(249, 115, 22, 1)"
                chartData={revenueData.map(item => ({ name: item.month, value: item.total / 100 }))}
              />
              
              <MetricsCard
                title="Digital Ads"
                value="₹9.2M"
                change={{ value: 12.1, trend: "up" }}
                color="rgba(51, 195, 240, 1)"
                icon={<ChartLine className="h-4 w-4" />}
                chartData={revenueData.map(item => ({ name: item.month, value: item.digital / 500 }))}
              />
              
              <MetricsCard
                title="Print Revenue"
                value="₹1.5M"
                change={{ value: 3.2, trend: "down" }}
                color="rgba(139, 92, 246, 1)"
                icon={<ChartLine className="h-4 w-4" />}
                chartData={revenueData.map(item => ({ name: item.month, value: item.print / 100 }))}
              />
              
              <MetricsCard
                title="Outdoor Ads"
                value="₹4.1M"
                change={{ value: 17.1, trend: "up" }}
                color="rgba(74, 222, 128, 1)"
                icon={<ChartLine className="h-4 w-4" />}
                chartData={revenueData.map(item => ({ name: item.month, value: item.outdoor / 200 }))}
              />
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              <Card className="animate-fade-in">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Revenue Breakdown (Monthly)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={revenueData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="colorDigital" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="rgba(51, 195, 240, 0.8)" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="rgba(51, 195, 240, 0.2)" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorPrint" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="rgba(139, 92, 246, 0.8)" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="rgba(139, 92, 246, 0.2)" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorOutdoor" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="rgba(74, 222, 128, 0.8)" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="rgba(74, 222, 128, 0.2)" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                        <XAxis dataKey="month" className="text-xs" />
                        <YAxis 
                          className="text-xs"
                          tickFormatter={(value) => `₹${value / 1000}K`}
                        />
                        <Tooltip 
                          formatter={(value: number) => [`₹${value.toLocaleString()}`, undefined]}
                          labelFormatter={(label) => `Month: ${label}`}
                        />
                        <Area type="monotone" dataKey="digital" stroke="rgba(51, 195, 240, 1)" fillOpacity={1} fill="url(#colorDigital)" />
                        <Area type="monotone" dataKey="print" stroke="rgba(139, 92, 246, 1)" fillOpacity={1} fill="url(#colorPrint)" />
                        <Area type="monotone" dataKey="outdoor" stroke="rgba(74, 222, 128, 1)" fillOpacity={1} fill="url(#colorOutdoor)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-center gap-6 mt-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-adtech-blue rounded-full mr-2"></div>
                      <span className="text-xs">Digital</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-adtech-purple rounded-full mr-2"></div>
                      <span className="text-xs">Print</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-adtech-green rounded-full mr-2"></div>
                      <span className="text-xs">Outdoor</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <TimelineViewer />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Revenue;

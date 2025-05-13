
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardSidebar from "@/components/DashboardSidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  BarChart3,
  Calendar,
  ChevronDown,
  Download,
  Filter,
  LineChart,
  PieChart,
  RefreshCcw,
  Users,
  Clock,
  Target,
  Eye,
  MapPin,
  Smartphone,
  TrendingUp,
  Zap
} from "lucide-react";

const DeepAnalytics = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("audience");
  const [timeRange, setTimeRange] = useState("30d");

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

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  React.useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [isMobile]);

  const kpiCards = [
    { title: "Total Impressions", value: "12.6M", growth: "+18.4%", icon: Eye },
    { title: "Unique Viewers", value: "4.2M", growth: "+12.7%", icon: Users },
    { title: "Avg. Engagement", value: "6.8s", growth: "+23.1%", icon: Clock },
    { title: "Conversion Rate", value: "2.4%", growth: "+8.9%", icon: TrendingUp },
  ];

  const demographicData = [
    { age: "18-24", percentage: 21 },
    { age: "25-34", percentage: 38 },
    { age: "35-44", percentage: 24 },
    { age: "45-54", percentage: 12 },
    { age: "55+", percentage: 5 },
  ];

  const genderData = [
    { gender: "Male", percentage: 48 },
    { gender: "Female", percentage: 49 },
    { gender: "Other/Undisclosed", percentage: 3 },
  ];

  const locationPerformance = [
    { location: "Mumbai Central", impressions: "3.2M", engagement: "7.2s", conversion: "3.1%" },
    { location: "Delhi Metro", impressions: "2.8M", engagement: "6.5s", conversion: "2.4%" },
    { location: "Bangalore Tech Park", impressions: "1.7M", engagement: "8.4s", conversion: "3.8%" },
    { location: "Chennai Marina", impressions: "1.4M", engagement: "5.8s", conversion: "2.1%" },
    { location: "Hyderabad Hitech City", impressions: "1.2M", engagement: "7.1s", conversion: "2.6%" },
  ];

  const deviceData = [
    { type: "Mobile", percentage: 68 },
    { type: "Tablet", percentage: 12 },
    { type: "Desktop", percentage: 20 },
  ];

  const campaignPerformance = [
    { name: "Q2 Brand Awareness", impressions: "3.8M", engagement: "6.7s", conversion: "2.3%" },
    { name: "Summer Sale Promotion", impressions: "2.4M", engagement: "5.9s", conversion: "3.1%" },
    { name: "AR Product Experience", impressions: "1.9M", engagement: "9.4s", conversion: "4.2%" },
  ];

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

        <main className="flex-1 p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Deep Analytics</h1>
              <p className="text-muted-foreground">Advanced insights into your advertising performance</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center gap-3">
              <Select defaultValue={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="12m">Last 12 months</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <RefreshCcw className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {kpiCards.map((card, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <card.icon className="h-5 w-5 text-primary" />
                    </div>
                    <Badge variant="outline" className={`bg-green-500/10 text-green-600 border-green-200`}>
                      {card.growth}
                    </Badge>
                  </div>
                  <div className="text-2xl font-bold mb-1">{card.value}</div>
                  <div className="text-sm text-muted-foreground">{card.title}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="audience" className="space-y-6">
            <TabsList>
              <TabsTrigger value="audience">Audience Analysis</TabsTrigger>
              <TabsTrigger value="location">Location Performance</TabsTrigger>
              <TabsTrigger value="campaign">Campaign Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="audience" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Demographics */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-lg">Demographic Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Age Distribution</h4>
                        <div className="space-y-2">
                          {demographicData.map((item) => (
                            <div key={item.age} className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>{item.age}</span>
                                <span>{item.percentage}%</span>
                              </div>
                              <div className="h-2 rounded-full bg-muted overflow-hidden">
                                <div 
                                  className="h-full bg-primary" 
                                  style={{ width: `${item.percentage}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2">Gender Distribution</h4>
                        <div className="grid grid-cols-3 gap-4">
                          {genderData.map((item) => (
                            <div key={item.gender} className="bg-muted/30 rounded-lg p-4 text-center">
                              <div className="text-2xl font-bold mb-1">{item.percentage}%</div>
                              <div className="text-xs text-muted-foreground">{item.gender}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Device Analysis */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Device Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-center py-6">
                        <div className="h-40 w-40 rounded-full bg-muted/30 flex items-center justify-center relative">
                          <div className="text-center">
                            <div className="text-3xl font-bold">{deviceData[0].percentage}%</div>
                            <div className="text-xs text-muted-foreground">Mobile Users</div>
                          </div>
                          <div className="absolute inset-0 border-8 border-primary rounded-full" style={{ clip: 'rect(0, 80px, 160px, 0)' }}></div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {deviceData.map((item) => (
                          <div key={item.type} className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-primary"></div>
                            <span className="text-sm">{item.type}</span>
                            <span className="text-sm ml-auto">{item.percentage}%</span>
                          </div>
                        ))}
                      </div>

                      <div className="text-sm text-muted-foreground mt-4 pt-4 border-t border-border">
                        <div className="flex items-center gap-1 mb-1">
                          <Smartphone className="h-3.5 w-3.5" />
                          <span className="font-medium">Key Insight:</span>
                        </div>
                        <p className="text-xs">
                          Mobile users show 23% higher engagement with AR-enabled advertisements compared to other formats.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Audience Behavior */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Audience Engagement Timeline</CardTitle>
                    <Select defaultValue="impressions">
                      <SelectTrigger className="w-[140px] h-8">
                        <SelectValue placeholder="Select metric" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="impressions">Impressions</SelectItem>
                        <SelectItem value="engagement">Engagement</SelectItem>
                        <SelectItem value="conversion">Conversion</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-lg">
                    <div className="text-center">
                      <BarChart3 className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                      <p className="text-muted-foreground">Timeline visualization would appear here</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="bg-muted/20 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="h-4 w-4 text-primary" />
                        <h4 className="font-medium">Peak Hours</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Highest engagement occurs between 5-7 PM on weekdays
                      </p>
                    </div>
                    <div className="bg-muted/20 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar className="h-4 w-4 text-primary" />
                        <h4 className="font-medium">Best Days</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Weekends show 27% higher AR activation rates
                      </p>
                    </div>
                    <div className="bg-muted/20 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Zap className="h-4 w-4 text-primary" />
                        <h4 className="font-medium">Engagement Triggers</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Interactive elements increase dwell time by 42%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="location" className="space-y-6">
              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-lg">Location Performance Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] flex items-center justify-center bg-muted/20 rounded-lg mb-6">
                    <div className="text-center">
                      <MapPin className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                      <p className="text-muted-foreground">Interactive map visualization would appear here</p>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 text-sm">Location</th>
                          <th className="text-left py-3 px-4 text-sm">Impressions</th>
                          <th className="text-left py-3 px-4 text-sm">Avg. Engagement</th>
                          <th className="text-left py-3 px-4 text-sm">Conversion Rate</th>
                          <th className="text-left py-3 px-4 text-sm">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {locationPerformance.map((location, index) => (
                          <tr key={index}>
                            <td className="py-3 px-4">{location.location}</td>
                            <td className="py-3 px-4">{location.impressions}</td>
                            <td className="py-3 px-4">{location.engagement}</td>
                            <td className="py-3 px-4">{location.conversion}</td>
                            <td className="py-3 px-4">
                              <Button variant="ghost" size="sm">View Details</Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Traffic Flow Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px] flex items-center justify-center bg-muted/20 rounded-lg">
                      <div className="text-center">
                        <LineChart className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                        <p className="text-muted-foreground">Hourly traffic flow chart would appear here</p>
                      </div>
                    </div>

                    <div className="mt-4 space-y-1 text-sm">
                      <div className="flex justify-between py-2 border-b border-border">
                        <span>Peak Traffic Hours</span>
                        <span className="font-medium">8-10 AM, 6-8 PM</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-border">
                        <span>Average Daily Foot Traffic</span>
                        <span className="font-medium">28,450</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-border">
                        <span>Weekend vs Weekday</span>
                        <span className="font-medium">+32% on weekends</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span>Traffic Quality Score</span>
                        <span className="font-medium text-green-600">87/100</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Location Effectiveness</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px] flex items-center justify-center bg-muted/20 rounded-lg">
                      <div className="text-center">
                        <PieChart className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                        <p className="text-muted-foreground">Location ROI comparison chart would appear here</p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h4 className="text-sm font-medium mb-2">Top Performing Locations</h4>
                      <div className="space-y-2">
                        {locationPerformance.slice(0, 3).map((location, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="text-xs font-medium">{index + 1}</span>
                              </div>
                              <span className="text-sm">{location.location}</span>
                            </div>
                            <div className="text-sm font-medium">{location.conversion}</div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 pt-4 border-t border-border">
                        <Button variant="link" size="sm" className="pl-0">
                          View detailed location analytics
                          <ChevronDown className="h-3 w-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="campaign" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Campaign Performance Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px] flex items-center justify-center bg-muted/20 rounded-lg mb-4">
                      <div className="text-center">
                        <BarChart3 className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                        <p className="text-muted-foreground">Campaign comparison chart would appear here</p>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-2 px-3">Campaign</th>
                            <th className="text-right py-2 px-3">Impressions</th>
                            <th className="text-right py-2 px-3">Engagement</th>
                            <th className="text-right py-2 px-3">Conversion</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {campaignPerformance.map((campaign, index) => (
                            <tr key={index}>
                              <td className="py-2 px-3">{campaign.name}</td>
                              <td className="py-2 px-3 text-right">{campaign.impressions}</td>
                              <td className="py-2 px-3 text-right">{campaign.engagement}</td>
                              <td className="py-2 px-3 text-right">{campaign.conversion}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Campaign ROI Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px] flex items-center justify-center bg-muted/20 rounded-lg mb-4">
                      <div className="text-center">
                        <TrendingUp className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                        <p className="text-muted-foreground">ROI chart would appear here</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Campaign Effectiveness</h4>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="bg-muted/20 p-3 rounded-lg text-center">
                            <div className="text-lg font-bold text-green-600">127%</div>
                            <div className="text-xs text-muted-foreground">Avg. ROI</div>
                          </div>
                          <div className="bg-muted/20 p-3 rounded-lg text-center">
                            <div className="text-lg font-bold">₹42</div>
                            <div className="text-xs text-muted-foreground">Cost per Thousand</div>
                          </div>
                          <div className="bg-muted/20 p-3 rounded-lg text-center">
                            <div className="text-lg font-bold">₹18</div>
                            <div className="text-xs text-muted-foreground">Cost per Conversion</div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-border">
                        <h4 className="text-sm font-medium mb-2">Performance by Format</h4>
                        <div className="space-y-2">
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>AR-Enhanced</span>
                              <span className="text-green-600">148% ROI</span>
                            </div>
                            <div className="h-2 rounded-full bg-muted overflow-hidden">
                              <div className="h-full bg-green-500" style={{ width: "85%" }}></div>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>Interactive Digital</span>
                              <span className="text-green-600">127% ROI</span>
                            </div>
                            <div className="h-2 rounded-full bg-muted overflow-hidden">
                              <div className="h-full bg-blue-500" style={{ width: "70%" }}></div>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>Static Billboard</span>
                              <span className="text-green-600">108% ROI</span>
                            </div>
                            <div className="h-2 rounded-full bg-muted overflow-hidden">
                              <div className="h-full bg-amber-500" style={{ width: "55%" }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Campaign Timeline Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-lg mb-4">
                    <div className="text-center">
                      <LineChart className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                      <p className="text-muted-foreground">Timeline performance chart would appear here</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-muted/20 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="h-4 w-4 text-primary" />
                        <h4 className="font-medium">Optimization Points</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        AI recommends optimizing campaigns during weekday mornings to increase engagement by 18%.
                      </p>
                    </div>
                    <div className="bg-muted/20 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="h-4 w-4 text-primary" />
                        <h4 className="font-medium">Audience Insights</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        25-34 age group shows highest AR activation rates, targeting should prioritize this segment.
                      </p>
                    </div>
                    <div className="bg-muted/20 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="h-4 w-4 text-primary" />
                        <h4 className="font-medium">Creative Impact</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Interactive elements increase engagement by 42% compared to static creative across all campaigns.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default DeepAnalytics;

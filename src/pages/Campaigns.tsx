
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardSidebar from "@/components/DashboardSidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  BarChart3, 
  Calendar, 
  Clock, 
  Filter, 
  MapPin, 
  PieChart, 
  Plus, 
  Search,
  Target, 
  TrendingUp, 
  Users
} from "lucide-react";

const Campaigns = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("active");

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

  const activeCampaigns = [
    {
      id: 1,
      name: "Q2 Brand Awareness",
      type: "Billboard",
      location: "Mumbai Central",
      status: "Active",
      progress: 68,
      impressions: "1.2M",
      budget: "₹450,000",
      startDate: "2025-04-15",
      endDate: "2025-06-15",
    },
    {
      id: 2,
      name: "Summer Sale Promotion",
      type: "Digital Screen",
      location: "Delhi Metro",
      status: "Active",
      progress: 42,
      impressions: "870K",
      budget: "₹320,000",
      startDate: "2025-05-01",
      endDate: "2025-07-31",
    },
    {
      id: 3,
      name: "AR Product Experience",
      type: "Interactive Billboard",
      location: "Bangalore Tech Park",
      status: "Active",
      progress: 23,
      impressions: "450K",
      budget: "₹680,000",
      startDate: "2025-05-10",
      endDate: "2025-08-10",
    },
  ];

  const draftCampaigns = [
    {
      id: 4,
      name: "Festive Season Campaign",
      type: "Multi-Location",
      status: "Draft",
      budget: "₹1,200,000",
      startDate: "2025-09-15",
    },
    {
      id: 5,
      name: "Product Launch Teaser",
      type: "Digital Screen",
      status: "Draft",
      budget: "₹450,000",
      startDate: "2025-07-01",
    },
  ];

  const completedCampaigns = [
    {
      id: 6,
      name: "New Year Promotion",
      type: "Billboard",
      location: "Mumbai Suburbs",
      status: "Completed",
      impressions: "2.1M",
      budget: "₹520,000",
      startDate: "2025-01-01",
      endDate: "2025-03-01",
      roi: "127%",
    },
    {
      id: 7,
      name: "Tech Expo Ads",
      type: "Digital Screen",
      location: "Delhi Convention Center",
      status: "Completed",
      impressions: "780K",
      budget: "₹290,000",
      startDate: "2025-02-15",
      endDate: "2025-03-15",
      roi: "118%",
    },
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
              <h1 className="text-3xl font-bold mb-2">Campaigns</h1>
              <p className="text-muted-foreground">Manage and monitor your outdoor advertising campaigns</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search campaigns..." 
                  className="pl-8 pr-4 py-2 rounded-md bg-muted/50 border border-border text-sm focus:outline-none focus:ring-1 focus:ring-primary w-full md:w-[200px]" 
                />
              </div>
              <Button className="gap-1">
                <Plus className="h-4 w-4" />
                New Campaign
              </Button>
            </div>
          </div>

          <Tabs defaultValue="active" className="space-y-6">
            <TabsList>
              <TabsTrigger value="active">Active Campaigns</TabsTrigger>
              <TabsTrigger value="drafts">Drafts</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Active Campaigns ({activeCampaigns.length})</h2>
                <Button variant="outline" size="sm" className="gap-1">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
              </div>

              {activeCampaigns.map((campaign) => (
                <Card key={campaign.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-6 border-b border-border">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-semibold">{campaign.name}</h3>
                            <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-200">
                              {campaign.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Target className="h-3.5 w-3.5" />
                              <span>{campaign.type}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3.5 w-3.5" />
                              <span>{campaign.location}</span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 md:mt-0">
                          <Button size="sm">View Details</Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Campaign Progress</span>
                          <span className="font-medium">{campaign.progress}%</span>
                        </div>
                        <Progress value={campaign.progress} className="h-2" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-border">
                      <div className="p-4">
                        <div className="text-xs text-muted-foreground mb-1">Impressions</div>
                        <div className="font-semibold text-lg">{campaign.impressions}</div>
                      </div>
                      <div className="p-4">
                        <div className="text-xs text-muted-foreground mb-1">Budget</div>
                        <div className="font-semibold text-lg">{campaign.budget}</div>
                      </div>
                      <div className="p-4">
                        <div className="text-xs text-muted-foreground mb-1">Start Date</div>
                        <div className="font-medium flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {new Date(campaign.startDate).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="text-xs text-muted-foreground mb-1">End Date</div>
                        <div className="font-medium flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {new Date(campaign.endDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="drafts" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Draft Campaigns ({draftCampaigns.length})</h2>
                <Button variant="outline" size="sm" className="gap-1">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
              </div>

              {draftCampaigns.map((campaign) => (
                <Card key={campaign.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold">{campaign.name}</h3>
                          <Badge variant="outline" className="bg-orange-500/10 text-orange-600 border-orange-200">
                            {campaign.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Target className="h-3.5 w-3.5" />
                            <span>{campaign.type}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>Planned: {new Date(campaign.startDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <TrendingUp className="h-3.5 w-3.5" />
                            <span>Budget: {campaign.budget}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4 md:mt-0">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button size="sm">Launch</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="completed" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Completed Campaigns ({completedCampaigns.length})</h2>
                <Button variant="outline" size="sm" className="gap-1">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
              </div>

              {completedCampaigns.map((campaign) => (
                <Card key={campaign.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-6 border-b border-border">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-semibold">{campaign.name}</h3>
                            <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-blue-200">
                              {campaign.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Target className="h-3.5 w-3.5" />
                              <span>{campaign.type}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3.5 w-3.5" />
                              <span>{campaign.location}</span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 md:mt-0">
                          <Button variant="outline" size="sm">View Report</Button>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-y md:divide-y-0 divide-border">
                      <div className="p-4">
                        <div className="text-xs text-muted-foreground mb-1">Impressions</div>
                        <div className="font-semibold text-lg">{campaign.impressions}</div>
                      </div>
                      <div className="p-4">
                        <div className="text-xs text-muted-foreground mb-1">Budget</div>
                        <div className="font-semibold text-lg">{campaign.budget}</div>
                      </div>
                      <div className="p-4">
                        <div className="text-xs text-muted-foreground mb-1">ROI</div>
                        <div className="font-semibold text-lg text-green-600">{campaign.roi}</div>
                      </div>
                      <div className="p-4">
                        <div className="text-xs text-muted-foreground mb-1">Start Date</div>
                        <div className="font-medium flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {new Date(campaign.startDate).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="text-xs text-muted-foreground mb-1">End Date</div>
                        <div className="font-medium flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {new Date(campaign.endDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Campaigns;

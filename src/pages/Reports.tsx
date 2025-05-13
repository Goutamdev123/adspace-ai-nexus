
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
  ArrowDown, 
  ArrowUp, 
  Calendar, 
  ChevronDown, 
  Clock, 
  Download, 
  Eye, 
  FileText, 
  Filter, 
  Mail, 
  MoreHorizontal, 
  Printer, 
  Repeat, 
  Share,
  Smartphone,
  TrendingUp,
  Users
} from "lucide-react";

const Reports = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("overview");
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

  const summaryCards = [
    { title: "Total Campaigns", value: "8", change: "+2", isPositive: true },
    { title: "Total Impressions", value: "14.6M", change: "+18.4%", isPositive: true },
    { title: "Avg. Engagement", value: "6.8s", change: "+23.1%", isPositive: true },
    { title: "Conversion Rate", value: "2.4%", change: "-0.3%", isPositive: false },
  ];

  const savedReports = [
    { name: "Q1 2025 Performance Summary", type: "Quarterly", date: "2025-04-01", status: "Completed" },
    { name: "Mumbai Campaign Analysis", type: "Campaign", date: "2025-05-10", status: "Completed" },
    { name: "AR Technology Impact", type: "Technology", date: "2025-05-05", status: "Completed" },
    { name: "Year-to-Date Performance", type: "Annual", date: "2025-05-12", status: "In Progress" },
    { name: "Location Effectiveness Report", type: "Location", date: "2025-05-08", status: "Completed" },
  ];

  const scheduledReports = [
    { name: "Weekly Campaign Summary", frequency: "Weekly", nextDate: "2025-05-20", recipients: 3 },
    { name: "Executive Dashboard", frequency: "Monthly", nextDate: "2025-06-01", recipients: 5 },
    { name: "ROI Analysis", frequency: "Quarterly", nextDate: "2025-07-01", recipients: 2 },
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
              <h1 className="text-3xl font-bold mb-2">Reports</h1>
              <p className="text-muted-foreground">Download, schedule, and view campaign reports</p>
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
              <Button>
                <FileText className="mr-2 h-4 w-4" />
                New Report
              </Button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {summaryCards.map((card, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm text-muted-foreground">{card.title}</div>
                    <Badge variant="outline" className={`${card.isPositive ? 'bg-green-500/10 text-green-600 border-green-200' : 'bg-red-500/10 text-red-600 border-red-200'}`}>
                      <span className="flex items-center gap-1">
                        {card.isPositive ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                        {card.change}
                      </span>
                    </Badge>
                  </div>
                  <div className="text-3xl font-bold">{card.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="saved" className="space-y-6">
            <TabsList>
              <TabsTrigger value="saved">Saved Reports</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
              <TabsTrigger value="create">Create Report</TabsTrigger>
            </TabsList>

            <TabsContent value="saved" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Recent Reports</CardTitle>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Filter className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input 
                          type="text" 
                          placeholder="Filter reports..." 
                          className="pl-8 pr-4 py-1 rounded-md bg-muted/50 border border-border text-sm focus:outline-none focus:ring-1 focus:ring-primary w-[200px]" 
                        />
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 text-sm font-medium">Report Name</th>
                          <th className="text-left py-3 px-4 text-sm font-medium">Type</th>
                          <th className="text-left py-3 px-4 text-sm font-medium">Date</th>
                          <th className="text-left py-3 px-4 text-sm font-medium">Status</th>
                          <th className="text-right py-3 px-4 text-sm font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {savedReports.map((report, index) => (
                          <tr key={index}>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                  <FileText className="h-4 w-4 text-primary" />
                                </div>
                                <span>{report.name}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">{report.type}</td>
                            <td className="py-3 px-4">{new Date(report.date).toLocaleDateString()}</td>
                            <td className="py-3 px-4">
                              <Badge variant="outline" className={report.status === "Completed" ? "bg-green-500/10 text-green-600" : "bg-amber-500/10 text-amber-600"}>
                                {report.status}
                              </Badge>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Button variant="ghost" size="sm">
                                  <Download className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Share className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Report Templates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-muted/30 p-4 rounded-lg border border-border/50">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <TrendingUp className="h-4 w-4 text-primary" />
                          </div>
                          <h4 className="font-medium">Performance Summary</h4>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Complete overview of campaign performance metrics
                        </p>
                        <Button size="sm" variant="outline" className="w-full">Use Template</Button>
                      </div>

                      <div className="bg-muted/30 p-4 rounded-lg border border-border/50">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <Users className="h-4 w-4 text-primary" />
                          </div>
                          <h4 className="font-medium">Audience Analysis</h4>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Detailed breakdown of audience demographics
                        </p>
                        <Button size="sm" variant="outline" className="w-full">Use Template</Button>
                      </div>

                      <div className="bg-muted/30 p-4 rounded-lg border border-border/50">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <Smartphone className="h-4 w-4 text-primary" />
                          </div>
                          <h4 className="font-medium">AR Engagement</h4>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Metrics for AR-enhanced advertisement performance
                        </p>
                        <Button size="sm" variant="outline" className="w-full">Use Template</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-lg">Featured Report</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted/20 rounded-lg p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <FileText className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">Q1 2025 Performance Summary</h3>
                          <div className="text-sm text-muted-foreground">Generated on May 10, 2025</div>
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="bg-muted/30 p-3 rounded-lg text-center">
                            <div className="text-xl font-bold">3.2M</div>
                            <div className="text-xs text-muted-foreground">Impressions</div>
                          </div>
                          <div className="bg-muted/30 p-3 rounded-lg text-center">
                            <div className="text-xl font-bold">7.3s</div>
                            <div className="text-xs text-muted-foreground">Avg. Engagement</div>
                          </div>
                          <div className="bg-muted/30 p-3 rounded-lg text-center">
                            <div className="text-xl font-bold">137%</div>
                            <div className="text-xs text-muted-foreground">ROI</div>
                          </div>
                        </div>
                        
                        <div className="h-[150px] bg-muted/30 rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <TrendingUp className="h-6 w-6 mx-auto text-muted-foreground mb-2" />
                            <p className="text-sm text-muted-foreground">
                              Performance metrics visualization
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between pt-2">
                          <div className="text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Eye className="h-3.5 w-3.5" />
                              Last viewed 2 days ago
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline">
                              <Download className="h-4 w-4 mr-1" />
                              PDF
                            </Button>
                            <Button size="sm">
                              View Full Report
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="scheduled" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Scheduled Reports</CardTitle>
                    <Button>Schedule New</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 text-sm font-medium">Report Name</th>
                          <th className="text-left py-3 px-4 text-sm font-medium">Frequency</th>
                          <th className="text-left py-3 px-4 text-sm font-medium">Next Delivery</th>
                          <th className="text-left py-3 px-4 text-sm font-medium">Recipients</th>
                          <th className="text-right py-3 px-4 text-sm font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {scheduledReports.map((report, index) => (
                          <tr key={index}>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                  <Repeat className="h-4 w-4 text-primary" />
                                </div>
                                <span>{report.name}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">{report.frequency}</td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                {new Date(report.nextDate).toLocaleDateString()}
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-1">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                {report.recipients} recipient{report.recipients !== 1 && 's'}
                              </div>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Button variant="ghost" size="sm">
                                  <Clock className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Mail className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Schedule Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Delivery Options</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-2 rounded-md bg-muted/30">
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-primary" />
                              <span className="text-sm">Email</span>
                            </div>
                            <Badge variant="outline" className="bg-green-500/10 text-green-600">Active</Badge>
                          </div>
                          <div className="flex items-center justify-between p-2 rounded-md bg-muted/30">
                            <div className="flex items-center gap-2">
                              <Download className="h-4 w-4 text-primary" />
                              <span className="text-sm">Dashboard</span>
                            </div>
                            <Badge variant="outline" className="bg-green-500/10 text-green-600">Active</Badge>
                          </div>
                          <div className="flex items-center justify-between p-2 rounded-md bg-muted/30">
                            <div className="flex items-center gap-2">
                              <Printer className="h-4 w-4 text-primary" />
                              <span className="text-sm">Print API</span>
                            </div>
                            <Badge variant="outline" className="bg-muted/50 text-muted-foreground">Inactive</Badge>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-border">
                        <Button variant="outline" className="w-full">
                          Manage Delivery Options
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Deliveries</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 rounded-md bg-muted/30">
                        <div>
                          <div className="font-medium">Weekly Campaign Summary</div>
                          <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                            <Calendar className="h-3 w-3" />
                            May 13, 2025
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-green-500/10 text-green-600">Delivered</Badge>
                      </div>

                      <div className="flex items-center justify-between p-3 rounded-md bg-muted/30">
                        <div>
                          <div className="font-medium">Executive Dashboard</div>
                          <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                            <Calendar className="h-3 w-3" />
                            May 1, 2025
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-green-500/10 text-green-600">Delivered</Badge>
                      </div>

                      <div className="flex items-center justify-between p-3 rounded-md bg-muted/30">
                        <div>
                          <div className="font-medium">ROI Analysis</div>
                          <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                            <Calendar className="h-3 w-3" />
                            April 1, 2025
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-green-500/10 text-green-600">Delivered</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Report Recipients</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-muted/30 p-3 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">Executive Team</h4>
                          <Badge variant="outline">5 members</Badge>
                        </div>
                        <div className="flex -space-x-2">
                          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center border-2 border-background">
                            <span className="text-xs font-medium">JD</span>
                          </div>
                          <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center border-2 border-background">
                            <span className="text-xs font-medium">SK</span>
                          </div>
                          <div className="h-8 w-8 rounded-full bg-secondary/20 flex items-center justify-center border-2 border-background">
                            <span className="text-xs font-medium">AT</span>
                          </div>
                          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center border-2 border-background">
                            <span className="text-xs font-medium">+2</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-muted/30 p-3 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">Marketing Team</h4>
                          <Badge variant="outline">8 members</Badge>
                        </div>
                        <div className="flex -space-x-2">
                          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center border-2 border-background">
                            <span className="text-xs font-medium">RP</span>
                          </div>
                          <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center border-2 border-background">
                            <span className="text-xs font-medium">MS</span>
                          </div>
                          <div className="h-8 w-8 rounded-full bg-secondary/20 flex items-center justify-center border-2 border-background">
                            <span className="text-xs font-medium">KP</span>
                          </div>
                          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center border-2 border-background">
                            <span className="text-xs font-medium">+5</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-muted/30 p-3 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">Analytics Team</h4>
                          <Badge variant="outline">4 members</Badge>
                        </div>
                        <div className="flex -space-x-2">
                          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center border-2 border-background">
                            <span className="text-xs font-medium">AD</span>
                          </div>
                          <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center border-2 border-background">
                            <span className="text-xs font-medium">VR</span>
                          </div>
                          <div className="h-8 w-8 rounded-full bg-secondary/20 flex items-center justify-center border-2 border-background">
                            <span className="text-xs font-medium">+2</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-border">
                        <Button variant="link" className="p-0">
                          Manage recipients
                          <ChevronDown className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="create" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Create New Report</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Report Name</label>
                          <input 
                            type="text" 
                            placeholder="Enter report name..." 
                            className="w-full px-4 py-2 rounded-md bg-muted/50 border border-border text-sm focus:outline-none focus:ring-1 focus:ring-primary" 
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">Report Type</label>
                          <Select defaultValue="performance">
                            <SelectTrigger>
                              <SelectValue placeholder="Select report type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="performance">Campaign Performance</SelectItem>
                              <SelectItem value="audience">Audience Analysis</SelectItem>
                              <SelectItem value="location">Location Performance</SelectItem>
                              <SelectItem value="roi">ROI Analysis</SelectItem>
                              <SelectItem value="custom">Custom Report</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">Date Range</label>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="relative">
                              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <input 
                                type="text" 
                                placeholder="Start date" 
                                className="w-full px-10 py-2 rounded-md bg-muted/50 border border-border text-sm focus:outline-none focus:ring-1 focus:ring-primary" 
                              />
                            </div>
                            <div className="relative">
                              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <input 
                                type="text" 
                                placeholder="End date" 
                                className="w-full px-10 py-2 rounded-md bg-muted/50 border border-border text-sm focus:outline-none focus:ring-1 focus:ring-primary" 
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">Include Campaigns</label>
                          <Select defaultValue="all">
                            <SelectTrigger>
                              <SelectValue placeholder="Select campaigns" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Active Campaigns</SelectItem>
                              <SelectItem value="q2">Q2 Brand Awareness</SelectItem>
                              <SelectItem value="summer">Summer Sale Promotion</SelectItem>
                              <SelectItem value="ar">AR Product Experience</SelectItem>
                              <SelectItem value="multiple">Select Multiple...</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Report Sections</label>
                          <div className="space-y-2">
                            <div className="flex items-center p-2 rounded-md bg-muted/30">
                              <input type="checkbox" id="overview" className="mr-3" defaultChecked />
                              <label htmlFor="overview" className="text-sm">Executive Summary</label>
                            </div>
                            <div className="flex items-center p-2 rounded-md bg-muted/30">
                              <input type="checkbox" id="demographics" className="mr-3" defaultChecked />
                              <label htmlFor="demographics" className="text-sm">Audience Demographics</label>
                            </div>
                            <div className="flex items-center p-2 rounded-md bg-muted/30">
                              <input type="checkbox" id="performance" className="mr-3" defaultChecked />
                              <label htmlFor="performance" className="text-sm">Performance Metrics</label>
                            </div>
                            <div className="flex items-center p-2 rounded-md bg-muted/30">
                              <input type="checkbox" id="locations" className="mr-3" defaultChecked />
                              <label htmlFor="locations" className="text-sm">Location Analysis</label>
                            </div>
                            <div className="flex items-center p-2 rounded-md bg-muted/30">
                              <input type="checkbox" id="roi" className="mr-3" defaultChecked />
                              <label htmlFor="roi" className="text-sm">ROI Calculation</label>
                            </div>
                            <div className="flex items-center p-2 rounded-md bg-muted/30">
                              <input type="checkbox" id="recommendations" className="mr-3" defaultChecked />
                              <label htmlFor="recommendations" className="text-sm">AI Recommendations</label>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">Format Options</label>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center p-2 rounded-md bg-muted/30">
                              <input type="radio" id="pdf" name="format" className="mr-3" defaultChecked />
                              <label htmlFor="pdf" className="text-sm">PDF Report</label>
                            </div>
                            <div className="flex items-center p-2 rounded-md bg-muted/30">
                              <input type="radio" id="excel" name="format" className="mr-3" />
                              <label htmlFor="excel" className="text-sm">Excel Data</label>
                            </div>
                            <div className="flex items-center p-2 rounded-md bg-muted/30">
                              <input type="radio" id="interactive" name="format" className="mr-3" />
                              <label htmlFor="interactive" className="text-sm">Interactive</label>
                            </div>
                            <div className="flex items-center p-2 rounded-md bg-muted/30">
                              <input type="radio" id="presentation" name="format" className="mr-3" />
                              <label htmlFor="presentation" className="text-sm">Presentation</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center">
                        <input type="checkbox" id="schedule" className="mr-2" />
                        <label htmlFor="schedule" className="text-sm">Schedule this report</label>
                      </div>
                      <div className="flex gap-3">
                        <Button variant="outline">Preview</Button>
                        <Button>Generate Report</Button>
                      </div>
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

export default Reports;


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Bell, ChevronDown, Search, Menu, MapPin, 
  ChevronRight, Sun, Moon
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface DashboardHeaderProps {
  toggleSidebar: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const DashboardHeader = ({ 
  toggleSidebar, 
  isDarkMode, 
  toggleDarkMode 
}: DashboardHeaderProps) => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("overview");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    // Show toast notification for tab change
    toast.success(`${value.charAt(0).toUpperCase() + value.slice(1)} view activated`, {
      description: "Loading data for this view...",
      duration: 2000,
    });

    // In a real application, you would navigate to different routes
    // navigate(`/dashboard/${value}`);
  };

  return (
    <header className="w-full py-3 px-4 flex items-center justify-between border-b border-border animate-fade-in">
      {isMobile && (
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className="mr-2"
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}
      
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center">
          <h1 className="text-lg font-semibold mr-6">Analytics Dashboard</h1>
          
          <Tabs 
            defaultValue="overview" 
            value={activeTab}
            onValueChange={handleTabChange}
            className="hidden lg:block"
          >
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
              <TabsTrigger value="analytics">Deep Analytics</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {isMobile && (
          <h1 className="text-lg font-semibold">Dashboard</h1>
        )}
      </div>
      
      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center relative">
          <Search className="absolute left-2 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="pl-8 pr-4 py-1 rounded-md bg-muted/50 border border-border text-sm focus:outline-none focus:ring-1 focus:ring-primary w-[200px]" 
          />
        </div>
        
        <div className="flex items-center gap-1">
          <Sun className={`h-4 w-4 ${!isDarkMode ? 'text-adtech-orange' : 'text-muted-foreground'}`} />
          <Switch 
            checked={isDarkMode} 
            onCheckedChange={toggleDarkMode} 
            className="data-[state=checked]:bg-adtech-dark-blue" 
          />
          <Moon className={`h-4 w-4 ${isDarkMode ? 'text-adtech-blue' : 'text-muted-foreground'}`} />
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative"
          onClick={() => {
            toast.info("Notifications", {
              description: "You have 3 unread notifications",
            });
          }}
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-adtech-orange rounded-full"></span>
        </Button>
        
        <div className="hidden md:flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-adtech-purple/20 flex items-center justify-center">
            <span className="text-xs font-medium text-adtech-purple">AD</span>
          </div>
          <div className="flex items-center">
            <span className="text-sm mr-1">Admin</span>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;

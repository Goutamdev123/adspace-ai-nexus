
import React from 'react';
import { cn } from "@/lib/utils";
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  Home, 
  LayoutDashboard,
  MapPin,
  ChartBar,
  ChartLine,
  ChartPie,
  DollarSign,
  Rocket,
  Smartphone
} from 'lucide-react';

interface DashboardSidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const DashboardSidebar = ({ isOpen, toggleSidebar }: DashboardSidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  
  const navItems = [
    { 
      name: 'Dashboard', 
      icon: LayoutDashboard,
      path: '/'
    },
    { 
      name: 'Map Analytics', 
      icon: MapPin,
      path: '/map-analytics'
    },
    { 
      name: 'Performance', 
      icon: ChartBar,
      path: '/performance'
    },
    { 
      name: 'Revenue', 
      icon: ChartLine,
      path: '/revenue'
    },
    { 
      name: 'Forecasts', 
      icon: ChartPie,
      path: '/forecasts'
    },
    { 
      name: 'Budget Campaign', 
      icon: DollarSign,
      path: '/budget-campaign'
    },
    { 
      name: 'AR Working Demo', 
      icon: Smartphone,
      path: '/ar-working-demo'
    },
    { 
      name: 'Business Solutions', 
      icon: Rocket,
      path: '/business-solutions'
    }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <aside 
      className={cn(
        "fixed top-0 left-0 h-full bg-sidebar z-30 transition-all duration-300 border-r border-border",
        isOpen ? "w-64" : "w-0 md:w-16"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="h-14 flex items-center px-3 justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-md bg-adtech-blue flex items-center justify-center">
              <span className="font-bold text-white">A</span>
            </div>
            {isOpen && <span className="font-semibold">AdTech Nexus</span>}
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="hidden md:flex" 
            onClick={toggleSidebar}
          >
            {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
        </div>

        <div className="mt-6 flex flex-col space-y-1 px-3">
          {navItems.map((item) => (
            <Button 
              key={item.name}
              variant={currentPath === item.path ? "secondary" : "ghost"}
              className={cn(
                "justify-start",
                isOpen ? "" : "justify-center",
                currentPath === item.path && "bg-sidebar-accent text-sidebar-accent-foreground"
              )}
              size={isOpen ? "default" : "icon"}
              onClick={() => handleNavigation(item.path)}
            >
              <item.icon className={cn("h-5 w-5", isOpen ? "mr-2" : "")} />
              {isOpen && <span>{item.name}</span>}
            </Button>
          ))}
        </div>

        <div className="mt-auto px-3 pb-6">
          {isOpen && (
            <div className="rounded-lg bg-adtech-dark p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium">AI Assistant</span>
                <span className="h-2 w-2 bg-adtech-green rounded-full relative">
                  <span className="absolute inset-0 bg-adtech-green rounded-full animate-ping-slow"></span>
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-3">Need help with your analytics? Ask our AI assistant.</p>
              <Button size="sm" className="w-full bg-adtech-blue hover:bg-adtech-blue/90">
                Ask AI
              </Button>
            </div>
          )}
          
          <div className={cn(
            "rounded-lg bg-sidebar-accent p-2 flex",
            isOpen ? "items-center justify-between" : "justify-center"
          )}>
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-adtech-purple/20 flex items-center justify-center">
                <span className="text-xs font-medium text-adtech-purple">AD</span>
              </div>
              {isOpen && <span className="text-sm">Admin</span>}
            </div>
            {isOpen && (
              <Button variant="ghost" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;

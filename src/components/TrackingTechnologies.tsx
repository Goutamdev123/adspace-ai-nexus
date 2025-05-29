import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Satellite, 
  Smartphone, 
  MapPin, 
  Layers, 
  TrendingUp 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const TrackingTechnologies = () => {
  const [activeTab, setActiveTab] = useState('satellite');
  const [loading, setLoading] = useState(false);
  const [showNotice, setShowNotice] = useState(false);

  const handleSatelliteClick = () => {
    setLoading(true);
    setShowNotice(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <Card className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Layers className="h-4 w-4 text-adtech-blue" />
          Advanced Tracking Technologies
        </CardTitle>
        <Badge variant="outline" className="bg-adtech-blue/10 text-adtech-blue border-adtech-blue/20">
          Premium
        </Badge>
      </CardHeader>
      <CardContent className="pt-0">
        <Tabs defaultValue="satellite" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="satellite" className="text-xs">
              <Satellite className="h-3 w-3 mr-1" /> Satellite
            </TabsTrigger>
            <TabsTrigger value="gis" className="text-xs">
              <MapPin className="h-3 w-3 mr-1" /> GIS
            </TabsTrigger>
            <TabsTrigger value="mobile" className="text-xs">
              <Smartphone className="h-3 w-3 mr-1" /> Mobile
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="satellite" className="space-y-4">
            <div className="relative h-32 rounded-md overflow-hidden bg-black">
              <div className="absolute inset-0 bg-gradient-to-br from-adtech-dark-blue to-black opacity-70"></div>
              <div className="absolute inset-0 bg-[url('https://raw.githubusercontent.com/Goutamdev123/adspace-ai-nexus/refs/heads/main/public/aerospace-final.jpeg')] bg-cover bg-center opacity-50"></div>
              <div className="absolute bottom-0 left-0 p-3">
                <h4 className="text-xs font-semibold text-white">Satellite Imagery Analytics</h4>
                <p className="text-xs text-white/80">High-resolution area analysis</p>
              </div>
              <div className="absolute top-2 right-2">
                <Badge variant="outline" className="text-[10px] h-4 bg-black/50 text-white border-white/20">Live</Badge>
              </div>
            </div>
            
            <div className="text-xs text-muted-foreground">
              <p className="mb-2">Our satellite imagery provides detailed resolution of urban and rural areas, allowing businesses to visualize potential ad placements with precision.</p>
              <div className="grid grid-cols-2 gap-2 mt-3">
                <div className="border border-border rounded-md p-2">
                  <p className="font-medium text-foreground">98.7%</p>
                  <p className="text-[10px]">Location Accuracy</p>
                </div>
                <div className="border border-border rounded-md p-2">
                  <p className="font-medium text-foreground">24hr</p>
                  <p className="text-[10px]">Update Frequency</p>
                </div>
              </div>
            </div>
            
            <Button variant="outline" size="sm" className="w-full" onClick={handleSatelliteClick}>
              Explore Satellite Data
            </Button>
            {showNotice && (
              <div className="text-center text-xs mt-2 text-yellow-600">
                Satellite Data is under development, coming soon {loading ? "⏳" : "✅"}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="gis" className="space-y-4">
            <div className="relative h-32 rounded-md overflow-hidden bg-black">
              <div className="absolute inset-0 bg-gradient-to-br from-adtech-dark-blue to-black opacity-70"></div>
              <div className="absolute inset-0 bg-[url('"></div>
              <div className="absolute bottom-0 left-0 p-3">
                <h4 className="text-xs font-semibold text-white">GIS Integration</h4>
                <p className="text-xs text-white/80">Layered demographic analysis</p>
              </div>
              <div className="absolute top-2 right-2">
                <Badge variant="outline" className="text-[10px] h-4 bg-black/50 text-white border-white/20">Real-time</Badge>
              </div>
            </div>
            
            <div className="text-xs text-muted-foreground">
              <p className="mb-2">Our GIS technology maps demographic data, traffic patterns, and consumer behavior to identify optimal advertising locations for your target audience.</p>
              <div className="grid grid-cols-2 gap-2 mt-3">
                <div className="border border-border rounded-md p-2">
                  <p className="font-medium text-foreground">45+</p>
                  <p className="text-[10px]">Data Layers</p>
                </div>
                <div className="border border-border rounded-md p-2">
                  <p className="font-medium text-foreground">92%</p>
                  <p className="text-[10px]">Prediction Accuracy</p>
                </div>
              </div>
            </div>
            
            <Button variant="outline" size="sm" className="w-full">
              Analyze GIS Data
            </Button>
          </TabsContent>
          
          <TabsContent value="mobile" className="space-y-4">
            <div className="relative h-32 rounded-md overflow-hidden bg-black">
              <div className="absolute inset-0 bg-gradient-to-br from-adtech-dark-blue to-black opacity-70"></div>
              <div className="absolute inset-0 bg-[url('"></div>
              <div className="absolute bottom-0 left-0 p-3">
                <h4 className="text-xs font-semibold text-white">Mobile Tracking</h4>
                <p className="text-xs text-white/80">Footfall & engagement analysis</p>
              </div>
              <div className="absolute top-2 right-2">
                <Badge variant="outline" className="text-[10px] h-4 bg-black/50 text-white border-white/20">Privacy-compliant</Badge>
              </div>
            </div>
            
            <div className="text-xs text-muted-foreground">
              <p className="mb-2">Our mobile tracking system anonymously monitors device movement patterns to measure potential ad exposure and engagement in specific locations.</p>
              <div className="grid grid-cols-2 gap-2 mt-3">
                <div className="border border-border rounded-md p-2">
                  <p className="font-medium text-foreground">3.2M</p>
                  <p className="text-[10px]">Daily Tracked Devices</p>
                </div>
                <div className="border border-border rounded-md p-2">
                  <p className="font-medium text-foreground">97.5%</p>
                  <p className="text-[10px]">Data Anonymization</p>
                </div>
              </div>
            </div>
            
            <Button variant="outline" size="sm" className="w-full">
              View Mobile Analytics
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TrackingTechnologies;

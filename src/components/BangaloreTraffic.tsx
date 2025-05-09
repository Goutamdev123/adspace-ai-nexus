
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Car, Clock, BarChart, Eye, ArrowLeft } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const BangaloreTraffic = () => {
  const [activeTimeframe, setActiveTimeframe] = useState<'live' | 'morning' | 'evening'>('live');
  const [showTooltip, setShowTooltip] = useState<{visible: boolean, area: string, x: number, y: number}>({
    visible: false,
    area: '',
    x: 0,
    y: 0
  });
  const [activeView, setActiveView] = useState<'map' | 'list' | 'street'>('map');
  const [selectedArea, setSelectedArea] = useState<any>(null);
  
  // Bangalore areas with traffic data
  const bangaloreAreas = [
    { id: 1, name: "Koramangala", vehicleIntensity: 0.92, footfallIntensity: 0.87, lat: 12.9352, lng: 77.6245, vehicleCount: 1250, billboardCount: 8, streetViewImg: "https://images.unsplash.com/photo-1503951458645-643d53bfd90f?w=800&auto=format&fit=crop&q=60" },
    { id: 2, name: "Indiranagar", vehicleIntensity: 0.89, footfallIntensity: 0.91, lat: 12.9784, lng: 77.6408, vehicleCount: 980, billboardCount: 12, streetViewImg: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&auto=format&fit=crop&q=60" },
    { id: 3, name: "MG Road", vehicleIntensity: 0.95, footfallIntensity: 0.96, lat: 12.9767, lng: 77.6095, vehicleCount: 1580, billboardCount: 15, streetViewImg: "https://images.unsplash.com/photo-1603312848676-3fc3b1a2fba2?w=800&auto=format&fit=crop&q=60" },
    { id: 4, name: "Whitefield", vehicleIntensity: 0.94, footfallIntensity: 0.78, lat: 12.9698, lng: 77.7499, vehicleCount: 1480, billboardCount: 6, streetViewImg: "https://images.unsplash.com/photo-1565017228812-8c3a907dcd08?w=800&auto=format&fit=crop&q=60" },
    { id: 5, name: "Electronic City", vehicleIntensity: 0.91, footfallIntensity: 0.75, lat: 12.8399, lng: 77.6770, vehicleCount: 1320, billboardCount: 9, streetViewImg: "https://images.unsplash.com/photo-1564575888339-0e6161d98100?w=800&auto=format&fit=crop&q=60" },
    { id: 6, name: "Jayanagar", vehicleIntensity: 0.84, footfallIntensity: 0.88, lat: 12.9250, lng: 77.5938, vehicleCount: 950, billboardCount: 7, streetViewImg: "https://images.unsplash.com/photo-1598634541641-774ab296e056?w=800&auto=format&fit=crop&q=60" },
    { id: 7, name: "HSR Layout", vehicleIntensity: 0.88, footfallIntensity: 0.85, lat: 12.9116, lng: 77.6476, vehicleCount: 1050, billboardCount: 10, streetViewImg: "https://images.unsplash.com/photo-1590246815137-a69088feb129?w=800&auto=format&fit=crop&q=60" },
    { id: 8, name: "BTM Layout", vehicleIntensity: 0.86, footfallIntensity: 0.83, lat: 12.9166, lng: 77.6101, vehicleCount: 980, billboardCount: 8, streetViewImg: "https://images.unsplash.com/photo-1524729429516-485db0307e50?w=800&auto=format&fit=crop&q=60" },
    { id: 9, name: "Marathahalli", vehicleIntensity: 0.93, footfallIntensity: 0.79, lat: 12.9591, lng: 77.6980, vehicleCount: 1450, billboardCount: 5, streetViewImg: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=800&auto=format&fit=crop&q=60" },
    { id: 10, name: "Hebbal", vehicleIntensity: 0.90, footfallIntensity: 0.76, lat: 13.0355, lng: 77.5964, vehicleCount: 1280, billboardCount: 9, streetViewImg: "https://images.unsplash.com/photo-1561102078-043bc99938d4?w=800&auto=format&fit=crop&q=60" }
  ];
  
  // Traffic hotspot positions (manually calculated for visualization)
  const getTrafficPosition = (area: any) => {
    // Convert lat/lng to positions within the visualization
    // This is a simplified model for visualization purposes
    const xBase = ((area.lng - 77.58) / 0.20) * 100;
    const yBase = ((area.lat - 12.83) / 0.22) * 100;
    
    // Add some randomization based on timeframe for visual effect
    const xOffset = activeTimeframe === 'morning' ? Math.sin(area.id * 3) * 3 : 
                    activeTimeframe === 'evening' ? Math.cos(area.id * 2) * 3 : 0;
    const yOffset = activeTimeframe === 'morning' ? Math.cos(area.id * 2) * 3 : 
                    activeTimeframe === 'evening' ? Math.sin(area.id * 3) * 3 : 0;
    
    return {
      x: Math.max(5, Math.min(95, xBase + xOffset)),
      y: Math.max(5, Math.min(95, yBase + yOffset))
    };
  };

  // Get traffic intensity based on timeframe
  const getTrafficIntensity = (baseIntensity: number, areaId: number) => {
    if (activeTimeframe === 'morning') {
      // Morning rush hour - higher traffic in office areas
      if ([2, 3, 4, 5, 9].includes(areaId)) {
        return Math.min(1, baseIntensity * 1.2);
      }
      return baseIntensity * 0.9;
    } else if (activeTimeframe === 'evening') {
      // Evening rush hour - higher traffic in residential & entertainment
      if ([1, 2, 6, 7, 8].includes(areaId)) {
        return Math.min(1, baseIntensity * 1.15);
      }
      return baseIntensity * 0.95;
    }
    return baseIntensity; // Live data as is
  };

  // Get vehicle count based on timeframe
  const getVehicleCount = (baseCount: number, areaId: number) => {
    const intensity = getTrafficIntensity(1, areaId);
    return Math.round(baseCount * intensity);
  };
  
  const handleShowTrafficDetails = (area: any) => {
    toast({
      title: `${area.name} Traffic Information`,
      description: `Vehicle: ${Math.round(getTrafficIntensity(area.vehicleIntensity, area.id) * 100)}% congestion | Foot: ${Math.round(getTrafficIntensity(area.footfallIntensity, area.id) * 100)}% crowding`,
      duration: 3000
    });
  };

  const handleStreetViewSelect = (area: any) => {
    setSelectedArea(area);
    setActiveView('street');
  };

  const handleBackToMap = () => {
    setSelectedArea(null);
    setActiveView('map');
  };

  return (
    <Card className="animate-fade-in overflow-hidden" style={{ animationDelay: '0.4s' }}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-sm font-medium">Bangalore Traffic Analysis</CardTitle>
          <p className="text-xs text-muted-foreground">Real-time footfall and vehicle traffic visualization</p>
        </div>
        <Select defaultValue="live" onValueChange={(value) => setActiveTimeframe(value as any)}>
          <SelectTrigger className="w-[160px] h-8 text-xs">
            <SelectValue placeholder="Timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="live">Live Now</SelectItem>
            <SelectItem value="morning">Morning Rush (8-10AM)</SelectItem>
            <SelectItem value="evening">Evening Rush (5-8PM)</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="map" value={activeView} onValueChange={(v) => setActiveView(v as any)}>
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="map">Visual Map</TabsTrigger>
            <TabsTrigger value="list">Area List</TabsTrigger>
            <TabsTrigger value="street">Street View</TabsTrigger>
          </TabsList>
          
          <TabsContent value="map" className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <Badge variant="outline" className="flex gap-1 items-center">
                <Clock className="h-3 w-3" />
                {activeTimeframe === 'live' && 'Live Data'}
                {activeTimeframe === 'morning' && 'Morning Rush Hour'}
                {activeTimeframe === 'evening' && 'Evening Rush Hour'}
              </Badge>
              <div className="flex gap-2 text-xs">
                <span className="flex items-center gap-0.5">
                  <span className="h-2 w-2 rounded-full bg-orange-500"></span> Vehicle
                </span>
                <span className="flex items-center gap-0.5">
                  <span className="h-2 w-2 rounded-full bg-purple-500"></span> Foot
                </span>
              </div>
            </div>
            
            <div className="relative h-[300px] border rounded-md bg-muted/30 overflow-hidden">
              {/* Simplified Bangalore map outline */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path 
                    d="M30,20 Q40,15 50,20 Q60,25 70,20 Q80,15 85,25 Q90,40 85,55 Q80,70 70,80 Q60,85 50,80 Q40,75 30,80 Q20,85 15,70 Q10,50 15,35 Q20,25 30,20 Z" 
                    fill="currentColor" 
                    stroke="currentColor" 
                    strokeWidth="0.5"
                  />
                </svg>
              </div>
              
              {/* Major roads */}
              <div className="absolute inset-0 pointer-events-none">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path d="M20,50 L80,50" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
                  <path d="M50,20 L50,80" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
                  <path d="M30,30 L70,70" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
                  <path d="M30,70 L70,30" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
                  <path d="M20,20 Q50,30 80,20" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
                  <path d="M20,80 Q50,70 80,80" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
                </svg>
              </div>
              
              {/* Grid lines */}
              <div 
                className="absolute inset-0 opacity-10" 
                style={{
                  backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
                  backgroundSize: '10% 10%'
                }}
              />
              
              {/* Traffic hotspots */}
              {bangaloreAreas.map(area => {
                const position = getTrafficPosition(area);
                const vehicleIntensity = getTrafficIntensity(area.vehicleIntensity, area.id);
                const footIntensity = getTrafficIntensity(area.footfallIntensity, area.id);
                
                const vehicleSize = Math.max(12, vehicleIntensity * 25);
                const footSize = Math.max(10, footIntensity * 22);
                
                return (
                  <div key={area.id} className="absolute" style={{
                    left: `${position.x}%`,
                    top: `${position.y}%`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: 5
                  }}>
                    {/* Vehicle traffic indicator */}
                    <div 
                      className="absolute rounded-full animate-pulse cursor-pointer"
                      style={{
                        backgroundColor: `rgba(249, 115, 22, ${vehicleIntensity.toFixed(2)})`,
                        width: `${vehicleSize}px`,
                        height: `${vehicleSize}px`,
                        boxShadow: `0 0 15px rgba(249, 115, 22, ${vehicleIntensity * 0.5})`,
                        left: '-5px',
                        top: '-5px',
                        zIndex: 5
                      }}
                      onClick={() => handleShowTrafficDetails(area)}
                      onMouseEnter={() => setShowTooltip({
                        visible: true, 
                        area: area.name, 
                        x: position.x, 
                        y: position.y
                      })}
                      onMouseLeave={() => setShowTooltip({...showTooltip, visible: false})}
                    >
                      <div className="absolute -right-1 -bottom-1 bg-orange-500 rounded-full p-0.5">
                        <Car className="h-2 w-2 text-white" />
                      </div>
                    </div>
                    
                    {/* Foot traffic indicator */}
                    <div 
                      className="absolute rounded-full animate-pulse cursor-pointer"
                      style={{
                        backgroundColor: `rgba(139, 92, 246, ${footIntensity.toFixed(2)})`,
                        width: `${footSize}px`,
                        height: `${footSize}px`,
                        boxShadow: `0 0 15px rgba(139, 92, 246, ${footIntensity * 0.5})`,
                        right: '-5px',
                        top: '-5px',
                        zIndex: 5
                      }}
                      onClick={() => handleShowTrafficDetails(area)}
                      onMouseEnter={() => setShowTooltip({
                        visible: true, 
                        area: area.name, 
                        x: position.x, 
                        y: position.y
                      })}
                      onMouseLeave={() => setShowTooltip({...showTooltip, visible: false})}
                    >
                      <div className="absolute -right-1 -bottom-1 bg-purple-500 rounded-full p-0.5">
                        <MapPin className="h-2 w-2 text-white" />
                      </div>
                    </div>
                    
                    {/* Street view button */}
                    <div 
                      className="absolute -bottom-6 left-50 transform -translate-x-1/2 bg-background rounded-full p-1 shadow-md cursor-pointer z-10 hover:bg-muted transition-colors"
                      onClick={() => handleStreetViewSelect(area)}
                      title="View street level traffic"
                    >
                      <Eye className="h-2.5 w-2.5" />
                    </div>
                  </div>
                );
              })}
              
              {/* Tooltip */}
              {showTooltip.visible && (
                <div 
                  className="absolute bg-background/95 px-2 py-1 rounded text-xs font-medium shadow-md border z-10"
                  style={{
                    left: `${showTooltip.x}%`,
                    top: `${showTooltip.y - 8}%`,
                    transform: 'translate(-50%, -100%)'
                  }}
                >
                  {showTooltip.area}
                </div>
              )}
              
              {/* Legend */}
              <div className="absolute bottom-2 right-2 bg-background/80 px-2 py-1 rounded-sm text-xs">
                Bangalore
              </div>
            </div>
            
            {/* Traffic intensity scale */}
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <div className="text-xs font-medium mb-1 flex items-center gap-1">
                  <Car className="h-3 w-3 text-orange-500" /> Vehicle Traffic
                </div>
                <div className="h-2 w-full bg-gradient-to-r from-orange-500/20 via-orange-500/60 to-orange-500/90 rounded-full"></div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Low</span>
                  <span>High</span>
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="text-xs font-medium mb-1 flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-purple-500" /> Foot Traffic
                </div>
                <div className="h-2 w-full bg-gradient-to-r from-purple-500/20 via-purple-500/60 to-purple-500/90 rounded-full"></div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Low</span>
                  <span>High</span>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="list">
            <div className="space-y-1 max-h-[350px] overflow-y-auto pr-1">
              {bangaloreAreas.sort((a, b) => {
                // Sort by vehicle intensity for vehicle traffic
                const aIntensity = getTrafficIntensity(a.vehicleIntensity, a.id);
                const bIntensity = getTrafficIntensity(b.vehicleIntensity, b.id);
                return bIntensity - aIntensity;
              }).map((area) => {
                const vehicleIntensity = getTrafficIntensity(area.vehicleIntensity, area.id);
                const footIntensity = getTrafficIntensity(area.footfallIntensity, area.id);
                
                return (
                  <div 
                    key={area.id}
                    className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-md cursor-pointer transition-colors"
                    onClick={() => handleStreetViewSelect(area)}
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex flex-col items-center justify-center w-6">
                        <div 
                          className="rounded-full"
                          style={{
                            backgroundColor: `rgba(249, 115, 22, ${vehicleIntensity.toFixed(2)})`,
                            width: '12px',
                            height: '12px'
                          }}
                        />
                      </div>
                      <span className="font-medium text-sm">{area.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Car className="h-3 w-3 text-orange-500" />
                        <span className="text-xs">{Math.round(vehicleIntensity * 100)}%</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-purple-500" />
                        <span className="text-xs">{Math.round(footIntensity * 100)}%</span>
                      </div>
                      <BarChart className="h-3 w-3 text-muted-foreground" />
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>
          
          <TabsContent value="street">
            {selectedArea ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8" 
                    onClick={handleBackToMap}
                  >
                    <ArrowLeft className="h-3 w-3 mr-1" /> Back to Map
                  </Button>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {selectedArea.name}
                  </Badge>
                </div>
                
                <div className="relative h-[220px] md:h-[300px] rounded-md overflow-hidden border">
                  <img 
                    src={selectedArea.streetViewImg}
                    alt={`Street view of ${selectedArea.name}`}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Traffic overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent">
                    {/* Billboard markers */}
                    {Array.from({ length: Math.min(3, selectedArea.billboardCount) }).map((_, i) => {
                      const leftPos = 20 + (i * 30);
                      return (
                        <div 
                          key={i}
                          className="absolute top-[40%] border-2 border-white/60 rounded"
                          style={{
                            left: `${leftPos}%`,
                            width: '40px',
                            height: '30px',
                            transform: 'translateY(-50%)',
                            backgroundColor: 'rgba(0, 0, 0, 0.2)'
                          }}
                        >
                          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-white/90 px-1.5 py-0.5 rounded text-[10px] font-medium text-black whitespace-nowrap">
                            Billboard {i+1}
                          </div>
                        </div>
                      );
                    })}
                    
                    {/* Vehicle traffic counter */}
                    <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur px-3 py-2 rounded-md">
                      <div className="flex items-center gap-2">
                        <Car className="h-4 w-4 text-orange-500" />
                        <div className="text-white">
                          <div className="text-xs font-medium">Vehicle Count</div>
                          <div className="text-lg font-bold">{getVehicleCount(selectedArea.vehicleCount, selectedArea.id)}</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Traffic intensity */}
                    <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur px-3 py-2 rounded-md">
                      <div className="flex items-center gap-2">
                        <div className="text-white">
                          <div className="text-xs font-medium">Traffic Intensity</div>
                          <div className="text-lg font-bold">{Math.round(getTrafficIntensity(selectedArea.vehicleIntensity, selectedArea.id) * 100)}%</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Billboards count */}
                    <div className="absolute top-4 right-4 bg-orange-500/90 px-2 py-1 rounded text-white text-xs">
                      {selectedArea.billboardCount} Billboards
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="bg-muted/50 p-3 rounded-md">
                    <div className="text-xs font-medium text-muted-foreground mb-1">Vehicle Traffic</div>
                    <div className="text-xl font-bold">{getVehicleCount(selectedArea.vehicleCount, selectedArea.id)}/hr</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {activeTimeframe === 'morning' ? 'Peak morning traffic' : 
                       activeTimeframe === 'evening' ? 'Peak evening traffic' : 'Current traffic flow'}
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-3 rounded-md">
                    <div className="text-xs font-medium text-muted-foreground mb-1">Billboards</div>
                    <div className="text-xl font-bold">{selectedArea.billboardCount}</div>
                    <div className="text-xs text-muted-foreground mt-1">Active ad spaces</div>
                  </div>
                  
                  <div className="bg-muted/50 p-3 rounded-md">
                    <div className="text-xs font-medium text-muted-foreground mb-1">Potential Impressions</div>
                    <div className="text-xl font-bold">
                      {Math.round(getVehicleCount(selectedArea.vehicleCount, selectedArea.id) * 1.8 * selectedArea.billboardCount).toLocaleString()}/day
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">Based on current traffic</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[300px] text-center text-muted-foreground">
                <Eye className="h-10 w-10 mb-2 opacity-20" />
                <p>Select an area from the map or list to view street level traffic data</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default BangaloreTraffic;

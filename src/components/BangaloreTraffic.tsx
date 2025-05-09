
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Car, Clock, BarChart } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const BangaloreTraffic = () => {
  const [activeTimeframe, setActiveTimeframe] = useState<'live' | 'morning' | 'evening'>('live');
  const [showTooltip, setShowTooltip] = useState<{visible: boolean, area: string, x: number, y: number}>({
    visible: false,
    area: '',
    x: 0,
    y: 0
  });
  
  // Bangalore areas with traffic data
  const bangaloreAreas = [
    { id: 1, name: "Koramangala", vehicleIntensity: 0.92, footfallIntensity: 0.87, lat: 12.9352, lng: 77.6245 },
    { id: 2, name: "Indiranagar", vehicleIntensity: 0.89, footfallIntensity: 0.91, lat: 12.9784, lng: 77.6408 },
    { id: 3, name: "MG Road", vehicleIntensity: 0.95, footfallIntensity: 0.96, lat: 12.9767, lng: 77.6095 },
    { id: 4, name: "Whitefield", vehicleIntensity: 0.94, footfallIntensity: 0.78, lat: 12.9698, lng: 77.7499 },
    { id: 5, name: "Electronic City", vehicleIntensity: 0.91, footfallIntensity: 0.75, lat: 12.8399, lng: 77.6770 },
    { id: 6, name: "Jayanagar", vehicleIntensity: 0.84, footfallIntensity: 0.88, lat: 12.9250, lng: 77.5938 },
    { id: 7, name: "HSR Layout", vehicleIntensity: 0.88, footfallIntensity: 0.85, lat: 12.9116, lng: 77.6476 },
    { id: 8, name: "BTM Layout", vehicleIntensity: 0.86, footfallIntensity: 0.83, lat: 12.9166, lng: 77.6101 },
    { id: 9, name: "Marathahalli", vehicleIntensity: 0.93, footfallIntensity: 0.79, lat: 12.9591, lng: 77.6980 },
    { id: 10, name: "Hebbal", vehicleIntensity: 0.90, footfallIntensity: 0.76, lat: 13.0355, lng: 77.5964 }
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
  
  const handleShowTrafficDetails = (area: any) => {
    toast({
      title: `${area.name} Traffic Information`,
      description: `Vehicle: ${Math.round(getTrafficIntensity(area.vehicleIntensity, area.id) * 100)}% congestion | Foot: ${Math.round(getTrafficIntensity(area.footfallIntensity, area.id) * 100)}% crowding`,
      duration: 3000
    });
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
        <Tabs defaultValue="map">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="map">Visual Map</TabsTrigger>
            <TabsTrigger value="list">Area List</TabsTrigger>
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
                    onClick={() => handleShowTrafficDetails(area)}
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
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default BangaloreTraffic;

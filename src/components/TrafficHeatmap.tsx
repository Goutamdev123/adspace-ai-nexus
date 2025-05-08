
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';

const TrafficHeatmap = () => {
  // Fake data for the heatmap to visually represent timeframes
  const generateHeatmap = (intensity: number) => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const hours = Array.from({ length: 12 }, (_, i) => i * 2);
    
    return days.map(day => {
      return hours.map(hour => {
        // Create random but realistic traffic patterns
        let value = Math.random() * intensity;
        
        // Make weekday daytimes busier
        if (['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].includes(day) && hour >= 8 && hour <= 18) {
          value *= 1.5;
        }
        
        // Make weekend evenings busier
        if (['Sat', 'Sun'].includes(day) && hour >= 16 && hour <= 22) {
          value *= 1.8;
        }
        
        // Make early morning hours less busy
        if (hour >= 0 && hour <= 6) {
          value *= 0.4;
        }
        
        return {
          day,
          hour: hour === 0 ? '12 AM' : hour === 12 ? '12 PM' : hour < 12 ? `${hour} AM` : `${hour - 12} PM`,
          value: Math.min(value, 1)
        };
      });
    }).flat();
  };

  const footfallData = generateHeatmap(0.9);
  const vehicleData = generateHeatmap(0.95);

  return (
    <Card className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-sm font-medium">Real-time Traffic Heatmaps</CardTitle>
          <p className="text-xs text-muted-foreground">AI-powered footfall and vehicle traffic analysis</p>
        </div>
        <Select defaultValue="bangalore">
          <SelectTrigger className="w-[160px] h-8 text-xs">
            <SelectValue placeholder="Select Region" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bangalore">Bangalore</SelectItem>
            <SelectItem value="mumbai">Mumbai</SelectItem>
            <SelectItem value="delhi">Delhi NCR</SelectItem>
            <SelectItem value="hyderabad">Hyderabad</SelectItem>
            <SelectItem value="pune">Pune</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="footfall">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="footfall">Footfall</TabsTrigger>
            <TabsTrigger value="vehicle">Vehicle Traffic</TabsTrigger>
          </TabsList>
          <TabsContent value="footfall" className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-background hover:bg-background">Current Week</Badge>
                <span className="text-xs text-muted-foreground">vs Previous Week</span>
              </div>
              <div className="text-sm font-medium text-adtech-blue">+12.3% Overall</div>
            </div>
            
            <div className="grid grid-cols-12 gap-1">
              <div className="col-span-1"></div>
              {['12a', '2a', '4a', '6a', '8a', '10a', '12p', '2p', '4p', '6p', '8p', '10p'].map((hour) => (
                <div key={hour} className="col-span-1 text-xs text-center text-muted-foreground">
                  {hour}
                </div>
              ))}
            </div>
            
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <div key={day} className="grid grid-cols-12 gap-1">
                <div className="col-span-1 text-xs font-medium flex items-center">
                  {day}
                </div>
                {footfallData
                  .filter(item => item.day === day)
                  .map((item, idx) => {
                    const intensity = item.value;
                    const bgColor = `rgba(51, 195, 240, ${intensity.toFixed(2)})`;
                    
                    return (
                      <div
                        key={idx}
                        className="col-span-1 h-8 rounded-sm cursor-pointer transition-all hover:transform hover:scale-110"
                        style={{ backgroundColor: bgColor }}
                        title={`${item.hour}: ${Math.round(intensity * 100)}% traffic`}
                      ></div>
                    );
                  })}
              </div>
            ))}
            
            <div className="h-2 w-full bg-gradient-to-r from-background via-adtech-blue to-adtech-cyan rounded-full mt-4"></div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Low Traffic</span>
              <span>Medium Traffic</span>
              <span>High Traffic</span>
            </div>
          </TabsContent>

          <TabsContent value="vehicle" className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-background hover:bg-background">Current Week</Badge>
                <span className="text-xs text-muted-foreground">vs Previous Week</span>
              </div>
              <div className="text-sm font-medium text-adtech-purple">+8.7% Overall</div>
            </div>
            
            <div className="grid grid-cols-12 gap-1">
              <div className="col-span-1"></div>
              {['12a', '2a', '4a', '6a', '8a', '10a', '12p', '2p', '4p', '6p', '8p', '10p'].map((hour) => (
                <div key={hour} className="col-span-1 text-xs text-center text-muted-foreground">
                  {hour}
                </div>
              ))}
            </div>
            
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <div key={day} className="grid grid-cols-12 gap-1">
                <div className="col-span-1 text-xs font-medium flex items-center">
                  {day}
                </div>
                {vehicleData
                  .filter(item => item.day === day)
                  .map((item, idx) => {
                    const intensity = item.value;
                    const bgColor = `rgba(139, 92, 246, ${intensity.toFixed(2)})`;
                    
                    return (
                      <div
                        key={idx}
                        className="col-span-1 h-8 rounded-sm cursor-pointer transition-all hover:transform hover:scale-110"
                        style={{ backgroundColor: bgColor }}
                        title={`${item.hour}: ${Math.round(intensity * 100)}% traffic`}
                      ></div>
                    );
                  })}
              </div>
            ))}
            
            <div className="h-2 w-full bg-gradient-to-r from-background via-adtech-purple to-adtech-purple rounded-full mt-4"></div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Low Traffic</span>
              <span>Medium Traffic</span>
              <span>High Traffic</span>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TrafficHeatmap;

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';

// Pre-generated heatmap data (simplified & static)
const staticHeatmap = (color: string) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hours = ['12a', '2a', '4a', '6a', '8a', '10a', '12p', '2p', '4p', '6p', '8p', '10p'];

  return days.map(day => ({
    day,
    values: hours.map((hour, i) => {
      const opacity = Math.random() * 0.9 + 0.1;
      return {
        hour,
        color: `rgba(${color}, ${opacity.toFixed(2)})`,
        label: `${hour}: ${(opacity * 100).toFixed(0)}% traffic`
      };
    })
  }));
};

const footfallStatic = staticHeatmap('51, 195, 240'); // Blue
const vehicleStatic = staticHeatmap('139, 92, 246');  // Purple

const TrafficHeatmap = () => {
  return (
    <Card>
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

          {[
            { key: 'footfall', data: footfallStatic, color: 'adtech-blue', gradient: 'from-background via-adtech-blue to-adtech-cyan', label: '+12.3% Overall' },
            { key: 'vehicle', data: vehicleStatic, color: 'adtech-purple', gradient: 'from-background via-adtech-purple to-adtech-purple', label: '+8.7% Overall' }
          ].map(({ key, data, color, gradient, label }) => (
            <TabsContent key={key} value={key} className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-background hover:bg-background">Current Week</Badge>
                  <span className="text-xs text-muted-foreground">vs Previous Week</span>
                </div>
                <div className={`text-sm font-medium text-${color}`}>{label}</div>
              </div>

              <div className="grid grid-cols-12 gap-1">
                <div className="col-span-1"></div>
                {data[0].values.map(({ hour }, i) => (
                  <div key={i} className="col-span-1 text-xs text-center text-muted-foreground">{hour}</div>
                ))}
              </div>

              {data.map(({ day, values }) => (
                <div key={day} className="grid grid-cols-12 gap-1">
                  <div className="col-span-1 text-xs font-medium flex items-center">{day}</div>
                  {values.map((val, i) => (
                    <div
                      key={i}
                      className="col-span-1 h-8 rounded-sm"
                      style={{ backgroundColor: val.color }}
                      title={val.label}
                    ></div>
                  ))}
                </div>
              ))}

              <div className={`h-2 w-full bg-gradient-to-r ${gradient} rounded-full mt-4`}></div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Low Traffic</span>
                <span>Medium Traffic</span>
                <span>High Traffic</span>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TrafficHeatmap;

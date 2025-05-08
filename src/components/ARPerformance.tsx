
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const ARPerformance = () => {
  const scanData = [
    { name: 'Completed AR Experience', value: 62, color: '#33C3F0' },
    { name: 'Partial Engagement', value: 28, color: '#8B5CF6' },
    { name: 'Brief Scan Only', value: 10, color: '#F97316' },
  ];

  const interactionData = [
    { name: 'Product Info View', value: 45, color: '#33C3F0' },
    { name: 'Interactive Feature', value: 32, color: '#8B5CF6' },
    { name: 'Social Share', value: 15, color: '#4ADE80' },
    { name: 'Purchase Click', value: 8, color: '#F97316' },
  ];

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
  
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const stats = [
    { label: 'Avg. Engagement', value: '1m 46s', change: '+12%', positive: true },
    { label: 'Daily Scans', value: '5,289', change: '+8%', positive: true },
    { label: 'Conversion Rate', value: '3.2%', change: '-0.5%', positive: false },
  ];

  return (
    <Card className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">AR Ad Performance Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="engagement" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="engagement">Engagement Breakdown</TabsTrigger>
            <TabsTrigger value="interactions">User Interactions</TabsTrigger>
          </TabsList>
          <TabsContent value="engagement" className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={scanData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {scanData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Percentage']}
                  contentStyle={{ background: 'hsl(var(--background))', borderColor: 'hsl(var(--border))' }}
                />
                <Legend 
                  layout="vertical" 
                  verticalAlign="middle" 
                  align="right"
                  wrapperStyle={{ fontSize: "12px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="interactions" className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={interactionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {interactionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Percentage']}
                  contentStyle={{ background: 'hsl(var(--background))', borderColor: 'hsl(var(--border))' }}
                />
                <Legend 
                  layout="vertical" 
                  verticalAlign="middle" 
                  align="right"
                  wrapperStyle={{ fontSize: "12px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
        <div className="grid grid-cols-3 gap-4 mt-4">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col">
              <span className="text-xs text-muted-foreground">{stat.label}</span>
              <span className="text-lg font-semibold">{stat.value}</span>
              <span className={`text-xs ${stat.positive ? 'text-adtech-green' : 'text-adtech-orange'}`}>
                {stat.change}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ARPerformance;

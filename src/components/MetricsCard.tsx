
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';
import { ArrowUp, ArrowDown, ChevronRight } from 'lucide-react';

interface MetricsCardProps {
  title: string;
  value: string;
  change: {
    value: number;
    trend: 'up' | 'down' | 'neutral';
  };
  unit?: string;
  className?: string;
  chartData?: Array<{ name: string; value: number }>;
  color?: string;
  icon?: React.ReactNode;
}

const MetricsCard: React.FC<MetricsCardProps> = ({
  title,
  value,
  change,
  unit,
  className,
  chartData,
  color = 'rgba(51, 195, 240, 1)',
  icon
}) => {
  const trendColor = change.trend === 'up' 
    ? 'text-adtech-green' 
    : change.trend === 'down' 
      ? 'text-adtech-orange' 
      : 'text-muted-foreground';

  const trendIcon = change.trend === 'up' 
    ? <ArrowUp className="h-3 w-3" /> 
    : change.trend === 'down' 
      ? <ArrowDown className="h-3 w-3" /> 
      : null;

  const defaultChartData = [
    { name: 'Jan', value: 20 },
    { name: 'Feb', value: 40 },
    { name: 'Mar', value: 30 },
    { name: 'Apr', value: 70 },
    { name: 'May', value: 50 },
    { name: 'Jun', value: 90 },
    { name: 'Jul', value: 100 },
  ];

  const data = chartData || defaultChartData;
  
  return (
    <Card className={cn("overflow-hidden transition-all duration-300 h-full animate-fade-in", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          {icon && <span className="text-adtech-blue">{icon}</span>}
          {title}
        </CardTitle>
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          <ChevronRight className="h-4 w-4" />
        </button>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold">{value}</span>
            {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
          </div>
          <div className="flex items-center mt-1">
            <div className={cn("flex items-center text-xs", trendColor)}>
              {trendIcon}
              <span className="ml-1">{Math.abs(change.value)}%</span>
            </div>
            <span className="text-xs text-muted-foreground ml-2">vs last month</span>
          </div>
        </div>
        
        <div className="h-[80px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 5,
                right: 0,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id={`colorGradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.4}/>
                  <stop offset="95%" stopColor={color} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" hide />
              <YAxis hide />
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-background p-2 border border-border rounded shadow-md text-xs">
                        <p>{`${payload[0].payload.name}: ${payload[0].value}`}</p>
                      </div>
                    );
                  }
                  return null;
                }} 
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke={color}
                fillOpacity={1}
                fill={`url(#colorGradient-${title})`}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricsCard;

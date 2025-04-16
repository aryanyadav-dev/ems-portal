import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { PieChart, Pie, Cell, Sector, ResponsiveContainer, Tooltip } from 'recharts';
import { Clock } from 'lucide-react';

// Department distribution data
const DEFAULT_DEPARTMENT_DATA = [
  { name: 'Engineering', value: 24, color: '#4f46e5' },
  { name: 'Marketing', value: 10, color: '#06b6d4' },
  { name: 'Finance', value: 8, color: '#10b981' },
  { name: 'HR', value: 5, color: '#f59e0b' },
  { name: 'Operations', value: 12, color: '#8b5cf6' }
];

interface DepartmentDistributionChartProps {
  data?: typeof DEFAULT_DEPARTMENT_DATA;
  className?: string;
}

const DepartmentDistributionChart: React.FC<DepartmentDistributionChartProps> = ({ 
  data = DEFAULT_DEPARTMENT_DATA,
  className = "" 
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Calculate total employees
  const totalEmployees = data.reduce((sum, dept) => sum + dept.value, 0);

  // Custom renderer for active pie sector
  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
    
    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 6}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
      </g>
    );
  };

  return (
    <Card className={`bg-white ${className}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold">Department Distribution</CardTitle>
          <div className="p-2 h-9 w-9 flex items-center justify-center bg-purple-100/40 rounded-full">
            <Clock className="h-5 w-5 text-purple-600" />
          </div>
        </div>
        <CardDescription>Employee count by department</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[300px] relative pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={data}
                cx="50%"
                cy="45%"
                innerRadius={70}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
                onMouseEnter={(_, index) => setActiveIndex(index)}
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff',
                  border: 'none', 
                  borderRadius: '8px', 
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value, name) => [`${value} employees`, name]}
              />
            </PieChart>
          </ResponsiveContainer>
          
          {/* Center text showing total */}
          <div className="absolute inset-0 flex items-center justify-center flex-col" style={{ top: '-10px' }}>
            <div className="text-4xl font-bold text-gray-900">{totalEmployees}</div>
            <div className="text-sm text-gray-500">Total</div>
          </div>
        </div>
        
        {/* Legend */}
        <div className="grid grid-cols-1 gap-2 mt-4">
          {data.map((dept, index) => (
            <div 
              key={index} 
              className="flex items-center text-sm" 
              onMouseEnter={() => setActiveIndex(index)}
            >
              <div 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: dept.color }}
              />
              <span className="text-gray-600 font-medium">{dept.name}</span>
              <span className="ml-1 text-gray-400">({dept.value})</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DepartmentDistributionChart; 
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  UserCheck, 
  BarChart3, 
  ArrowUpRight, 
  BellRing, 
  CheckCircle2,
  Clock8,
  CalendarCheck,
  Coffee
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import DepartmentDistributionChart from '../components/DepartmentDistributionChart';

// Mock data for weekly activity
const weeklyActivityData = [
  { day: 'Mon', hours: 8 },
  { day: 'Tue', hours: 7.5 },
  { day: 'Wed', hours: 8 },
  { day: 'Thu', hours: 8 },
  { day: 'Fri', hours: 7 },
  { day: 'Sat', hours: 0 },
  { day: 'Sun', hours: 0 },
];

// Mock data for upcoming tasks
const upcomingTasks = [
  { id: 1, title: 'Team meeting', time: '10:00 AM', completed: false },
  { id: 2, title: 'Project deadline', time: '4:00 PM', completed: false },
  { id: 3, title: 'Weekly report submission', time: '2:30 PM', completed: true },
];

// Department distribution data for employee view
const departmentData = [
  { name: 'Engineering', value: 24, color: '#4f46e5' },
  { name: 'Marketing', value: 10, color: '#06b6d4' },
  { name: 'Finance', value: 8, color: '#10b981' },
  { name: 'HR', value: 5, color: '#f59e0b' },
  { name: 'Operations', value: 12, color: '#8b5cf6' }
];

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  
  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Calculate total weekly hours
  const totalWeeklyHours = weeklyActivityData.reduce((sum, day) => sum + day.hours, 0);
  
  // Calculate attendance rate
  const attendanceRate = 98;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-6 max-w-7xl mx-auto space-y-8"
    >
      {/* Welcome section with time */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back!</h1>
          <p className="text-gray-500 mt-1">Here's what's happening today</p>
        </div>
        <div className="mt-4 md:mt-0 bg-indigo-50 px-4 py-2 rounded-lg flex items-center space-x-2">
          <Clock className="h-5 w-5 text-indigo-600" />
          <span className="text-indigo-600 font-medium">{currentTime}</span>
        </div>
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white rounded-xl shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Hours Today</CardTitle>
            <div className="p-2 bg-blue-100 rounded-md">
              <Clock className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7.5</div>
            <Progress className="h-2 mt-2" value={75} />
            <p className="text-xs text-muted-foreground mt-2">
              75% of your daily goal
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-xl shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Days This Month</CardTitle>
            <div className="p-2 bg-green-100 rounded-md">
              <Calendar className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15/22</div>
            <Progress className="h-2 mt-2" value={68} />
            <p className="text-xs text-muted-foreground mt-2">
              68% of required work days
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-xl shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Attendance Rate</CardTitle>
            <div className="p-2 bg-purple-100 rounded-md">
              <UserCheck className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendanceRate}%</div>
            <Progress className="h-2 mt-2" value={attendanceRate} />
            <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
              <ArrowUpRight className="h-3 w-3 text-green-500" />
              <span className="text-green-500">+2%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Activities and Department Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Weekly activity */}
        <Card className="bg-white rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle>Weekly Activity</CardTitle>
            <CardDescription>
              You worked {totalWeeklyHours} hours this week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyActivityData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`${value} hours`, 'Duration']}
                    contentStyle={{ borderRadius: '8px' }}
                  />
                  <Bar dataKey="hours" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Department Distribution Chart */}
        <DepartmentDistributionChart data={departmentData} className="rounded-xl shadow-sm" />
      </div>
      
      {/* Upcoming tasks and recent activity row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upcoming tasks */}
        <Card className="bg-white rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle>Upcoming</CardTitle>
            <CardDescription>
              Your scheduled tasks for today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="flex items-start gap-2">
                  <div className={`mt-0.5 p-1.5 rounded-full ${task.completed ? 'bg-green-100' : 'bg-blue-100'}`}>
                    {task.completed ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : (
                      <Clock8 className="h-4 w-4 text-blue-600" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <p className={`text-sm font-medium ${task.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                      {task.title}
                    </p>
                    <p className="text-xs text-gray-500">{task.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      
        {/* Recent activity */}
        <Card className="bg-white rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your activity for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-3.5 top-0 bottom-0 w-px bg-gray-200"></div>
              
              <div className="space-y-6">
                <div className="relative flex gap-3">
                  <div className="p-1.5 rounded-full bg-blue-100 z-10">
                    <CalendarCheck className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1 pt-0.5">
                    <p className="text-sm font-medium text-gray-900">Checked in</p>
                    <p className="text-xs text-gray-500">9:00 AM</p>
                  </div>
                </div>
                
                <div className="relative flex gap-3">
                  <div className="p-1.5 rounded-full bg-amber-100 z-10">
                    <Coffee className="h-4 w-4 text-amber-600" />
                  </div>
                  <div className="flex-1 pt-0.5">
                    <p className="text-sm font-medium text-gray-900">Lunch break</p>
                    <p className="text-xs text-gray-500">1:00 PM</p>
                  </div>
                </div>
                
                <div className="relative flex gap-3">
                  <div className="p-1.5 rounded-full bg-purple-100 z-10">
                    <BellRing className="h-4 w-4 text-purple-600" />
                  </div>
                  <div className="flex-1 pt-0.5">
                    <p className="text-sm font-medium text-gray-900">Team meeting</p>
                    <p className="text-xs text-gray-500">2:00 PM</p>
                  </div>
                </div>
                
                <div className="relative flex gap-3">
                  <div className="p-1.5 rounded-full bg-green-100 z-10">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1 pt-0.5">
                    <p className="text-sm font-medium text-gray-900">Checked out</p>
                    <p className="text-xs text-gray-500">5:30 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default Dashboard;
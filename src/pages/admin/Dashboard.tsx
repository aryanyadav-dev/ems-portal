import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Calendar, 
  Clock, 
  Check, 
  ArrowUp, 
  ArrowDown, 
  Bell,
  BarChart,
  TrendingUp,
  Briefcase,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Building,
  User
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Progress } from '../../components/ui/progress';
import {
  BarChart as BarGraph,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import DepartmentDistributionChart from '../../components/DepartmentDistributionChart';

const Dashboard = () => {
  // Monthly attendance statistics
  const attendanceData = [
    { month: 'Jan', present: 20, absent: 2, leave: 1 },
    { month: 'Feb', present: 18, absent: 3, leave: 2 },
    { month: 'Mar', present: 22, absent: 1, leave: 0 },
    { month: 'Apr', present: 19, absent: 2, leave: 3 },
    { month: 'May', present: 21, absent: 1, leave: 1 },
    { month: 'Jun', present: 20, absent: 2, leave: 2 }
  ];

  // Department distribution data
  const departmentData = [
    { name: 'Engineering', value: 24, color: '#4f46e5' },
    { name: 'Marketing', value: 10, color: '#06b6d4' },
    { name: 'Finance', value: 8, color: '#10b981' },
    { name: 'HR', value: 5, color: '#f59e0b' },
    { name: 'Operations', value: 12, color: '#8b5cf6' }
  ];

  // Recent activities
  const recentActivities = [
    { id: 1, user: 'Aryan Yadav', action: 'joined the company', time: '2 hours ago', type: 'new' },
    { id: 2, user: 'Chinmay Sawant', action: 'requested leave', time: '3 hours ago', type: 'leave' },
    { id: 3, user: 'Jash Damania', action: 'updated profile', time: '5 hours ago', type: 'update' },
    { id: 4, user: 'Bhargav Gajare', action: 'completed training', time: '1 day ago', type: 'complete' },
    { id: 5, user: 'Om Awadhoot', action: 'missed deadline', time: '1 day ago', type: 'missed' }
  ];

  // Stats data
  const statsData = [
    { 
      title: 'Total Employees', 
      value: 59, 
      change: 3, 
      changeType: 'increase', 
      description: 'Compared to last month',
      icon: Users,
      color: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    { 
      title: 'Attendance Rate', 
      value: '94%', 
      change: 2, 
      changeType: 'increase', 
      description: 'Over the last 30 days',
      icon: Check,
      color: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    { 
      title: 'Open Positions', 
      value: 5, 
      change: 1, 
      changeType: 'decrease', 
      description: 'Positions to be filled',
      icon: Briefcase,
      color: 'bg-purple-100',
      iconColor: 'text-purple-600'
    },
    { 
      title: 'Total Departments', 
      value: 8, 
      change: 1, 
      changeType: 'increase', 
      description: 'Added 1 new department',
      icon: Building,
      color: 'bg-amber-100',
      iconColor: 'text-amber-600'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-6 max-w-7xl mx-auto space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's an overview of your organization.</p>
        </div>
        <div className="mt-4 md:mt-0">
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">
            <BarChart className="h-4 w-4 mr-2" />
            <span>Generate Report</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <Card key={index} className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">{stat.title}</CardTitle>
              <div className={`p-2 ${stat.color} rounded-md`}>
                <stat.icon className={`h-4 w-4 ${stat.iconColor}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center space-x-2 mt-2">
                {stat.changeType === 'increase' ? (
                  <ArrowUp className="h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDown className="h-4 w-4 text-red-500" />
                )}
                <p className={`text-xs ${stat.changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change}% {stat.changeType}
                </p>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Monthly Attendance</CardTitle>
              <div className="p-1.5 bg-blue-50 rounded-md">
                <BarChart className="h-4 w-4 text-blue-600" />
              </div>
            </div>
            <CardDescription>Overview of employee attendance data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarGraph
                  data={attendanceData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff',
                      border: 'none', 
                      borderRadius: '8px', 
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                  <Legend />
                  <Bar dataKey="present" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="absent" fill="#ef4444" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="leave" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </BarGraph>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Department Distribution Chart */}
        <DepartmentDistributionChart data={departmentData} />
      </div>

      {/* Recent Activities */}
      <Card className="bg-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Activities</CardTitle>
            <div className="p-1.5 bg-amber-50 rounded-md">
              <Bell className="h-4 w-4 text-amber-600" />
            </div>
          </div>
          <CardDescription>Latest employee activities across the organization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-5">
            {recentActivities.map((activity) => {
              let Icon;
              let bgColor;
              let iconColor;
              
              switch (activity.type) {
                case 'new':
                  Icon = User;
                  bgColor = 'bg-blue-100';
                  iconColor = 'text-blue-600';
                  break;
                case 'leave':
                  Icon = Calendar;
                  bgColor = 'bg-amber-100';
                  iconColor = 'text-amber-600';
                  break;
                case 'update':
                  Icon = TrendingUp;
                  bgColor = 'bg-purple-100';
                  iconColor = 'text-purple-600';
                  break;
                case 'complete':
                  Icon = CheckCircle2;
                  bgColor = 'bg-green-100';
                  iconColor = 'text-green-600';
                  break;
                case 'missed':
                  Icon = AlertCircle;
                  bgColor = 'bg-red-100';
                  iconColor = 'text-red-600';
                  break;
                default:
                  Icon = Bell;
                  bgColor = 'bg-gray-100';
                  iconColor = 'text-gray-600';
              }
              
              return (
                <div key={activity.id} className="flex items-start">
                  <div className={`p-2 ${bgColor} rounded-full mr-4`}>
                    <Icon className={`h-4 w-4 ${iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium text-gray-900">
                        <span className="font-semibold">{activity.user}</span> {activity.action}
                      </p>
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <button className="w-full mt-6 text-center text-sm text-indigo-600 hover:text-indigo-800 font-medium">
            View all activities
          </button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Dashboard;
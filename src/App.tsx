import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Attendance from './pages/Attendance';
import Salary from './pages/Salary';
import Profile from './pages/Profile';
import AdminDashboard from './pages/admin/Dashboard';
import AdminEmployees from './pages/admin/Employees';
import AdminSettings from './pages/admin/Settings';
import { AuthProvider, useAuth } from './context/AuthContext';

// Component that redirects based on user role
const RoleBasedRedirect = () => {
  const { user } = useAuth();
  
  if (user?.role === 'admin') {
    return <Navigate to="/admin/dashboard" replace />;
  }
  
  return <Navigate to="/dashboard" replace />;
};

// Login route with clear indication if it's coming from logout
const LoginRoute = () => {
  const location = useLocation();
  const isFromLogout = location.state && location.state.fromLogout;
  
  useEffect(() => {
    // Clear any state if needed
    if (isFromLogout) {
      // Extra cleanup could be done here if needed
      console.log('User logged out and returned to login');
    }
  }, [isFromLogout]);
  
  return <Login key={location.key} />;
};

// Wrapper component for the entire app with routes
const AppRoutes = () => {
  const location = useLocation();
  const { user } = useAuth();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Root path now redirects to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginRoute />} />
        
        {/* Protected routes inside Layout */}
        <Route element={<Layout />}>
          {/* Employee Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/salary" element={<Salary />} />
          <Route path="/profile" element={<Profile />} />
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/employees" element={<AdminEmployees />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
        </Route>
        
        {/* Catch-all route - redirect to login or dashboard based on auth state */}
        <Route path="*" element={user ? <RoleBasedRedirect /> : <Navigate to="/login" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
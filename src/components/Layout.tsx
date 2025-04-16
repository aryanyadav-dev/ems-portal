import React, { useEffect } from 'react';
import { Outlet, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import Header from './Header';
import { useAuth } from '../context/AuthContext';

const Layout = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Redirect if not authenticated
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if the user is accessing the correct routes based on their role
  useEffect(() => {
    // If admin is accessing regular employee routes (except for shared routes like profile)
    if (user.role === 'admin' && !location.pathname.includes('/admin') && 
        !location.pathname.includes('/profile')) {
      navigate('/admin/dashboard', { replace: true });
    }
    
    // If regular employee is accessing admin routes
    if (user.role === 'employee' && location.pathname.includes('/admin')) {
      navigate('/dashboard', { replace: true });
    }
  }, [location.pathname, user.role, navigate]);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="container mx-auto px-6 py-8"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
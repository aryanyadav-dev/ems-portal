import React, { useState, useRef, useEffect } from 'react';
import { Bell, User, ChevronDown, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Determine if we're in admin section
  const isAdmin = location.pathname.includes('/admin');
  
  // Get current page title
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('/dashboard')) return 'Dashboard';
    if (path.includes('/attendance')) return 'Attendance';
    if (path.includes('/salary')) return 'Salary';
    if (path.includes('/profile')) return 'Profile';
    if (path.includes('/employees')) return 'Employees';
    if (path.includes('/settings')) return 'Settings';
    return 'Dashboard';
  };

  const handleLogout = async () => {
    await logout();
    // Force a complete page reload to the login page
    window.location.replace('/login');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex items-center">
              <div className="flex items-center border-r pr-4 mr-4 h-8">
                <span className={`text-sm font-medium px-3 py-1 rounded-md ${isAdmin ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                  {isAdmin ? 'Admin Portal' : 'Employee Portal'}
                </span>
              </div>
              <h1 className="text-xl font-semibold text-gray-900">
                {getPageTitle()}
              </h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-600 hover:text-gray-900">
              <Bell className="h-6 w-6" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
            </button>
            <div className="relative" ref={dropdownRef}>
              <div 
                className="flex items-center space-x-3 border pl-3 pr-2 py-1.5 rounded-full border-gray-200 cursor-pointer hover:bg-gray-50"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className="text-sm font-medium text-gray-700">{user?.name}</span>
                <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-medium">
                  {user?.name?.split(' ').map(n => n[0]).join('')}
                </div>
                <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${dropdownOpen ? 'transform rotate-180' : ''}`} />
              </div>
              
              {/* Dropdown menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 py-1 border border-gray-200">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  <div className="py-1">
                    <button 
                      className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" 
                      onClick={() => navigate(isAdmin ? '/admin/settings' : '/profile')}
                    >
                      <Settings className="mr-3 h-4 w-4 text-gray-500" />
                      {isAdmin ? 'Settings' : 'Profile'}
                    </button>
                    <button 
                      className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50" 
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-3 h-4 w-4 text-red-500" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
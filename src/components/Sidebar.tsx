import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Clock, 
  DollarSign, 
  UserCircle,
  Users,
  Settings,
  LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const navItems = user?.role === 'admin' 
    ? [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
        { icon: Users, label: 'Employees', path: '/admin/employees' },
        { icon: Settings, label: 'Settings', path: '/admin/settings' },
      ]
    : [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
        { icon: Clock, label: 'Attendance', path: '/attendance' },
        { icon: DollarSign, label: 'Salary', path: '/salary' },
        { icon: UserCircle, label: 'Profile', path: '/profile' },
      ];

  const handleLogout = async () => {
    await logout();
    // Force a full page reload to the login page
    window.location.replace('/login');
  };

  return (
    <div className="hidden lg:flex lg:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col flex-grow pt-6 pb-5 overflow-y-auto bg-white border-r shadow-sm">
          <div className="flex items-center flex-shrink-0 px-5 mb-2">
            <Clock className="h-8 w-8 text-indigo-600" />
            <span className="ml-3 text-xl font-semibold text-gray-900">
              EMS Portal
            </span>
          </div>
          <nav className="mt-8 flex-1 space-y-1.5 px-3">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `group flex items-center px-3 py-2.5 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-indigo-100 text-indigo-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                <item.icon className="mr-3.5 h-5 w-5 flex-shrink-0" />
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-auto px-3">
            <button
              onClick={handleLogout}
              className="group flex w-full items-center px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md"
            >
              <LogOut className="mr-3.5 h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
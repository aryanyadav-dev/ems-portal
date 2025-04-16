import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Simulated authentication
  const login = async (email: string, password: string): Promise<User> => {
    // This would be replaced with actual authentication logic
    const mockUser: User = {
      id: '1',
      name: 'John Doe',
      email: email,
      role: email.includes('admin') ? 'admin' : 'employee',
      department: 'Engineering',
      position: 'Software Developer',
      salary: 75000
    };
    
    // Save user to localStorage for session persistence
    localStorage.setItem('emsUser', JSON.stringify(mockUser));
    setUser(mockUser);
    return mockUser; // Return the user object to the caller
  };

  const logout = async () => {
    // Immediately clear user state first to trigger UI updates
    setUser(null);
    
    // Clear localStorage
    localStorage.removeItem('emsUser');
    sessionStorage.clear(); // Clear any session storage data as well
    
    // Additional cleanup can be done here if needed
    // For example, clearing any tokens, cookies, etc.
    
    // Return a promise that resolves after a small delay to ensure state updates have propagated
    return new Promise<void>((resolve) => {
      setTimeout(resolve, 10);
    });
  };

  useEffect(() => {
    // Check for existing session in localStorage
    const storedUser = localStorage.getItem('emsUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user data:', error);
        localStorage.removeItem('emsUser');
      }
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
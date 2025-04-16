import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, ArrowRight, Slack, Clock } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, login } = useAuth();

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (user) {
      const dashboardPath = user.role === 'admin' ? '/admin/dashboard' : '/dashboard';
      navigate(dashboardPath, { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const user = await login(email, password);
      // Redirect based on user role
      const dashboardPath = user?.role === 'admin' ? '/admin/dashboard' : '/dashboard';
      const from = location.state?.from?.pathname || dashboardPath;
      navigate(from, { replace: true });
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Force update key to ensure re-rendering after navigation
  const renderKey = location.key || 'login';

  // Don't render anything if we're already authenticated and about to redirect
  if (user) {
    return null;
  }

  return (
    <motion.div
      key={renderKey}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 relative bg-gradient-to-br from-indigo-900 via-blue-800 to-indigo-700 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-500 opacity-20 blur-3xl"></div>
        <div className="absolute top-1/2 -left-24 w-80 h-80 rounded-full bg-indigo-400 opacity-20 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-purple-400 opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-16 left-1/3 w-72 h-72 rounded-full bg-indigo-300 opacity-20 blur-3xl"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }}></div>
      </div>
      
      <div className="w-full max-w-lg mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-8 flex flex-col items-center"
        >
          {/* Header */}
          <div className="text-center">
            <h1 className="text-5xl font-bold tracking-tight text-white">
              Welcome back
            </h1>
            <p className="mt-3 text-base text-indigo-200">
              Sign in to your account to continue
            </p>
          </div>
          
          {/* Form */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl w-full sm:rounded-xl overflow-hidden">
            <div className="px-8 py-10">
              <form className="space-y-7" onSubmit={handleSubmit}>
                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white">
                    Email address
                  </label>
                  <div className="mt-1.5 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-indigo-200" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pl-11 pr-3 py-2.5 bg-white/20 border border-white/20 rounded-md shadow-sm placeholder-indigo-200 text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent text-base"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-white">
                    Password
                  </label>
                  <div className="mt-1.5 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-indigo-200" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full pl-11 pr-3 py-2.5 bg-white/20 border border-white/20 rounded-md shadow-sm placeholder-indigo-200 text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent text-base"
                      placeholder="••••••••••"
                    />
                  </div>
                </div>

                {/* Error message */}
                {error && (
                  <div className="px-4 py-3 text-sm text-red-200 bg-red-900/30 rounded-md border border-red-500/30">
                    {error}
                  </div>
                )}

                {/* Forgot password link */}
                <div className="flex items-center justify-end">
                  <div className="text-sm">
                    <a href="#" className="font-medium text-indigo-200 hover:text-white">
                      Forgot your password?
                    </a>
                  </div>
                </div>

                {/* Submit button */}
                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`flex w-full items-center justify-center space-x-2 rounded-md px-4 py-3 text-base font-semibold text-white shadow-sm ${
                      isLoading ? 'bg-white/20' : 'bg-white/20 hover:bg-white/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50'
                    }`}
                  >
                    <span>{isLoading ? 'Signing in...' : 'Sign in'}</span>
                    {!isLoading && <ArrowRight className="h-5 w-5" />}
                  </button>
                </div>
              </form>
            </div>

            {/* Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center px-8">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-indigo-800/30 backdrop-blur-sm px-4 text-sm text-indigo-200">Or continue with</span>
              </div>
            </div>

            {/* Social logins */}
            <div className="grid grid-cols-2 gap-4 px-8 pb-8">
              <button
                type="button"
                className="flex w-full items-center justify-center gap-3 rounded-md bg-white/10 backdrop-blur-sm border border-white/10 px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
              >
                <Slack className="h-5 w-5 text-white" />
                <span>Slack</span>
              </button>
              <button
                type="button"
                className="flex w-full items-center justify-center gap-3 rounded-md bg-white/10 backdrop-blur-sm border border-white/10 px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="h-5 w-5">
                  <path fill="#ffffff" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#ffffff" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#ffffff" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#ffffff" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  <path fill="none" d="M1 1h22v22H1z" />
                </svg>
                <span>Google</span>
              </button>
            </div>
          </div>

          {/* Sign up prompt */}
          <p className="mt-4 text-center text-sm text-indigo-200">
            Don't have an account?{' '}
            <a href="#" className="font-medium text-white hover:text-indigo-100">
              Create an account
            </a>
          </p>
          
          {/* Company logo/brand at bottom */}
          <div className="flex justify-center mt-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2">
                <div className="h-8 w-8 bg-white/10 rounded-md flex items-center justify-center">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-semibold text-white">EMS Portal</span>
              </div>
              <p className="text-xs text-indigo-200 mt-2"></p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Login;
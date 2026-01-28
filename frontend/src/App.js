import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './components/ui/Toast';
import { authAPI, getToken, getStoredUser, setStoredUser, clearAuth } from './utils/api';

// Pages
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import ProjectsPage from './pages/ProjectsPage';
import WorkersPage from './pages/WorkersPage';
import DailyLogPage from './pages/DailyLogPage';
import ReportsPage from './pages/ReportsPage';

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for stored auth on mount and validate token
  useEffect(() => {
    const validateSession = async () => {
      const token = getToken();
      const storedUser = getStoredUser();

      if (token && storedUser) {
        try {
          // Validate token by fetching current user
          const userData = await authAPI.getMe();
          // Normalize user data - API returns 'name' but we might need 'full_name'
          const normalizedUser = {
            ...userData,
            full_name: userData.full_name || userData.name,
          };
          setUser(normalizedUser);
          setStoredUser(normalizedUser);
        } catch (error) {
          // Token invalid or expired
          console.error('Session validation failed:', error);
          clearAuth();
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    validateSession();
  }, []);

  const handleLogin = useCallback((userData) => {
    setUser(userData);
    setStoredUser(userData);
  }, []);

  const handleLogout = useCallback(() => {
    authAPI.logout();
    setUser(null);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#050a12] via-[#0A1929] to-[#050a12] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border border-white/20 border-t-white/60 rounded-full animate-spin" />
          <p className="text-white/40 text-sm tracking-wider">LOADING</p>
        </div>
      </div>
    );
  }

  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route 
            path="/login" 
            element={
              user ? <Navigate to="/" replace /> : <LoginPage onLogin={handleLogin} />
            } 
          />

          {/* Protected routes */}
          <Route 
            path="/" 
            element={
              user ? <Dashboard user={user} onLogout={handleLogout} /> : <Navigate to="/login" replace />
            } 
          />
          <Route 
            path="/projects" 
            element={
              user ? <ProjectsPage user={user} onLogout={handleLogout} /> : <Navigate to="/login" replace />
            } 
          />
          <Route 
            path="/workers" 
            element={
              user ? <WorkersPage user={user} onLogout={handleLogout} /> : <Navigate to="/login" replace />
            } 
          />
          <Route 
            path="/daily-log" 
            element={
              user ? <DailyLogPage user={user} onLogout={handleLogout} /> : <Navigate to="/login" replace />
            } 
          />
          <Route 
            path="/reports" 
            element={
              user ? <ReportsPage user={user} onLogout={handleLogout} /> : <Navigate to="/login" replace />
            } 
          />

          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;

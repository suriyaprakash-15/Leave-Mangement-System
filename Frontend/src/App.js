import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import Login from './Components/Login/Login';
import Dashboard from './Components/Dashboard/Dashboard';

function AppRoutes() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const checkAuthStatus = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5000/api/user', {
        credentials: 'include'
      });
      
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setIsAuthenticated(true);
        // Only redirect if not already on dashboard
        if (location.pathname !== '/dashboard') {
          navigate('/dashboard');
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
        // If on dashboard and not authenticated, redirect to login
        if (location.pathname === '/dashboard') {
          navigate('/');
        }
      }
    } catch (error) {
      console.log('Authentication check failed:', error);
      setIsAuthenticated(false);
      setUser(null);
      if (location.pathname === '/dashboard') {
        navigate('/');
      }
    }
  }, [location.pathname, navigate]);

  useEffect(() => {
    // Check for error and success params
    const urlParams = new URLSearchParams(window.location.search);
    const errorParam = urlParams.get('error');
    const successParam = urlParams.get('success');

    if (errorParam) {
      if (errorParam === 'unauthorized_domain') {
        setError('Access denied: Only @manureva.com and @manurevasolutions.net email addresses are allowed to access this system.');
      } else if (errorParam === 'google_oauth_error') {
        setError('Google OAuth error occurred. Please try again.');
      } else if (errorParam === 'no_code') {
        setError('Authentication failed. Please try again.');
      } else {
        setError('An error occurred during authentication. Please try again.');
      }
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    if (successParam) {
      window.history.replaceState({}, document.title, window.location.pathname);
      // Check authentication status from backend
      checkAuthStatus();
    } else {
      // Check authentication status on normal load
      checkAuthStatus();
    }
  }, [navigate, checkAuthStatus]);

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:5000/api/logout', {
        credentials: 'include'
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
    
    setIsAuthenticated(false);
    setUser(null);
    setError(null);
    navigate('/');
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Login error={error} onClearError={() => setError(null)} />
        }
      />
      <Route
        path="/dashboard"
        element={
          isAuthenticated ? (
            <Dashboard user={user} onLogout={handleLogout} />
          ) : (
            <div style={{
              height: '100vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontFamily: 'Arial, sans-serif'
            }}>
              <div style={{ textAlign: 'center' }}>
                <h2>Unauthorized Access</h2>
                <p>Please login to access the dashboard.</p>
                <button 
                  onClick={() => navigate('/')}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  Go to Login
                </button>
              </div>
    </div>
          )
        }
      />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

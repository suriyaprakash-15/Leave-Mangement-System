import { useState, useCallback } from 'react';
import { fetchUser, logoutUser } from './api';
import { useNavigate, useLocation } from 'react-router-dom';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const checkAuthStatus = useCallback(async () => {
    try {
      const response = await fetchUser();
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setIsAuthenticated(true);
        if (location.pathname !== '/dashboard') {
          navigate('/dashboard');
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
        if (location.pathname === '/dashboard') {
          navigate('/');
        }
      }
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
      if (location.pathname === '/dashboard') {
        navigate('/');
      }
    }
  }, [location.pathname, navigate]);

  const handleLogout = useCallback(async () => {
    try {
      await logoutUser();
    } catch (error) {
      // Optionally handle error
    }
    setIsAuthenticated(false);
    setUser(null);
    setError(null);
    navigate('/');
  }, [navigate]);

  return {
    isAuthenticated,
    error,
    setError,
    user,
    setUser,
    checkAuthStatus,
    handleLogout,
  };
} 
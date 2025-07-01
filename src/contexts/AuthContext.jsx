import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Initialize state from localStorage if a token exists
  const [token, setToken] = useState(localStorage.getItem('accessToken'));
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken'));
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      return null;
    }
  });

  // Update localStorage whenever token, refreshToken, or user changes
  useEffect(() => {
    if (token) {
      localStorage.setItem('accessToken', token);
    } else {
      localStorage.removeItem('accessToken');
    }
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    } else {
      localStorage.removeItem('refreshToken');
    }
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [token, refreshToken, user]);

  const login = useCallback((accessToken, newRefreshToken, userData) => {
    setToken(accessToken);
    setRefreshToken(newRefreshToken);
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setRefreshToken(null);
    setUser(null);
    localStorage.clear(); // Clear all auth-related items
  }, []);

  // Helper to check if user has a specific role
  const hasRole = useCallback((roleName) => {
    return user?.roles?.includes(roleName);
  }, [user]);

  const authContextValue = {
    token,
    refreshToken,
    user,
    isAuthenticated: !!token, // Convenience boolean
    login,
    logout,
    hasRole,
    // Potentially add a function to update only the access token if refresh token flow is silent
    setAccessToken: setToken,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to easily use auth context in any component
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
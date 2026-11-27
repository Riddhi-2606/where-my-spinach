import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulate checking for a logged-in user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('vegvoyage_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Simulated login logic
    const mockUser = {
      id: '1',
      name: email.split('@')[0],
      email,
      plan: 'free_trial',
      trialEndsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    };
    setUser(mockUser);
    localStorage.setItem('vegvoyage_user', JSON.stringify(mockUser));
    return true;
  };

  const signup = (name, email, password) => {
    // Simulated signup logic
    const mockUser = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      plan: 'free_trial',
      trialEndsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    };
    setUser(mockUser);
    localStorage.setItem('vegvoyage_user', JSON.stringify(mockUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('vegvoyage_user');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

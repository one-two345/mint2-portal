// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    // For simplicity, consider any non-empty username/password as a successful login
    
      // Set the user object with username and a dynamically generated email
      setIsAuthenticated(true);
   
  };

 

  return (
    <AuthContext.Provider value={{ isAuthenticated, login,}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

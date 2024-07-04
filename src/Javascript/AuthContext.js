import React, { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || '');

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (email) {
      setUserEmail(email);
    }
    console.log('AuthProvider initialized with userEmail:', email);  // Añade este log
  }, []);

  const login = (email) => {
    setIsAuthenticated(true);
    setUserEmail(email);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userEmail', email);
    console.log('User logged in with email:', email);  // Añade este log
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserEmail('');
    localStorage.setItem('isAuthenticated', 'false');
    localStorage.removeItem('userEmail');
    console.log('User logged out');  // Añade este log
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

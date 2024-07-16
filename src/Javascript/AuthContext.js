// AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || '');
  const [userId, setUserId] = useState(localStorage.getItem('userId') || '');

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    const id = localStorage.getItem('userId');
    if (email) {
      setUserEmail(email);
    }
    if (id) {
      setUserId(id);
    }
    console.log('AuthProvider initialized with userEmail:', email, 'and userId:', id);
  }, []);

  const login = (email, id) => {
    setIsAuthenticated(true);
    setUserEmail(email);
    setUserId(id);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userId', id);
    console.log('User logged in with email:', email, 'and userId:', id);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserEmail('');
    setUserId('');
    localStorage.setItem('isAuthenticated', 'false');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');
    console.log('User logged out');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userEmail, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

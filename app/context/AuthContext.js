"use client"
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ApiService from '../service/AppService';

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const { data } = await axios.get('/api/auth/checkAuth', { withCredentials: true });
        setUser(data.user);
      } catch (error) {
        setUser(null);
      }
    };
    checkLoggedIn();
  }, []);

  const login = async (email, password) => {
    const credentials = { email, password }
    const { data } = ApiService.loginUser(credentials)
    setUser(data.user);
 
  };

  const logout = async () => {
    // ApiService.logoutUser()
    setUser(null);
    console.log(user);
    
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

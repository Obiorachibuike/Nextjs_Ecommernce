"use client"
import  { createContext, useState, useEffect, useContext } from 'react';


export const AuthContext = createContext();

export const useScroll = () => {
  return useContext(AuthContext);
}

export const ScrollProvider = ({ children }) => {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
      // Event listener to track the scroll position
      const handleScroll = () => {
        setScroll(window.scrollY);
      };
  
      // Adding the event listener when the component mounts
      window.addEventListener('scroll', handleScroll);
  
      // Cleaning up the event listener when the component unmounts
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
  }, []);

  

  return (
    <AuthContext.Provider value={{ scroll }}>
      {children}
    </AuthContext.Provider>
  );
};

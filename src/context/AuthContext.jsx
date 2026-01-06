import React, { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import { getCurrentUser } from "../services/authService";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    try {
      setLoading(true);
      const result = await getCurrentUser();
      setUser(result.data.data);
      setLoading(false);
      console.log(result);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, handleLogout, handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

// export const useAuth = useContext(AuthContext);

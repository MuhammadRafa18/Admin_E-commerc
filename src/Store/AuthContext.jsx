// AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [User, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
    const saveUser = localStorage.getItem("User")
    if(saveUser){
        setUser(JSON.parse(saveUser))
    }
    setLoading(false);
  }, []);

  const login = (newToken, newUser) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("User", JSON.stringify(newUser));
    setUser(newUser)
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("User");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, loading, User }}>
      {children}
    </AuthContext.Provider>
  );
};

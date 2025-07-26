// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const UserAuth = createContext();

export const useAuth = () => useContext(UserAuth);

export const AuthProvider = ({ children }) => {
  const [login, setLogin] = useState(false);
  const [token, setToken] = useState(null); // ✅ for JWT token
  const [user, setUser] = useState(null);   // ✅ optional: for user info

  // 🧠 Load token and user from localStorage on first render
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken) {
      setToken(savedToken);
      setLogin(true);
    }
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    setLogin(false);
  };

  return (
    <UserAuth.Provider
      value={{
        login,
        setLogin,
        token,
        setToken,
        user,
        setUser,
        logout,
      }}
    >
      {children}
    </UserAuth.Provider>
  );
};

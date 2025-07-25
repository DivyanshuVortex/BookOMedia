import React, { createContext, useContext, useState } from "react";

const UserAuth = createContext();

export const useAuth = () => useContext(UserAuth);

export const AuthProvider = ({ children }) => {
    const [ login , setLogin ] = useState(false);

  return (
    <UserAuth.Provider
      value={{
        login,
        setLogin
      }}
    >
      {children}
    </UserAuth.Provider>
  );
};

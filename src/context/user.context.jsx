import { createContext, useState } from "react";

export const UserContext = createContext({
  user: null,
  setUser: () => {},
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "Hamza Shah",
    role: "Admin",
  }); //provide null , adding dummy data

  const value = {
    user,
    setUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

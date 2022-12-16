import React from "react";
import { useState, useEffect } from "react";
import FirstLoader from "../components/startingLoader/firstLoader.component";
import { onAuthStateChangedListener } from "../utils/firebase/firebase.utils";

export const UserContext = React.createContext({
  preLoading: true,
  currentUser: null,
  setCurrentUser: () => null, // empty function
  setPreLoader: () => true, // empty function
});
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChangedListener((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
    return unsub;
  }, []);
  const value = {
    currentUser,
    setCurrentUser,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

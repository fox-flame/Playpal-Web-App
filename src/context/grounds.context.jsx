import { createContext, useState } from "react";

export const GroundContext = createContext({
  groundsRequest: [],
  verifiedGrounds: [],
  setVerified: () => {},
  setRequest: () => {},
});

export const GroundProvider = ({ children }) => {
  const [groundsRequest, setRequest] = useState([]);
  const [verifiedGrounds, setVerified] = useState([]);

  const value = {
    groundsRequest,
    verifiedGrounds,
    setVerified,
    setRequest,
  };

  return (
    <GroundContext.Provider value={value}>{children}</GroundContext.Provider>
  );
};

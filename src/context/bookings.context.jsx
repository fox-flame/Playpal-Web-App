import { createContext, useState } from "react";

export const BookingContext = createContext({
  bookingsRequest: [],
  setRequest: () => {},
});

export const BookingProvider = ({ children }) => {
  const [bookingsRequest, setRequest] = useState([]);

  const value = {
    bookingsRequest,
    setRequest,
  };

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
};

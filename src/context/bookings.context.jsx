import { createContext, useState } from "react";

export const BookingContext = createContext({
  myBookings: [],
  setMyBookings: () => {},
});

export const BookingProvider = ({ children }) => {
  const [myBookings, setMyBookings] = useState([]);

  const value = {
    myBookings,
    setMyBookings,
  };

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
};

// src/context/CampContext.js
import { createContext, useContext, useState } from "react";

const CampContext = createContext();

export const CampProvider = ({ children }) => {
  const [selectedCamp, setSelectedCamp] = useState(
    JSON.parse(localStorage.getItem("selectedCamp")) || null
  );

  const updateSelectedCamp = (camp) => {
    localStorage.setItem("selectedCamp", JSON.stringify(camp));
    setSelectedCamp(camp);
  };
  return (
    <CampContext.Provider value={{ selectedCamp, updateSelectedCamp }}>
      {children}
    </CampContext.Provider>
  );
};

export const useCampContext = () => useContext(CampContext);

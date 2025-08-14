"use client";

import React, { createContext, useContext, useState } from "react"

type YearContextType = {
  year: string;
  setYear: (value: string) => void;
};

const YearContext = createContext<YearContextType | undefined>(undefined);

export const YearProvider = ({children} : {children: React.ReactNode}) => {
  const CURRENT_YEAR = new Date().getFullYear().toString();
  const [year, setYear] = useState(CURRENT_YEAR);

    return (
    <YearContext.Provider value={{ year, setYear }}>
      {children}
    </YearContext.Provider>
  );
}

export const useYear = () => {
  const context = useContext(YearContext);
  if (!context) {
    throw new Error("useYear debe usarse dentro de un YearProvider");
  }
  return context;
}
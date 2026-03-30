import React, { createContext, useContext, useEffect, useState } from "react";
import { storage, STORAGE_KEYS } from "../lib/storage";

type ThemeContextType = {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  darkMode: false,
  setDarkMode: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkModeState] = useState(false);

  useEffect(() => {
    const load = async () => {
      const saved = await storage.get(STORAGE_KEYS.THEME);
      if (saved !== null) {
        setDarkModeState(saved === "true");
      }
    };
    load();
  }, []);

  const setDarkMode = async (value: boolean) => {
    await storage.set(STORAGE_KEYS.THEME, value.toString());
    setDarkModeState(value);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

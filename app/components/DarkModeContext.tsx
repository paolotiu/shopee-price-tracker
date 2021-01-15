import React, { useContext, useEffect, useState } from "react";

const ThemeContext = React.createContext({
  theme: "light",
  // set in HOC
  toggleTheme: () => {},
});

interface Props {}

export const DarkModeContext: React.FC<Props> = ({ children }) => {
  const [theme, setTheme] = useState(global.window?.__theme || "light");

  const toggleTheme = () => {
    global.window.__setPreferredTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    global.window.__onThemeChange = setTheme;
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
export const useTheme = () => useContext(ThemeContext);

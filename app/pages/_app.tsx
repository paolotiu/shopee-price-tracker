import React, { useContext, useEffect, useState } from "react";
import { AppProps } from "next/dist/next-server/lib/router/router";
import "../styles/core.css";
import "../styles/components.css";
import "../styles/utilities.css";

const DarkContext = React.createContext(false);
const ChangeIsDarkContext = React.createContext(() => {});
const App = ({ Component, pageProps }: AppProps) => {
  const [isDark, setIsDark] = useState(false);
  // Change dark mode when user changes preference
  const onPrefChange = (e: MediaQueryListEvent) => {
    const isPrefDark = e.matches;
    if (isPrefDark) {
      localStorage.setItem("dark", "true");
      document.querySelector("html")?.classList.add("dark");
      setIsDark(true);
    } else {
      localStorage.setItem("dark", "false");
      setIsDark(false);
      document.querySelector("html")?.classList.remove("dark");
    }
  };

  useEffect(() => {
    // Initial load
    if (
      localStorage.getItem("dark") === "true" ||
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      localStorage.setItem("dark", "true");
      setIsDark(true);
    }

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", onPrefChange);
    return () =>
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", onPrefChange);
  }, []);

  useEffect(() => {
    if (isDark) {
      localStorage.setItem("dark", "true");

      document.querySelector("html")?.classList.add("dark");
    } else {
      localStorage.setItem("dark", "false");
      document.querySelector("html")?.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <DarkContext.Provider value={isDark}>
      <ChangeIsDarkContext.Provider value={() => setIsDark(!isDark)}>
        <Component {...pageProps} />;
      </ChangeIsDarkContext.Provider>
    </DarkContext.Provider>
  );
};
export const useIsDark = () => useContext(DarkContext);
export const useChangeDark = () => useContext(ChangeIsDarkContext);
export default App;

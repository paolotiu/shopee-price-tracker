import React from "react";
import { AppProps } from "next/dist/next-server/lib/router/router";
import { DarkModeContext } from "../utils/DarkModeContext";
import "../styles/core.css";
import "../styles/components.css";
import "../styles/utilities.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <DarkModeContext>
      <Component {...pageProps} />
    </DarkModeContext>
  );
};

export default App;

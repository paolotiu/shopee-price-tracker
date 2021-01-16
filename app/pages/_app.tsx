import React from "react";
import { AppProps } from "next/dist/next-server/lib/router/router";
import { DarkModeContext } from "../utils/DarkModeContext";
import "../styles/core.css";
import "../styles/components.css";
import "../styles/utilities.css";
import "../styles/custom.css";
import { ModalContext } from "../utils/ModalContext";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <DarkModeContext>
      <ModalContext>
        <Component {...pageProps} />
      </ModalContext>
    </DarkModeContext>
  );
};

export default App;

import "../styles/core.css";
import "../styles/components.css";
import "../styles/utilities.css";
import "../styles/custom.css";
import React from "react";
import { AppProps } from "next/dist/next-server/lib/router/router";
import { DarkModeContext } from "../utils/DarkModeContext";
import { ModalContext } from "../utils/ModalContext";
import { Toaster } from "react-hot-toast";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <DarkModeContext>
      <ModalContext>
        <Toaster />
        <Component {...pageProps} />
      </ModalContext>
    </DarkModeContext>
  );
};

export default App;

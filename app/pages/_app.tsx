import "../styles/core.css";
import "../styles/components.css";
import "../styles/utilities.css";
import "../styles/custom.css";
import React from "react";
import { AppProps } from "next/dist/next-server/lib/router/router";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";

import store from "../store";

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <Component {...pageProps} />
      </QueryClientProvider>
    </Provider>
  );
};

export default App;

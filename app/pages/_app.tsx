import "styles/core.css";
import "styles/components.css";
import "styles/utilities.css";
import "styles/custom.css";
import "styles/nprogress.css";
import React from "react";
import { AppProps } from "next/dist/next-server/lib/router/router";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import dynamic from "next/dynamic";

// Redux store
import store from "../store";

// GLobal Styles
import GlobalStylesComponent from "../components/GlobalStyles";

// Progress bar
const TopProgressBar = dynamic(
  () => {
    return import("components/General/TopProgressBar");
  },
  { ssr: false }
);
const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <GlobalStylesComponent />
        <TopProgressBar />
        <Toaster />
        <Component {...pageProps} />
      </QueryClientProvider>
    </Provider>
  );
};

export default App;

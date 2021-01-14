import { AppProps } from "next/dist/next-server/lib/router/router";
import "../styles/core.css";
import "../styles/components.css";
import "../styles/utilities.css";

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default App;

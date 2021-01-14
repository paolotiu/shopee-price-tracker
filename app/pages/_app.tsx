import { AppProps } from "next/dist/next-server/lib/router/router";
import "tailwindcss/tailwind.css";
const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default App;

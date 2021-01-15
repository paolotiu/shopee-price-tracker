import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script src="/theme.js"></script>
        </Head>
        <body className="overflow-hidden bg-white text-black dark:bg-black dark:text-white transition duration-1000">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

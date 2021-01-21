import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Import font */}
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;700&display=swap"
            rel="stylesheet"
          />

          <script src="/theme.js"></script>
        </Head>
        <body className="text-black transition duration-1000 bg-white dark:bg-black dark:text-white">
          <div id="modal" className="" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

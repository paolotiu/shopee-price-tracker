import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script src="/theme.js"></script>
        </Head>
        <body className=" bg-white text-black dark:bg-black dark:text-white transition duration-1000">
          <div id="modal" className="" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

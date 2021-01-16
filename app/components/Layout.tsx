import React, { ReactNode } from "react";
import Head from "next/head";
import { Navbar } from "./General/Navbar";

type Props = {
  children?: ReactNode;
  title?: string;
  className?: string;
  showNavbar?: boolean;
};

const Layout = ({
  children,
  title = "This is the default title",
  showNavbar = true,
  ...props
}: Props) => (
  <div {...props}>
    <Head>
      <title> {title}</title>
    </Head>
    {showNavbar && <Navbar />}
    {children}
  </div>
);

export default Layout;

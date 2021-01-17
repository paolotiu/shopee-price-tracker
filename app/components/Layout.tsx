import React, { ReactNode } from "react";
import Head from "next/head";
import { Navbar } from "./General/Navbar";

type Props = {
  children?: ReactNode;
  title?: string;
  className?: string;
  showNavbar?: boolean;
  navbarIsTransparent?: boolean;
  showLogin?: boolean;
};

const Layout = ({
  children,
  title = "This is the default title",
  showNavbar = true,
  navbarIsTransparent,
  showLogin,
  ...props
}: Props) => (
  <div {...props}>
    <Head>
      <title> {title}</title>
    </Head>
    {showNavbar && (
      <Navbar isTransparent={navbarIsTransparent} showLogin={showLogin} />
    )}
    {children}
  </div>
);

export default Layout;

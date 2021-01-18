import React, { ReactNode } from "react";
import Head from "next/head";
import { Navbar, NavProps } from "./General/Navbar";

interface Props extends NavProps {
  children?: ReactNode;
  title?: string;
  className?: string;
  showNavbar?: boolean;
  navbarIsTransparent?: boolean;
}

const Layout = ({
  children,
  title = "This is the default title",
  showNavbar = true,
  navbarIsTransparent,
  showLogin,
  showLogo,
  ...props
}: Props) => (
  <div {...props}>
    <Head>
      <title> {title}</title>
    </Head>
    {showNavbar && (
      <Navbar
        isTransparent={navbarIsTransparent}
        showLogin={showLogin}
        showLogo={showLogo}
      />
    )}
    {children}
  </div>
);

export default Layout;

import React, { ReactNode } from "react";
import Head from "next/head";
import { Navbar, NavProps } from "./General/Navbar";

interface Props extends NavProps {
  children?: ReactNode;
  title?: string;
  className?: string;
  showNavbar?: boolean;
  navbarIsTransparent?: boolean;
  marginTop?: boolean;
}

const Layout = ({
  children,
  title = "This is the default title",
  showNavbar = true,
  navbarIsTransparent,
  showLogin,
  showLogo,
  marginTop = true,
  ...props
}: Props) => (
  <div {...props}>
    <Head>
      <title> {title}</title>
    </Head>
    <div className="grid h-screen grid-flow-row ">
      {showNavbar && (
        <Navbar
          isTransparent={navbarIsTransparent}
          showLogin={showLogin}
          showLogo={showLogo}
        />
      )}
      <div>{children}</div>
    </div>
  </div>
);

export default Layout;

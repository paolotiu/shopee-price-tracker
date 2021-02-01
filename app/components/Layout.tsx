import React, { ReactNode } from "react";
import Head from "next/head";
import { NavProps } from "components/General/Navbar";
import dynamic from "next/dynamic";
const Navbar = dynamic(() => import("components/General/Navbar"));
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
}: Props) => {
  return (
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
};

export default Layout;

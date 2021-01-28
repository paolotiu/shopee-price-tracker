import React, { ReactNode } from "react";
import Head from "next/head";
import { Navbar, NavProps } from "./General/Navbar";
import { motion } from "framer-motion";
import { PanHandler } from "framer-motion/types/gestures/PanSession";
import { useDispatch } from "react-redux";
import { directSidebar } from "../slices/uiSlice";

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
  const dispatch = useDispatch();
  const panHandler: PanHandler = (e, info) => {
    if (info.offset.x > 0) {
      dispatch(directSidebar(true));
    } else if (info.offset.x < 0) {
      dispatch(directSidebar(false));
    }
  };
  return (
    <motion.div {...props} onPan={panHandler}>
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
    </motion.div>
  );
};

export default Layout;

import React, { ReactNode } from "react";
import Head from "next/head";
import { NavProps } from "components/General/Navbar";
import { motion } from "framer-motion/dist/framer-motion";
import { PanHandler } from "framer-motion/types/gestures/PanSession";
import { useDispatch, useSelector } from "react-redux";
import { directSidebar, sidebarPossibilitySelector } from "../slices/uiSlice";
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
  const dispatch = useDispatch();
  const isSidebarPossible = useSelector(sidebarPossibilitySelector);
  const panHandler: PanHandler = (e, info) => {
    // Prevent opening sidebar when it shoulnd't be there
    if (!isSidebarPossible) {
      return;
    }
    // Prevent opening sidebar when a pan is detected on the toggleswitch for the theme
    if (
      (e.target as Element).classList.contains("cancel-sb-pan") ||
      (e.target as Element).tagName === "svg" ||
      (e.target as Element).tagName === "NAV" ||
      (e.target as Element).tagName === "path"
    ) {
      return;
    }

    if (info.offset.x > 0) {
      dispatch(directSidebar(true));
    } else {
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

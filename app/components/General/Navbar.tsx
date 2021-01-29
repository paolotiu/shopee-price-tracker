import React, { useEffect } from "react";
import Link from "next/link";
import { ToggleSwitch } from "./ToggleSwitch";
import Logo from "../../public/logo.svg";
import Bars from "../../public/bars.svg";

import { toggleSidebar, toggleSidebarPossibility } from "../../slices/uiSlice";
import { useDispatch } from "react-redux";
import tw from "twin.macro";
import dynamic from "next/dynamic";
const Sidebar = dynamic(import("components/General/Sidebar"));
export interface NavProps {
  showLogin?: boolean;
  isTransparent?: boolean;
  showLogo?: boolean;
}
const Navbar: React.FC<NavProps> = ({
  showLogin = true,
  isTransparent = false,
  showLogo = true,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (showLogo) {
      dispatch(toggleSidebarPossibility(false));
    } else {
      dispatch(toggleSidebarPossibility(true));
    }
  }, [showLogo]);
  return (
    <>
      <nav
        className={`fixed z-50 flex items-center justify-between w-screen p-5 transition duration-1000 bg-transparent dark:bg-transparent max-h-16 ${
          !isTransparent && "bg-primary dark:bg-primary-dark"
        }`}
        style={{ height: "min-content" }}
      >
        {showLogo ? (
          <Link href="/">
            <a>
              <Logo className="w-10 h-auto" />
            </a>
          </Link>
        ) : (
          <button
            aria-label="open sidebar"
            onClick={() => {
              dispatch(toggleSidebar());
            }}
          >
            <Bars className="h-auto w-9" />
          </button>
        )}
        <div
          className="cancel-sb-pan"
          css={[tw`flex justify-around `, showLogin && tw`w-48 sm:w-60`]}
        >
          <ToggleSwitch />
          {showLogin && (
            <Link href="/login">
              <a className="transition-transform duration-100 transform underline-yellow hover:scale-110">
                Login
              </a>
            </Link>
          )}
        </div>
        <Sidebar />
      </nav>
    </>
  );
};
export default Navbar;

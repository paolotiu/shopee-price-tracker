import React from "react";
import Link from "next/link";
import { ToggleSwitch } from "./ToggleSwitch";
import Logo from "../../public/logo.svg";

interface Props {
  showLogin?: boolean;
  isTransparent?: boolean;
}
export const Navbar = ({ showLogin = true, isTransparent = false }: Props) => {
  return (
    <nav
      className={
        isTransparent
          ? "flex items-center justify-between  p-5 "
          : "flex items-center justify-between  p-5 bg-primary dark:bg-primary-dark"
      }
      style={{ height: "min-content" }}
    >
      <Link href="/">
        <a>
          <Logo className="w-10" />
        </a>
      </Link>
      <div
        className={
          showLogin ? "sm:w-60 w-48 flex justify-around" : "flex justify-around"
        }
      >
        <ToggleSwitch />
        {showLogin && (
          <Link href="/login">
            <a className="underline-yellow transform hover:scale-110 transition duration-100">
              Login
            </a>
          </Link>
        )}
      </div>
    </nav>
  );
};

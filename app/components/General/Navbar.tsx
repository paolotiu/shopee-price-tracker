import React from "react";
import { ToggleSwitch } from "./ToggleSwitch";
import Logo from "../../public/logo.svg";
interface Props {}

export const Navbar = (props: Props) => {
  return (
    <nav className="p-5  flex	items-center justify-between">
      <button className="max-w-min">
        <Logo className="w-10" />
      </button>
      <div className=" sm:w-60 w-48 flex justify-around ">
        <ToggleSwitch />
        <button>Login</button>
      </div>
    </nav>
  );
};

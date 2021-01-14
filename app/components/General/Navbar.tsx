import React from "react";
import { ToggleSwitch } from "./ToggleSwitch";

interface Props {}

export const Navbar = (props: Props) => {
  return (
    <nav className="px-4 py-5">
      <ToggleSwitch />
    </nav>
  );
};

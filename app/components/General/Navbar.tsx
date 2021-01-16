import React from "react";
import { ToggleSwitch } from "./ToggleSwitch";
import Logo from "../../public/logo.svg";
import { useModalContext } from "../../utils/ModalContext";
import { LoginModal } from "../ModalContents/LoginModal";

export const Navbar = () => {
  const { openModal, setModalContent } = useModalContext();
  return (
    <nav
      className=" flex items-center justify-between  p-5 "
      style={{ height: "min-content" }}
    >
      <button className="max-w-min">
        <Logo className="w-10" />
      </button>
      <div className=" sm:w-60 w-48 flex justify-around ">
        <ToggleSwitch />
        <button onClick={showLoginModal}>Login</button>
      </div>
    </nav>
  );

  function showLoginModal() {
    openModal();
    setModalContent(<LoginModal />);
  }
};

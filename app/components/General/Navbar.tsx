import React from "react";
import { ToggleSwitch } from "./ToggleSwitch";
import Logo from "../../public/logo.svg";
import { useModalContext } from "../../utils/ModalContext";
import { LoginModal } from "../ModalContents/LoginModal";

interface Props {
  showLogin?: boolean;
}
export const Navbar = ({ showLogin = true }: Props) => {
  const { openModal, setModalContent } = useModalContext();
  return (
    <nav
      className=" flex items-center justify-between  p-5 "
      style={{ height: "min-content" }}
    >
      <button className="max-w-min">
        <Logo className="w-10" />
      </button>
      <div
        className={
          showLogin ? "sm:w-60 w-48 flex justify-around" : "flex justify-around"
        }
      >
        <ToggleSwitch />
        {showLogin && <button onClick={showLoginModal}>Login</button>}
      </div>
    </nav>
  );

  function showLoginModal() {
    openModal();
    setModalContent(<LoginModal />);
  }
};

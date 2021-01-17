import React from "react";
import Link from "next/link";
import { ToggleSwitch } from "./ToggleSwitch";
import Logo from "../../public/logo.svg";
import { useModalContext } from "../../utils/ModalContext";
import { LoginModal } from "../ModalContents/LoginModal";

interface Props {
  showLogin?: boolean;
  isTransparent?: boolean;
}
export const Navbar = ({ showLogin = true, isTransparent = false }: Props) => {
  const { openModal, setModalContent } = useModalContext();
  return (
    <nav
      className={
        isTransparent
          ? "flex items-center justify-between  p-5"
          : "flex items-center justify-between  p-5 bg-primary dark:bg-primary-dark"
      }
      style={{ height: "min-content" }}
    >
      <Link href="/">
        <a href="">
          <Logo className="w-10" />
        </a>
      </Link>
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

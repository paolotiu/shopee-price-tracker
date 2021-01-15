import React, { ReactNode, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

interface Props {
  isOpen: boolean;
  children?: ReactNode;
}

export const Modal = ({ isOpen, children }: Props) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isHidden, setIsHidden] = useState(!isOpen);
  const modalRef = useRef<Element>();
  const container = (
    <div
      className={
        isHidden
          ? "fixed top-0 left-0 h-screen w-screen bg-gray-400 opacity-40 hidden"
          : "fixed top-0 left-0 h-screen w-screen bg-gray-400 opacity-40 "
      }
      onClick={() => {}}
    >
      {children}
    </div>
  );
  useEffect(() => {
    modalRef.current = document.querySelector("#modal")!;
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setIsHidden(!isOpen);
  }, [isOpen]);

  return isMounted && modalRef.current
    ? ReactDOM.createPortal(container, modalRef.current)
    : null;
};

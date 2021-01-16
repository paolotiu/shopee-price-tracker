import React, { ReactNode, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

interface Props {
  isOpen: boolean;
  onModalClick?: () => void;
  children?: ReactNode;
}

export const Modal = ({ isOpen, onModalClick, children }: Props) => {
  const [isMounted, setIsMounted] = useState(false);
  const modalRef = useRef<Element>();
  const containerRef = useRef<HTMLDivElement>(null);
  const container = (
    <div
      ref={containerRef}
      className={
        "fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 z-10 hidden"
      }
      onClick={onModalClick}
    >
      <div className="bg-white p-4 " onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
  useEffect(() => {
    modalRef.current = document.querySelector("#modal")!;
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      containerRef.current?.classList.remove("hidden");
    } else {
      containerRef.current?.classList.add("hidden");
    }
  }, [isOpen]);
  return isMounted && modalRef.current
    ? ReactDOM.createPortal(container, modalRef.current)
    : null;
};

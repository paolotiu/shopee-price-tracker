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
        "fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-40 opacity-0 flex items-center justify-center z-10 transition duration-500  pointer-events-none "
      }
      onClick={onModalClick}
    >
      <div className="" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
  useEffect(() => {
    modalRef.current = document.querySelector("#modal")!;
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      if (isOpen) {
        // Show modal then start capturing clicks
        containerRef.current.style.opacity = "1";
        containerRef.current?.classList.remove("pointer-events-none");
      } else {
        containerRef.current.style.opacity = "0";
        containerRef.current?.classList.add("pointer-events-none");
      }
    }
  }, [isOpen]);
  return isMounted && modalRef.current
    ? ReactDOM.createPortal(container, modalRef.current)
    : null;
};

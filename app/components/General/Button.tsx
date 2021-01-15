import React from "react";

interface Props {
  className?: string;
}

export const Button: React.FC<Props> = ({ children, className }) => {
  return (
    <button className={className ? className : "btn-primary"}>
      {children}
    </button>
  );
};

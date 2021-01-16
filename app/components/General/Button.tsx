import React from "react";

interface Props {
  className?: string;
  onClick: () => void;
}

export const Button: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <button className={className ? className : "btn-primary"} {...props}>
      {children}
    </button>
  );
};

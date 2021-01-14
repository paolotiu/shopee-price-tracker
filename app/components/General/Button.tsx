import React from "react";

interface Props {}

export const Button: React.FC<Props> = ({ children }) => {
  return <button className="btn-primary">{children}</button>;
};

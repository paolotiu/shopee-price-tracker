import React from "react";

interface Props {
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
  accent?: boolean;
  filled?: boolean;
  onClick?: () => void;
  name: string;
}

export const Button: React.FC<Props> = ({
  children,
  className,
  accent,
  filled,
  ...props
}) => {
  if (accent) {
    return (
      <button
        className={
          filled
            ? "bg-accent dark:bg-accent-dark py-3 px-4 rounded-full font-bold text-white transition-colors duration-1000"
            : "border-2 box-border border-accent dark:border-accent-dark text-accent dark:text-accent-dark py-3 px-4 rounded-full font-bold transition-colors duration-1000"
        }
        {...props}
      >
        {children}
      </button>
    );
  }
  return (
    <button type="button" className={"btn-primary " + className} {...props}>
      {children}
    </button>
  );
};

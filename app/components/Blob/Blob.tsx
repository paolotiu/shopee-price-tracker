import { CSSProperties } from "react";

interface Props {
  src: string;
  className?: string;
  overrideClass?: boolean;
  alt?: string;
  style?: CSSProperties;
}

export default function Blob({
  src,
  className,
  overrideClass = false,
  alt = "blob",
  ...otherProps
}: Props) {
  return (
    <img
      src={src}
      className={overrideClass ? className : "fixed z--1 " + className}
      alt={alt}
      {...otherProps}
    />
  );
}

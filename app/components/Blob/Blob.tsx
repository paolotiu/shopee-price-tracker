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
  ...otherProps
}: Props) {
  return (
    <img
      src={src}
      className={overrideClass ? className : "fixed " + className}
      {...otherProps}
    />
  );
}

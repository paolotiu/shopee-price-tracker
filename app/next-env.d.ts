/// <reference types="next" />
/// <reference types="next/types/global" />

declare module "*.svg" {
  import React = require("react");
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  export default content;
}

interface Window {
  __setPreferredTheme: (theme: string) => void;
  __theme: string;
  __onThemeChange: any;
}

declare module "react-multiline-clamp" {
  import React from "react";
  interface Props {
    lines?: number;
    children?: React.ReactNode;
    maxLines?: number;
    withTooltip?: boolean;
    withToggle?: boolean;
    texts?: {
      showMore: string;
      showLess: string;
    };
    onShowMore?: () => void;
  }
  let defaultValues: Props = {
    lines: 2,
    maxLines: 8,
    withTooltip: true,
    withToggle: false,
    texts: {
      showMore: "More",
      showLess: "Less",
    },
    onShowMore: () => {},
  };
  const Clamp: React.FC<Props>;
  export default Clamp;
}

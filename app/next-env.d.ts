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

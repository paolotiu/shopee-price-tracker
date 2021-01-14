import React, { ReactNode } from "react";
import Head from "next/head";

type Props = {
  children?: ReactNode;
  title?: string;
  className?: string;
};

const Layout = ({
  children,
  title = "This is the default title",
  ...props
}: Props) => (
  <div {...props}>
    <Head>
      <title> {title}</title>
    </Head>
    {children}
  </div>
);

export default Layout;

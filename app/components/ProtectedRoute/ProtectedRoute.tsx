import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getUser } from "../../utils/api";
import { apiHandler } from "../../utils/apiHandler";

interface Props {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const { error } = await apiHandler(getUser());
      if (error) {
        router.push("/login");
      } else {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) {
    return <> </>;
  }

  return <>{children}</>;
};

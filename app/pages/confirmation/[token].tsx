import { GetServerSideProps } from "next";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { confirmEmail } from "utils/api";
import { apiHandler } from "utils/apiHandler";
import Layout from "components/Layout";
import toast from "react-hot-toast";

interface Props {
  token: string;
  message: string;
  isError: boolean;
  status: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { token } = context.params!;
  const { error } = await apiHandler(
    confirmEmail(token as string) as Promise<string>
  );

  let isError = false;
  let message = "Email Verified!";
  let status = "verified";
  if (error) {
    message = error.message;
    if (message === "ECONNREFUSED") {
      message = "Failed to connect with server";
      status = "down";
    } else if (message === "Token expired") {
      status = "expired";
    } else if (message === "Invalid token") {
      status = "error";
    }
    isError = true;
  }

  return {
    props: {
      message,
      isError,
      status,
    },
  };
};

const Confirmation = ({ message, isError, status }: Props) => {
  const [isResendClicked, setIsResendClicked] = useState(false);
  const router = useRouter();
  const resendVerificationEmail = () => {
    setIsResendClicked(true);
  };
  return (
    <Layout showLogo={false} title={"Email Confirmation"}>
      <div className="flex flex-col items-center mt-40">
        <h1
          className={
            isError
              ? "text-4xl font-bold text-red-500"
              : "text-4xl font-bold text-green-500 "
          }
        >
          {message}
        </h1>
        <br />

        {status !== "error" && (
          <button
            className="text-2xl underline-yellow "
            onClick={
              status !== "verified"
                ? () => {
                    if (isResendClicked) {
                      toast("Email already sent!", { icon: "💢" });
                    }
                    resendVerificationEmail();
                  }
                : () => router.push("/login")
            }
          >
            {status !== "verified"
              ? "Resend Verification Email"
              : "Redirect to login page"}
          </button>
        )}
        {status === "expired" ? (
          <img
            src="/time.svg"
            className="max-w-sm mt-20 md:max-w-lg"
            alt="Token expired svg"
          />
        ) : status === "verified" ? (
          <img
            src="/email_verified.svg"
            alt="Email verified svg"
            className="max-w-xs mt-20 sm:max-w-md md:max-w-lg"
          />
        ) : (
          <img
            src="/server_down.svg"
            alt="server down svg"
            className="max-w-lg mt-20"
          />
        )}
      </div>
    </Layout>
  );
};

export default Confirmation;

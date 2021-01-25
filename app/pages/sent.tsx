import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Layout from "../components/Layout";
import { userSelector } from "../slices/userSlice";
import { resendConfirmationEmail } from "../utils/api";
import { apiHandler } from "../utils/apiHandler";
const Sent = () => {
  const [seconds, setSeconds] = useState(0);
  const { email } = useSelector(userSelector);
  const router = useRouter();
  const resendEmail = async () => {
    if (seconds) {
      toast.error(`Wait for ${seconds} seconds to resend email`);
      return;
    }
    const { error } = await apiHandler(resendConfirmationEmail(email));

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Email sent");
    }
    // Start timer till resend again
    setSeconds(60);
  };
  useEffect(() => {
    if (!seconds) return;
    const timer = setInterval(() => {
      console.log("HEYo");
      setSeconds(seconds - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  useEffect(() => {
    if (!email) {
      router.push("/signup");
    }
  }, []);

  return (
    <Layout title="Email Sent">
      <div className="flex flex-col items-center mt-20">
        <img src="/email_sent.svg" alt="" className="max-w-xs pb-10" />
        <h1 className="text-4xl font-bold">
          A confirmation email has been sent to
        </h1>
        <p className="p-8 text-2xl underline text-primary">{email}</p>
        <p className="text-sm text-gray-300 opacity-70">
          *Make sure to check your spam inbox
        </p>
        <br />
        <p className="mt-10 text-2xl">
          Didn't receive an email? &nbsp;
          <button
            className="mt-10 text-2xl underline-yellow "
            onClick={() => {
              resendEmail();
            }}
          >
            Resend confirmation email
          </button>
        </p>
        <p className="mt-10">Resend in {seconds}s</p>
      </div>
    </Layout>
  );
};

export default Sent;

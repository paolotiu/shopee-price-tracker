import Layout from "components/Layout";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import "twin.macro";
import { sendForgetEmail } from "utils/api";
import { apiHandler } from "utils/apiHandler";
import { useTimer } from "utils/useTimer";

const Forget = () => {
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);

  const [seconds, setSeconds] = useTimer();
  const sumbitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsSending(true);

    const { error } = await apiHandler(sendForgetEmail(email));
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Email sent", { duration: 10000 });
      setSeconds(120);
    }
    setIsSending(false);
  };

  return (
    <Layout showLogin={false} title="Password Reset">
      <div tw="flex justify-center mt-32">
        <div tw="flex flex-col max-w-md px-4 py-8 mb-40 transition duration-1000 bg-white border-2 rounded-lg shadow dark:bg-black dark:border-yellow-600 border-accent sm:px-6 md:px-8 lg:px-10">
          <div tw="self-center mb-6 text-xl font-light text-gray-600 transition duration-1000 sm:text-2xl dark:text-white">
            Forgot Your Password?
          </div>

          <form tw="flex flex-col" onSubmit={sumbitHandler}>
            <input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              aria-label="email input"
              tw="my-2 flex-1 w-full px-4 py-2 text-base  text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <button
              disabled={!!seconds || isSending}
              type="submit"
              tw="mt-3 w-full  px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in rounded-lg shadow-md disabled:bg-gray-300 disabled:hover:bg-gray-300 bg-primary hover:bg-primary-dark focus:ring-primary focus:ring-offset-white focus:outline-none focus:ring-2 focus:ring-offset-2 "
            >
              Send me a recovery link
            </button>
            <small tw="self-center pt-2">
              {!!seconds && `Resend email again in ${seconds}s`}
            </small>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Forget;

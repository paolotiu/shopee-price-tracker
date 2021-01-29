import React from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import dynamic from "next/dynamic";

const SignupForm = dynamic(import("components/Forms/SignupForm"));

const SignUp = () => {
  return (
    <Layout showLogin={false} title="Sign Up">
      <div className="flex justify-center mt-32">
        <div className="flex flex-col max-w-md px-4 py-8 mb-40 transition duration-1000 bg-white border-2 rounded-lg shadow dark:bg-black dark:border-yellow-600 border-accent sm:px-6 md:px-8 lg:px-10">
          <div className="self-center mb-2 text-xl font-light text-gray-800 transition duration-1000 sm:text-2xl dark:text-white">
            Create a new account
          </div>
          <span className="justify-center text-sm text-center text-gray-500 transition duration-1000 flex-items-center dark:text-gray-400">
            Already have an account ?
            <Link href="/login">
              <a className="underline-yellow hover:text-primary"> Sign In</a>
            </Link>
          </span>
          <div className="grid gap-4 py-6 item-center">
            <a href={process.env.NEXT_PUBLIC_SERVER_URL + "/auth/facebook"}>
              <button
                aria-label="Login with Facebook"
                type="button"
                className="flex items-center justify-center w-full px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 "
              >
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="mr-2"
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1343 12v264h-157q-86 0-116 36t-30 108v189h293l-39 296h-254v759h-306v-759h-255v-296h255v-218q0-186 104-288.5t277-102.5q147 0 228 12z"></path>
                </svg>
                Login with Facebook
              </button>
            </a>
            <a href={process.env.NEXT_PUBLIC_SERVER_URL + "/auth/google"}>
              <button
                aria-label="Login with Google"
                type="button"
                className="flex items-center justify-center w-full px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-red-600 rounded-lg shadow-md hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 "
              >
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="mr-2"
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M896 786h725q12 67 12 128 0 217-91 387.5t-259.5 266.5-386.5 96q-157 0-299-60.5t-245-163.5-163.5-245-60.5-299 60.5-299 163.5-245 245-163.5 299-60.5q300 0 515 201l-209 201q-123-119-306-119-129 0-238.5 65t-173.5 176.5-64 243.5 64 243.5 173.5 176.5 238.5 65q87 0 160-24t120-60 82-82 51.5-87 22.5-78h-436v-264z"></path>
                </svg>
                Login with Google
              </button>
            </a>
          </div>

          <hr className="bg-white dark:bg-black hr-text" data-content="OR" />
          <SignupForm />
        </div>
      </div>
    </Layout>
  );
};
export default SignUp;

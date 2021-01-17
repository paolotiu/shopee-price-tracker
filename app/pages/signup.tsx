import React from "react";
import { Formik, Field, Form } from "formik";
import { signUp } from "../utils/api";
import Link from "next/link";
import Layout from "../components/Layout";

interface Props {}
interface Fields {
  email: string;
  password: string;
}
const SignUp = () => {
  return (
    <Layout showLogin={false} title="Sign Up">
      <div className="flex justify-center mt-32">
        <div className="flex flex-col mb-40 bg-white dark:bg-black dark:border-yellow-600 border-transparent border-2 shadow px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-lg max-w-md transition duration-1000">
          <div className="font-light self-center text-xl sm:text-2xl text-gray-800 dark:text-white mb-2 transition duration-1000">
            Create a new account
          </div>
          <span className="flex-items-center text-gray-500 dark:text-gray-400 justify-center text-center text-sm transition duration-1000">
            Already have an account ?
            <Link href="/login">
              <a className="underline-yellow hover:text-primary"> Sign In</a>
            </Link>
          </span>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values: Fields, { setSubmitting }) => {
              signUp(values.email, values.password);
              setSubmitting(false);
            }}
          >
            <Form>
              <div className="mt-6 p-6">
                <div className="flex flex-col mb-2">
                  <div className=" relative ">
                    <Field
                      type="email"
                      name="email"
                      className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Email"
                    />
                  </div>
                </div>
                <div className="flex flex-col mb-2 mt-4">
                  <div className=" relative ">
                    <Field
                      type="password"
                      name="password"
                      autoComplete="on"
                      className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Password"
                    />
                  </div>
                </div>
                <div className="flex w-full mt-6 ">
                  <button
                    type="submit"
                    className="py-2 px-4 bg-primary hover:bg-primary-dark focus:ring-primary focus:ring-offset-white text-white w-full transition ease-in duration-200 text-center text-base font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 "
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </Layout>
  );
};
export default SignUp;

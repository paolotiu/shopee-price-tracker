import React from "react";
import { Formik, ErrorMessage, Field, Form } from "formik";
import { useModalContext } from "../../utils/ModalContext";
import { LoginModal } from "./LoginModal";
import { signUp } from "../../utils/api";

interface Props {}
interface Fields {
  email: string;
  password: string;
}
export const SignUpModal = () => {
  const { setModalContent } = useModalContext();
  return (
    <div className="flex flex-col mb-40 bg-white dark:bg-black shadow px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-lg max-w-md">
      <div className="font-light self-center text-xl sm:text-2xl text-gray-800 dark:text-white mb-2">
        Create a new account
      </div>
      <span className="flex-items-center text-gray-500 dark:text-gray-400 justify-center text-center text-sm">
        Already have an account ?
        <a
          className="cursor-pointer underline-yellow z-0 hover:text-primary w-min"
          onClick={showLoginModal}
        >
          {" "}
          Sign In
        </a>
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
  );
  function showLoginModal() {
    setModalContent(<LoginModal />);
  }
};

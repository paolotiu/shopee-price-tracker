import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { resendConfirmationEmail, signUp } from "../utils/api";
import Link from "next/link";
import Layout from "../components/Layout";
import { apiHandler } from "../utils/apiHandler";
import ClipLoader from "react-spinners/ClipLoader";
import * as yup from "yup";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addUser } from "../slices/userSlice";
import { useRouter } from "next/router";
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";
interface Fields {
  email: string;
  password: string;
}

const SignUp = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [validations, setValidations] = useState({
    length: false,
    uppercase: false,
    number: false,
    all: false,
  });

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .required("Required")
      .min(8, "length")
      .matches(RegExp("(.*[A-Z].*)"), "uppercase")
      .matches(RegExp("(.*\\d.*)"), "number"),
  });

  const submitHandler = async (
    values: Fields,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    const { error } = await apiHandler(signUp(values.email, values.password));

    if (error) {
      if (error.message === '"email" must be a valid email') {
        error.message = "Email is not valid";
      } else if (error.message === "Email not yet confirmed") {
        // Send to email sent page
        dispatch(addUser(values.email, [], false));
        router.push("/sent");
        resendConfirmationEmail(values.email);
        setSubmitting(false);
        return;
      }

      toast.error(error.message, {
        style: {
          margin: "100px",
        },
      });
    }

    // Set email in store
    dispatch(addUser(values.email, [], false));
    router.push("/sent");
    setSubmitting(false);
    return;
  };
  return (
    <Layout showLogin={false} title="Sign Up">
      <div className="flex items-center justify-center mt-20 overflow-hidden">
        <div className="flex flex-col w-screen max-w-md px-4 py-8 transition duration-1000 bg-white border-2 rounded-lg shadow dark:bg-black dark:border-yellow-600 border-accent sm:px-6 md:px-8 sm:max-w-md lg:px-10 max-w-90vw">
          <div className="self-center mb-2 text-xl font-light text-gray-800 transition duration-1000 sm:text-2xl dark:text-white">
            Create a new account
          </div>
          <span className="justify-center text-sm text-center text-gray-500 transition duration-1000 flex-items-center dark:text-gray-400">
            Already have an account ?
            <Link href="/login">
              <a className="underline-yellow hover:text-primary"> Sign In</a>
            </Link>
          </span>
          <div className="grid gap-5 py-8 pb-5 text-center">
            <a href="http://localhost:3001/auth/facebook" className="w-full">
              <button
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
                Continue with Facebook
              </button>
            </a>
            <a href="http://localhost:3001/auth/google">
              <button
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
                Continue with Google
              </button>
            </a>
          </div>
          <div className="w-full h-3 text-center text-gray-300 border-b opacity-70">
            <span className="inline-block px-1 bg-black">OR</span>
          </div>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={schema}
            validate={(values) => {
              schema
                .validate(values, { abortEarly: false })
                .then(() => {
                  // Passed validation
                  setValidations({
                    length: true,
                    uppercase: true,
                    number: true,
                    all: true,
                  });
                })
                .catch((e) => {
                  const errors = e.errors as string[];

                  setValidations({
                    length: !errors.includes("length"),
                    uppercase: !errors.includes("uppercase"),
                    number: !errors.includes("number"),
                    all: false,
                  });
                });
            }}
            onSubmit={submitHandler}
          >
            {({ isSubmitting }) => {
              return (
                <Form>
                  <div className="mt-6 ">
                    <div className="flex flex-col mb-2">
                      <div className="relative ">
                        <Field
                          type="email"
                          name="email"
                          className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Email"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="mt-2 text-sm text-red-400"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col mt-4 mb-2">
                      <div className="relative ">
                        <Field
                          type="password"
                          name="password"
                          autoComplete="on"
                          className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Password"
                        />
                        <ul className="mt-4 list-disc list-inside">
                          <li
                            className={
                              validations.length
                                ? "text-green-400 dark:text-green-500"
                                : "text-red-400"
                            }
                          >
                            At least 8 characters long
                          </li>
                          <li
                            className={
                              validations.uppercase
                                ? "text-green-400 dark:text-green-500"
                                : "text-red-400"
                            }
                          >
                            At least one uppercase character
                          </li>
                          <li
                            className={
                              validations.number
                                ? "text-green-400 dark:text-green-500"
                                : "text-red-400"
                            }
                          >
                            At least one number
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="flex w-full mt-6 ">
                      <button
                        disabled={isSubmitting || !validations.all}
                        type="submit"
                        className="w-full px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in rounded-lg shadow-md disabled:bg-gray-300 bg-primary hover:bg-primary-dark focus:ring-primary focus:ring-offset-white focus:outline-none focus:ring-2 focus:ring-offset-2 "
                      >
                        {isSubmitting ? (
                          <ClipLoader color="#f2f2f2" />
                        ) : (
                          "Sign up"
                        )}
                      </button>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </Layout>
  );
};
export default SignUp;

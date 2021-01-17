import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { signUp } from "../utils/api";
import Link from "next/link";
import Layout from "../components/Layout";
import { apiHandler } from "../utils/apiHandler";
import ClipLoader from "react-spinners/ClipLoader";
import * as yup from "yup";
import toast from "react-hot-toast";
interface Props {}
interface Fields {
  email: string;
  password: string;
}
const SignUp = () => {
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
      }
      toast.error(error.message, {});
    }
    setSubmitting(false);
  };
  return (
    <Layout showLogin={false} title="Sign Up">
      <div className="flex justify-center mt-32">
        <div className="flex flex-col mb-40 bg-white dark:bg-black dark:border-yellow-600 border-accent border-2 shadow px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-lg max-w-md transition duration-1000">
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
                  <div className="mt-6 p-6">
                    <div className="flex flex-col mb-2">
                      <div className=" relative ">
                        <Field
                          type="email"
                          name="email"
                          className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Email"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-red-400 text-sm mt-2"
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
                        <ul className="list-disc list-inside mt-4">
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
                        className="py-2 px-4 disabled:bg-gray-300  bg-primary hover:bg-primary-dark focus:ring-primary focus:ring-offset-white text-white w-full transition ease-in duration-200 text-center text-base font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 "
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

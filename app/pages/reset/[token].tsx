import Layout from "components/Layout";
import { GetServerSideProps } from "next";
import { useState } from "react";
import { Form, Field, Formik } from "formik";
import "twin.macro";
import * as yup from "yup";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import { apiHandler } from "utils/apiHandler";
import { resetPassword } from "utils/api";
import { useRouter } from "next/router";
const ClipLoader = dynamic(() => import("react-spinners/ClipLoader"));

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = ctx.params!;
  return {
    props: {
      token,
    },
  };
};

interface Props {
  token: string;
}

const Reset = ({ token }: Props) => {
  const [validations, setValidations] = useState({
    length: false,
    uppercase: false,
    number: false,
    all: false,
  });
  const router = useRouter();
  const schema = yup.object().shape({
    password: yup
      .string()
      .required("Required")
      .min(8, "length")
      .matches(RegExp("(.*[A-Z].*)"), "uppercase")
      .matches(RegExp("(.*\\d.*)"), "number"),
  });
  const submitHandler = async (values: { password: string }) => {
    const { error } = await apiHandler(resetPassword(token, values.password));

    if (error) {
      toast.error(error.message);
      return;
    } else {
      toast.success("Password changed");
      router.push("/login");
    }
  };
  return (
    <Layout title="Change Password">
      <div tw="flex justify-center mt-32">
        <div className="flex flex-col max-w-md px-4 py-8 mb-40 transition duration-1000 bg-white border-2 rounded-lg shadow dark:bg-black dark:border-yellow-600 border-accent sm:px-6 md:px-8 lg:px-10">
          <div className="self-center mb-2 text-xl font-light text-gray-800 transition duration-1000 sm:text-2xl dark:text-white">
            Change password
          </div>
          <Formik
            initialValues={{ password: "" }}
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
                  <div className="p-6 ">
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
                        name="Submit"
                        disabled={isSubmitting || !validations.all}
                        type="submit"
                        className="w-full px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in rounded-lg shadow-md disabled:bg-gray-300 bg-primary hover:bg-primary-dark focus:ring-primary focus:ring-offset-white focus:outline-none focus:ring-2 focus:ring-offset-2 "
                      >
                        {isSubmitting ? (
                          <ClipLoader color="#f2f2f2" />
                        ) : (
                          "Save Changes"
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

export default Reset;

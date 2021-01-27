import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { login } from "../utils/api";
import Link from "next/link";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import { apiHandler } from "../utils/apiHandler";
import ClipLoader from "react-spinners/ClipLoader";
import toast from "react-hot-toast";
import { addUser } from "../slices/userSlice";
import { useDispatch } from "react-redux";
interface Fields {
  email: string;
  password: string;
}
const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const handleSubmit = async (
    values: Fields,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    const { error, data } = await apiHandler(
      login(values.email, values.password)
    );
    if (error) {
      toast.error(error.message, {
        style: {
          margin: "100px",
        },
      });
    } else {
      console.log(data);
      dispatch(addUser(data?.email, data?.items, true));
      router.push("/home");
    }

    setSubmitting(false);
  };

  return (
    <Layout showLogin={false} title="Login">
      <div className="flex justify-center mt-24">
        <div className="flex flex-col w-full p-4 px-4 py-8 transition duration-1000 bg-white border-2 rounded-lg shadow dark:bg-black dark:border-yellow-600 border-accent sm:px-6 md:px-8 lg:px-10 sm:max-w-md max-w-90vw">
          <div className="self-center mb-6 text-xl font-light text-gray-600 transition duration-1000 sm:text-2xl dark:text-white">
            Login To Your Account
          </div>

          <div className="grid grid-cols-2 gap-4 item-center">
            <a href={process.env.NEXT_PUBLIC_SERVER_URL + "/auth/facebook"}>
              <button
                name="Login with Facebook"
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
                Facebook
              </button>
            </a>
            <a href={process.env.NEXT_PUBLIC_SERVER_URL + "/auth/google"}>
              <button
                name="Login with Google"
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
                Google
              </button>
            </a>
          </div>
          <Formik
            initialValues={{ email: "", password: "" }}
            validate={(values: Fields) => {
              const errors: { [key: string]: string } = {};
              if (!values.email) {
                errors.email = "Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }

              if (!values.password) {
                errors.password = "Required";
              }
              return errors;
            }}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mt-8">
                  <div className="flex flex-col mb-2">
                    <div className="relative flex ">
                      <span className="inline-flex items-center px-3 text-sm text-gray-500 bg-white border-t border-b border-l border-gray-300 shadow-sm rounded-l-md ">
                        <svg
                          width="15"
                          height="15"
                          fill="currentColor"
                          viewBox="0 0 1792 1792"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z"></path>
                        </svg>
                      </span>
                      <Field
                        type="email"
                        name="email"
                        className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-r-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark focus:border-transparent"
                        placeholder="Your email"
                      />
                    </div>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="mt-2 text-sm text-red-400"
                    />
                  </div>
                  <div className="flex flex-col mb-6">
                    <div className="relative flex ">
                      <span className="inline-flex items-center px-3 text-sm text-gray-500 bg-white border-t border-b border-l border-gray-300 shadow-sm rounded-l-md">
                        <svg
                          width="15"
                          height="15"
                          fill="currentColor"
                          viewBox="0 0 1792 1792"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z"></path>
                        </svg>
                      </span>

                      <Field
                        type="password"
                        name="password"
                        autoComplete="on"
                        className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-r-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark focus:border-transparent"
                        placeholder="Your password"
                      />
                    </div>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="mt-2 text-sm text-red-400"
                    />
                  </div>
                  <div className="flex items-center mb-6 -mt-4">
                    <div className="flex ml-auto">
                      <a
                        href="#"
                        className="inline-flex text-xs font-thin text-gray-500 transition duration-1000 sm:text-sm dark:text-gray-100 hover:text-gray-700 dark:hover:text-white"
                      >
                        Forgot Your Password?
                      </a>
                    </div>
                  </div>
                  <button
                    name="submit"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in rounded-lg shadow-md bg-primary hover:bg-primary-dark focus:ring-accent focus:ring-offset-white focus:outline-none focus:ring-2 focus:ring-offset-2 "
                  >
                    {isSubmitting ? <ClipLoader color="#f2f2f2" /> : "Login"}
                  </button>
                  <div className="flex w-full"></div>
                  <div className="flex items-center justify-center mt-6">
                    <Link href="/signup">
                      <a className="ml-2 text-gray-500 underline-yellow hover:text-primary">
                        You don&#x27;t have an account?
                      </a>
                    </Link>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Layout>
  );
};
export default Login;

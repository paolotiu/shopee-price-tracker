import React from "react";
import Link from "next/link";
import Blob from "components/Blob/Blob";
import { Button } from "components/General/Button";
import Layout from "components/Layout";
import { GetServerSideProps } from "next";
import { getUser } from "utils/api";
import { apiHandler } from "utils/apiHandler";
import store from "store";
import { addUser } from "slices/userSlice";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { data, error } = await apiHandler(getUser(req.headers.cookie));
  if (!error) {
    store.dispatch(addUser(data?.email, data?.items, true));
    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
    };
  }

  return { props: {} };
};
const IndexPage = () => {
  return (
    <Layout title="Home" navbarIsTransparent={true}>
      {[0, 1, 2, 3, 4].map((x) => (
        <Blob key={x} num={x} />
      ))}

      <section className="absolute w-full transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 ">
        <div className="grid items-center w-full lg:grid-cols-2 h-2/5 justify-items-center">
          <div className="flex flex-col items-center w-max lg:items-start">
            <h1 className="mb-10 text-5xl font-bold text-center max-w-300 lg:max-w-sm lg:text-left lg:text-6xl">
              Know when the price{" "}
              <span className="landing-underline">drops</span>
            </h1>
            <Link href="/signup">
              <a>
                <Button
                  className="transition duration-1000 ease-in-out btn-primary dark:hover:bg-primary hover:bg-primary-dark hover:duration-300 "
                  aria-label="sign up page"
                >
                  Start Tracking
                </Button>
              </a>
            </Link>
          </div>
          <img
            src="/undraw/chartguy.svg"
            alt="guy looking at chart"
            className="hidden lg:block"
            style={{
              height: "90%",
              maxHeight: "40vh",
            }}
          />
        </div>
      </section>
    </Layout>
  );
};

export default IndexPage;

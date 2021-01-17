import React from "react";
import Link from "next/link";
import Blob from "../components/Blob/Blob";
import { Button } from "../components/General/Button";
import Layout from "../components/Layout";

const IndexPage = () => {
  return (
    <Layout title="Home" navbarIsTransparent={true}>
      {[0, 1, 2, 3, 4].map((x) => (
        <Blob key={x} num={x} />
      ))}

      <section className="absolute w-full top-1/2 left-1/2 max-h-80 transform -translate-y-1/2 -translate-x-1/2 ">
        <div className=" grid lg:grid-cols-2 h-2/5  w-full items-center justify-items-center ">
          <div className="flex flex-col items-center w-max lg:items-start">
            <h1 className=" max-w-300 lg:max-w-sm mb-10  text-center lg:text-left text-5xl lg:text-6xl font-bold  ">
              Know when the price{" "}
              <span className="landing-underline">drops</span>
            </h1>
            <Link href="/signup">
              <a>
                <Button className="btn-primary transition duration-1000  dark:hover:bg-primary hover:bg-primary-dark hover:duration-300 ease-in-out ">
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
            }}
          />
        </div>
      </section>
    </Layout>
  );
};

export default IndexPage;

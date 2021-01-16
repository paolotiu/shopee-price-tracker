import React from "react";
import Blob from "../components/Blob/Blob";
import { Button } from "../components/General/Button";
import { Navbar } from "../components/General/Navbar";
import Layout from "../components/Layout";
import { SignUpModal } from "../components/ModalContents/SignUpModal";
import { useModalContext } from "../utils/ModalContext";
const IndexPage = () => {
  const { setModalContent, openModal } = useModalContext();
  return (
    <Layout title="Home">
      {[0, 1, 2, 3, 4].map((x) => (
        <Blob key={x} num={x} />
      ))}

      <section
        className="h-screen max-h-full grid"
        style={{ gridTemplateRows: "min-content 1fr" }}
      >
        <Navbar />
        <div className="place-self-center grid lg:grid-cols-2 h-2/5 mb-20 w-full items-center justify-items-center ">
          <div className="flex flex-col items-center w-max lg:items-start">
            <h1 className=" max-w-300 lg:max-w-sm mb-10  text-center lg:text-left text-5xl lg:text-6xl font-bold  ">
              Know when the price{" "}
              <span className="landing-underline">drops</span>
            </h1>
            <Button
              className="btn-primary transition duration-1000"
              onClick={showSignUpModal}
            >
              Start Tracking
            </Button>
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
  function showSignUpModal() {
    openModal();
    setModalContent(<SignUpModal />);
  }
};

export default IndexPage;

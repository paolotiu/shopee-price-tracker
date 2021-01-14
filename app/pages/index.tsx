import Blob from "../components/Blob/Blob";
import { Button } from "../components/General/Button";
import { Navbar } from "../components/General/Navbar";
import Layout from "../components/Layout";
const IndexPage = () => {
  return (
    <Layout title="Home">
      {[0, 1, 2, 3, 4].map((x) => (
        <Blob key={x} num={x} />
      ))}
      <Navbar />
      <section className="h-screen grid place-items-center ">
        <div className="grid lg:grid-cols-2 h-2/5 mb-40 w-full items-center justify-items-center ">
          <div className="flex flex-col items-center w-max lg:items-start">
            <h1 className="text-5xl font-bold text-center max-w-300 mb-10 lg:text-left lg:text-6xl lg:max-w-sm dark:text-white">
              Know when the price{" "}
              <span className="underline-yellow">drops</span>
            </h1>
            <Button>Start Tracking</Button>
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

import Blob from "../components/Blob/Blob";
import { Button } from "../components/General/Button";
import Layout from "../components/Layout";
const IndexPage = () => {
  return (
    <Layout title="Home">
      <Blob
        src="/blobs/blob1.svg"
        className="top-0 right-0 hidden max-h-70vh xl:block"
      />
      <Blob
        src="/blobs/blob2.svg"
        className="top-0 left-0 hidden max-h-20vh xl:block"
      />
      <Blob
        src="/blobs/blob3.svg"
        className="bottom-0 left-0 hidden  xl:block"
      />
      <Blob src="/blobs/blob4.svg" className="w-full top-0 xl:hidden" />
      <Blob src="/blobs/blob5.svg" className="bottom-0 left-0 xl:hidden" />
      <section className="m-h h-screen grid  pt-56 ">
        <div className="flex flex-col items-center">
          <h1
            className="text-5xl font-bold text-center mb-10 "
            style={{
              maxWidth: "300px",
            }}
          >
            Know when the price <span className="underline-yellow">drops</span>
          </h1>
          <Button>Start Tracking</Button>
        </div>
      </section>
    </Layout>
  );
};

export default IndexPage;

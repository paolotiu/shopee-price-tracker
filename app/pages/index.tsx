import Link from "next/link";
import Layout from "../components/Layout";
const IndexPage = () => {
  return (
    <Layout title="Home">
      <img
        src="/blobs/blob1.svg"
        alt="blob"
        className="fixed right-0 top-0 hidden lg:block"
        style={{ maxHeight: "70vh" }}
      />

      <img
        src="/blobs/blob2.svg"
        alt="blob"
        className="fixed left-0 top-0 hidden lg:block"
        style={{ maxHeight: "30vh" }}
      />
      <img
        src="/blobs/blob3.svg"
        alt="blob"
        className="fixed bottom-0 left-0 hidden
        lg:block
        "
      />
    </Layout>
  );
};

export default IndexPage;

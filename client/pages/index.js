import axios from "axios";

const Index = ({ data }) => {
  console.log({ data });
  return <h1>Index Page</h1>;
};

Index.getInitialProps = async ({ req }) => {
  if (typeof window === "undefined") {
    const { data } = await axios.get(
      "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser",
      { headers: req.headers } // pass cookies and other fields in header
    );

    return { data };
  } else {
    const { data } = await axios.get("/api/users/currentuser");
    return { data };
  }
};

export default Index;

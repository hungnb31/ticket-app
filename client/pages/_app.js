import "bootstrap/dist/css/bootstrap.css";

import Header from "../components/header";
import { buildClient } from "../api/build-client";

const App = ({ Component, pageProps, currentUser }) => {
  return (
    <>
      <Header currentUser={currentUser} />
      <div className="container">
        <Component {...pageProps} />
      </div>
    </>
  );
};

App.getInitialProps = async ({ Component, ctx }) => {
  const client = buildClient(ctx);

  const { data } = await client.get("/api/users/currentuser");

  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return {
    pageProps,
    ...data,
  };
};

export default App;

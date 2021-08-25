import "bootstrap/dist/css/bootstrap.css";

const App = ({ Component, pageProps }) => {
  return (
    <div className="container">
      <Component {...pageProps} />
    </div>
  );
};

export default App;

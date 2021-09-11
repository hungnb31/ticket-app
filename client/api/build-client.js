import axios from "axios";

const buildClient = ({ req }) => {
  if (typeof window === "undefined") {
    // on the server
    return axios.create({
      baseURL: "http://bluutech.co",
      headers: req.headers,
    });
  } else {
    // on the client
    return axios.create({
      baseURL: "/",
    });
  }
};

export { buildClient };

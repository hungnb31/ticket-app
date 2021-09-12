import axios from "axios";

const domain =
  process.env.NODE_ENV === "production"
    ? "http://bluutech.co"
    : "http://ticketapp.dev";

const buildClient = ({ req }) => {
  if (typeof window === "undefined") {
    // on the server
    return axios.create({
      baseURL: domain,
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

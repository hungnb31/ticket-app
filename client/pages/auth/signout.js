import router from "next/router";
import { useEffect } from "react";

import { useRequest } from "../../hooks/use-request";

const SignOut = () => {
  useEffect(() => {
    useRequest("/api/users/signout", "post", {}, () => router.push("/"));
  }, []);
  return <div>Signing you out...</div>;
};

export default SignOut;

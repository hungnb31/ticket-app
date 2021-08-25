import { useState } from "react";
import { useRouter } from "next/router";

import { useRequest } from "../../hooks/use-request";

const Signup = () => {
  const router = useRouter();
  const onSuccess = () => router.push("/");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const onSubmit = async (event) => {
    event.preventDefault();
    const { response, errors } = await useRequest(
      "/api/users/signup",
      "post",
      {
        email,
        password,
      },
      onSuccess
    );
    setErrors(errors);
  };
  return (
    <form onSubmit={onSubmit} className="mt-5">
      <h1>Sign Up</h1>
      {errors && errors.length > 0 && (
        <div className="alert alert-danger mt-2">
          <ul className="my-0">
            {errors.map((err) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="form-group">
        <label>Email Address</label>
        <input
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button className="btn btn-primary mt-3">Sign Up</button>
    </form>
  );
};

export default Signup;

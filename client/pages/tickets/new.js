import React, { useState } from "react";
import { useRequest } from "../../hooks/use-request";

const NewTicket = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [errs, setErrs] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    const { response, errors } = await useRequest(
      "/api/tickets",
      "post",
      { title, price },
      () => {
        setErrs([]);
        setTitle("");
        setPrice("");
        setIsSuccess(true);
      }
    );

    if (errors) setErrs(errors);
  };

  const onBlur = () => {
    const value = parseFloat(price);

    if (isNaN(value)) {
      return;
    }

    setPrice(value.toFixed(2));
  };

  return (
    <div>
      <h1>Create a Ticket</h1>
      {isSuccess && (
        <div className="alert alert-success mt-2">
          Create ticket successfully!
        </div>
      )}
      {errs && errs.length > 0 && (
        <div className="alert alert-danger mt-2">
          <ul className="my-0">
            {errs.map((err) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            value={price}
            onBlur={onBlur}
            onChange={(e) => setPrice(e.target.value)}
            className="form-control"
          />
        </div>

        <button className="btn btn-primary mt-2">Submit</button>
      </form>
    </div>
  );
};

export default NewTicket;

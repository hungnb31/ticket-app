import { useState } from "react";
import { useRequest } from "../../hooks/use-request";

const TicketShow = ({ ticket }) => {
  const [errors, setErrors] = useState([]);
  const handlePurchase = async () => {
    const { response, errors } = await useRequest(
      "/api/orders",
      "post",
      {
        ticketId: ticket.id,
      },
      (order) => {
        setErrors([]);
      }
    );

    setErrors(errors);
  };

  return (
    <div>
      {errors && errors.length > 0 && (
        <div className="alert alert-danger mt-2">
          <ul className="my-0">
            {errors.map((err) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      )}
      <h1>Ticket: {ticket.title}</h1>
      <h4>Price: ${ticket.price}</h4>
      <button onClick={handlePurchase} className="btn btn-primary">
        Purchase
      </button>
    </div>
  );
};

TicketShow.getInitialProps = async (context, client) => {
  const { ticketId } = context.query;

  const { data } = await client.get(`/api/tickets/${ticketId}`);

  return { ticket: data };
};

export default TicketShow;

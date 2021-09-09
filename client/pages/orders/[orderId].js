import Router from "next/router";
import { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";

import { useRequest } from "../../hooks/use-request";

const OrderShow = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState("");

  const callRequest = async (token) => {
    const { response, errors } = await useRequest(
      "/api/payments",
      "post",
      { orderId: order.id, token: token.id },
      (payment) => Router.push("/orders")
    );
  };

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [order]);

  if (timeLeft < 0) return <div>Order Expired!</div>;

  return (
    <div>
      You have {timeLeft} secs to purchase the order!
      <br />
      <StripeCheckout
        token={(token) => callRequest(token)}
        stripeKey="pk_test_51JWK1hIbjFgRnzr1okHk07gRoDBwvOoM9AiUG0bNL7cYFuaQabayXHF9BrEPzaS3UEL75PaDLHJU9ol3ChJOryyN00dHNbzJo5"
        amount={order.ticket.price * 100}
        email={currentUser.email}
      />
    </div>
  );
};

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);

  return { order: data };
};

export default OrderShow;

import React from "react";
import { Link } from "react-router-dom";
import {
  Elements,
  CardElement,
  ElementsConsumer,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import Review from "./Review";
const PaymentForm = ({ checkoutToken }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    console.log(cardElement);
  };
  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <CardElement />

        <button>
          <Link to={"/cart"}>Back to Cart</Link>
        </button>
        <button type="submit" disabled={!stripe}>
          Pay {checkoutToken.live.subtotal.formatted_with_symbol}
        </button>
      </form>
    </>
  );
};

export default PaymentForm;

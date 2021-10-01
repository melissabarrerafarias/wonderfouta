import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Elements,
  CardElement,
  ElementsConsumer,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import Review from "./Review";
import Confirmation from "./Confirmation";
const PaymentForm = ({ checkoutToken, handleOnCaptureCheckout }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [confirmed, setConfirmed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log(error);
    } else {
      const orderData = {
        line_items: checkoutToken.live.line_items,
        customer: {
          firstname: "Shelsy",
          lastname: "Barrera",
          email: "elainesbarrera@gmail.com",
        },
        shipping: {
          name: "Primary",
          street: "633 Sinclair Dr",
          town_city: "San Jose",
          county_state: "California",
          postal_zip_code: 95116,
          country: "United States",
        },
        fulfillment: {
          shipping_method: "something",
        },
        payment: {
          gateway: "stripe",
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      };

      handleOnCaptureCheckout(checkoutToken.id, orderData);
      setConfirmed(true);
    }
  };

  const paymentForm = () => {
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

  return <>{!confirmed ? paymentForm() : <Confirmation />}</>;
};

export default PaymentForm;

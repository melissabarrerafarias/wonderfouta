import React, { useEffect, useState } from "react";
import axios from "axios";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const Checkout = (props) => {
  const [items, setItems] = useState();
  const [total, setTotal] = useState();
  const [address, setAddress] = useState();
  const stripe = useStripe();
  const elements = useElements();

  const getProducts = () => {
    const subtotal = props.location.state.subtotal.raw;
    const allItems = props.location.state.line_items;
    setTotal(subtotal);
    setItems(allItems);
  };

  const onChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }
    console.log(items, total);
    e.preventDefault();
    try {
      const checkout = await axios.post("payment/create-payment-intent", items);
      console.log(checkout);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <h1>This is checkout</h1>

      <form
        onSubmit={(e) => {
          onSubmit(e);
        }}
      >
        <ul>
          <label>
            First Name:
            <input onChange={onChange} type="text" name="firstName" required />
          </label>
        </ul>
        <ul>
          <label>
            Last Name:
            <input onChange={onChange} type="text" name="lastName" required />
          </label>
        </ul>
        <ul>
          <label>
            Shipping Address:
            <input
              onChange={onChange}
              type="text"
              name="street"
              placeholder="street"
              required
            />
            <input
              onChange={onChange}
              type="text"
              name="city"
              placeholder="city"
              required
            />
            <input
              onChange={onChange}
              type="text"
              name="state"
              placeholder="state"
              required
            />
            <input
              onChange={onChange}
              type="text"
              name="postalCode"
              placeholder="postalCode"
              required
            />
          </label>
        </ul>

        <CardElement />
        <button type="submit" disabled={!stripe}>
          Pay
        </button>
      </form>
    </div>
  );
};

export default Checkout;

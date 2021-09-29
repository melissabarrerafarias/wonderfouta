import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { commerce } from "../../../lib/commerce";
import Review from "../Review";
import PaymentForm from "../PaymentForm";

const Checkout = ({cart}) => {
  //   const [items, setItems] = useState();
  //   const [total, setTotal] = useState();
  //   const [address, setAddress] = useState();
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [payment, goToPayment] = useState(false);

  //   const getProducts = () => {
  //     const subtotal = props.location.state.subtotal.raw;
  //     const allItems = props.location.state.line_items;
  //     setTotal(subtotal);
  //     setItems(allItems);
  //   };

  const onChange = (e) => {
    // setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    goToPayment(true);
  };

  const generateToken = async () => {
    try {
      const token = await commerce.checkout.generateToken(cart.id, {
        type: "cart",
      });
      setCheckoutToken(token);
    } catch (error) {
      console.log("token failed");
    }
  };

  useEffect(() => {
    // getProducts();
    
  }, []);

  useEffect(() => {
    generateToken();
  }, []);

  const shippingDetails = () => {
    return (
      <div>
        <h1>This is checkout!</h1>
        <form
          onSubmit={(e) => {
            onSubmit(e);
          }}
        >
          <ul>
            <label>
              First Name:
              <input
                onChange={onChange}
                type="text"
                name="firstName"
                required
              />
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

          <button type="submit">Go to Payment</button>
        </form>
      </div>
    );
  };

  return (
    <>{!payment ? shippingDetails() : <PaymentForm checkoutToken={checkoutToken} />}</>
  );
};

export default Checkout;

import React, { useEffect, useState } from "react";
import { commerce } from "../../../lib/commerce";
import PaymentForm from "../PaymentForm";

const Checkout = (props) => {
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

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(props?.items?.id, {
          type: "cart",
        });
        setCheckoutToken(token);
      } catch (error) {
        console.log("token failed: There are not items in the cart");
      }
    };
    generateToken();
  }, [props.items]);

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
    <>
      {!payment ? (
        shippingDetails()
      ) : (
        <PaymentForm
          checkoutToken={checkoutToken}
          handleOnCaptureCheckout={props.onCaptureCheckout}
          order={props.order}
          error={props.error}
        />
      )}
    </>
  );
};

export default Checkout;

import React, { useEffect, useState } from "react";

const Checkout = (props) => {
  const [items, setItems] = useState({});
  const [address, setAddress] = useState();

  const getProducts = () => {
    const subtotal = props.location.state.subtotal.raw;
    const itemsArr = props.location.state.line_items;
    itemsArr.forEach((item) => {
      console.log(item);
    });

    console.log(subtotal, items);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <h1>This is checkout</h1>

      <form>
        <ul>
          <label>
            First Name:
            <input type="text" name="fistName" />
          </label>
        </ul>
        <ul>
          <label>
            Last Name:
            <input type="text" name="lastName" />
          </label>
        </ul>
        <ul>
          <label>
            Contact:
            <input type="email" name="email" placeholder="email" />
            <input type="tel" name="phone" placeholder="phone" />
          </label>
        </ul>
        <ul>
          <label>
            Shipping Address:
            <input type="text" name="street" placeholder="street" />
            <input type="text" name="city" placeholder="city" />
            <input type="text" name="state" placeholder="state" />
            <input type="text" name="postalCode" placeholder="postalCode" />
          </label>
        </ul>

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Checkout;

import React, { useEffect, useState } from "react";

const Checkout = (props) => {
  const [items, setItems] = useState();
  const [total, setTotal] = useState();
  const [address, setAddress] = useState();

  const getProducts = () => {
    const subtotal = props.location.state.subtotal.raw;
    const allItems = props.location.state.line_items;
    setTotal(subtotal);
    setItems(allItems);
  };

  const onChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
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

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Checkout;

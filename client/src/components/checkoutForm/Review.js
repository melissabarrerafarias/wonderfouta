import React from "react";

const Review = ({ checkoutToken }) => {
  console.log(checkoutToken);
  return (
    <>
      <ul>
        {checkoutToken.live.line_items.map((product) => (
          <li key={product.name}>
            <img src={product.image.url} style={{ maxWidth: "100px" }} />
            Name: {product.name}
            Color: {product.selected_options[0].option_name}
            quantity: {product.quantity}
            Total: {product.line_total.formatted_with_symbol}
          </li>
        ))}
        <li>Subtotal: {checkoutToken.live.subtotal.formatted_with_symbol}</li>
      </ul>
    </>
  );
};

export default Review;

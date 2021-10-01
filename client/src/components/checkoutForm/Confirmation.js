import React from "react";

const Confirmation = ({ order, error }) => {
  if (error) {
    return <div>{error}</div>;
  }

  return order.customer ? <div>Confirmed</div> : <div>Loading...</div>;
};

export default Confirmation;

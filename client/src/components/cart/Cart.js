import React from "react";
import { Link } from "react-router-dom";
import CartItem from "./cartItem/CartItem";

function Cart({ cart, handleCartQty, handleRemoveFromCart, handleEmptyCart }) {
  const isEmpty = !cart.line_items?.length;

  const EmptyCart = () => {
    return (
      <div>
        <h1>You don't have any items in your cart!</h1>
        <Link to={"/Store"}>Start Shopping</Link>
      </div>
    );
  };



    const FilledCart = () => {
        return (
            <div>
                {cart.line_items.map((item) => (
                    <div key={item.id}>
                        <CartItem item={item} onUpdateCartQty={handleCartQty} onRemoveFromCart={handleRemoveFromCart} />
                    </div>
                ))}
                <div>
                    <h1>Subtotal: {cart.subtotal.formatted_with_symbol}</h1>
                </div>
                <div>
                    <button onClick={handleEmptyCart}>Empty Cart</button>
                    <button><Link to={'/Checkout'}>Checkout</Link></button>
                </div>
            </div>
        )
    }

  

  return (
    <div>
      <h1>Your Cart</h1>
      {isEmpty ? <EmptyCart /> : <FilledCart />}
    </div>
  );
}

export default Cart;

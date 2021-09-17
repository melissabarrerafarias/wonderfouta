import React, { } from 'react';

function Cart({ cart }) {

    // console.log(cart.line_items?.length)
    const isEmpty = !cart.line_items?.length

    const EmptyCart = () => {
        return (
            <div>
                <h1>You don't have any items in your cart!</h1>
            </div>
        )
    }

    const FilledCart = () => {
        return (
            <div>
                {cart.line_items.map((item) => (
                    <div key={item.id}>
                        <p>{item.name}</p>
                    </div>
                ))}
                <div>
                    <h1>Subtotal: {cart.subtotal.formatted_with_symbol}</h1>
                </div>
                <div>
                    <button>Empty Cart</button>
                    <button>Checkout</button>
                </div>
            </div>
        )
    }

    return (
        <div>
            <h1>Your Cart</h1>
            {isEmpty ? <EmptyCart /> : <FilledCart />}
        </div>
    )
};

export default Cart;
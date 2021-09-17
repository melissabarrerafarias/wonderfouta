import React from 'react';

function CartItem({ item }) {
    return (
        <div>
            <img style={{ maxWidth: '200px' }} src={item.media.source}></img> {/* item image optional */}
            <div>
                <h1>{item.name}</h1>
                <h2>{item.line_total.formatted_with_symbol}</h2> {/* item price */}
            </div>
            <div>
                <button type="button">-</button>
                <p>{item.quantity}</p>
                <button type="button">+</button>
            </div>
            <button type="button">Remove</button>
        </div>
    )
}

export default CartItem;
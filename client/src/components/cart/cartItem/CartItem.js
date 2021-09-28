import React, { useState, useEffect } from 'react';
// import { commerce } from '../../../lib/commerce';

function CartItem({ item, onUpdateCartQty, onRemoveFromCart }) {
    const itemInventory = item.variant.inventory;
    
    const [disabled, setDisabled] = useState(false); 

    function checkQty() {
        if (itemInventory <= item.quantity) {
            setDisabled(true)
        }
    }

    useEffect(() => {
        checkQty();
    }, [])
    
    return (
        <div>
            <img style={{ maxWidth: '200px' }} src={item?.variant.assets[0].url}></img> {/* item image optional */}
            <div>
                <a href={`/Store/${item?.product_id}`}>{item.name}</a>
                <h2>{item.line_total?.formatted_with_symbol}</h2> {/* item price */}
            </div>
            <div>
                <button type="button" onClick={() => onUpdateCartQty(item.id, item.quantity - 1)}>-</button>
                <p>{item.quantity}</p>
                <button disabled={disabled} type="button" onClick={() => onUpdateCartQty(item.id, item.quantity + 1)} >+</button>
            </div>
            <button type="button" onClick={() => onRemoveFromCart(item.id)}>Remove</button>
        </div>
    )
}

export default CartItem;
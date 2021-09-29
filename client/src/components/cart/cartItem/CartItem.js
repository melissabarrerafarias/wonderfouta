import React, { useState, useEffect } from 'react';

{/* props passed in from Cart.js */}
function CartItem({ item, onUpdateCartQty, onRemoveFromCart }) { 
    // the stock of the towel
    const itemInventory = item.variant.inventory; 
    
    // setting the state of the button to add more towels in the JSX. Initially it is set to 'false', so user can use button
    // to increase the quantity. 
    const [disabled, setDisabled] = useState(false); 

    function checkQty() {
        // if the quantity the user is choosing is greater than or equal to the the amount in stock we are going to 
        // disable the button so user can no longer add
        if (itemInventory <= item.quantity) {
            setDisabled(true)
        }
    }

    useEffect(() => {
        checkQty();
    }, []) // runs this function on page load. Everytime user increases or decreases, page does a reload and this 
        // condition is checked
    
    return (
        <div>
            {/* towel image */}
            <img style={{ maxWidth: '200px' }} src={item?.variant.assets[0].url}></img> 

            <div>
                {/* towel name and link to product page. */}
                <a href={`/Store/${item?.product_id}`}>{item.name}</a>

                {/* towel price */}
                <h2>{item.line_total?.formatted_with_symbol}</h2> 
            </div>

            <div>
                {/* button decrease towel quantity by 1 */}
                <button type="button" onClick={() => onUpdateCartQty(item.id, item.quantity - 1)}>-</button>

                <p>{item.quantity}</p>

                {/* button to increase towel quantity by 1 */}
                <button disabled={disabled} type="button" onClick={() => onUpdateCartQty(item.id, item.quantity + 1)} >+</button>
            </div>

            {/* button to remove towel from cart completely */}
            <button type="button" onClick={() => onRemoveFromCart(item.id)}>Remove</button>
        </div>
    )
}

export default CartItem;
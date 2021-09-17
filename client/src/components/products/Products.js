import React from 'react';
import Towel from '../towel/Towels'; 

function Products({ products, onAddToCart, totalItems }) {

    return (
        <main>
            <button>Cart {totalItems}</button>{/* button at top of the page to represent cart icon */}
            <div>
            {products.map((product) => (
                <div key = {product.id}>
                    <Towel product={product} onAddToCart={onAddToCart}/>
                </div>
            ))}
            </div>
        </main>
    )
};

export default Products;
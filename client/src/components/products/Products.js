import React from 'react';

import Towel from '../towel/Towels'; 

function Products({ products, onAddToCart }) {

    return (
        <main>
            <button>Cart</button>
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
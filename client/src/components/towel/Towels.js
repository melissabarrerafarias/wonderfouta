import React from 'react';

function Towel({ product, onAddToCart }) {
    return (
        <div>
            <img src={product.media.source} style={{ maxWidth: '200px' }}></img>
            <h1>{product.name}</h1>
            <h3>{product.price.formatted_with_symbol}</h3>
            <p dangerouslySetInnerHTML={{ __html: product.description }}></p>
            <button onClick={() => onAddToCart(product.id, 1)}>Add to Cart</button>{/*functionality to add to cart */}
        </div>
    )
};

export default Towel; 
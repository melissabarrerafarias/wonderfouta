import React, { Link } from 'react';

function Towel({ product, onAddToCart }) {

    return (
            <div id={product.id}>
                <img src={product.media.source} style={{ maxWidth: '200px' }}></img>
                <a href={`/products/${product.id}`}>{product.name}</a>
                <h3>{product.price.formatted_with_symbol}</h3>
                <p dangerouslySetInnerHTML={{ __html: product.description }}></p>
                <button onClick={() => onAddToCart(product.id, 1)}>Add to Cart</button>{/*functionality to add to cart */}
            </div>
    )
};

export default Towel;
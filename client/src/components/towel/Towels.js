import React from 'react';

function Towel({ product }) {
    
    return (
            <div id={product.id}>
                <img src={product.media.source} style={{ maxWidth: '200px' }}></img>
                <a href={`/Store/${product.id}`}>{product.name}</a>
            </div>
    )
};

export default Towel;
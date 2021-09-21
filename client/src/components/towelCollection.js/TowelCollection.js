import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { commerce } from '../../lib/commerce';

function TowelCollection({ onAddToCart }) {
    const { id: productId } = useParams(); // id = productId

    const [singleProduct, setSingleProduct] = useState([]);

    const retrieveSingleProduct = async () => {
        const singleProduct = await commerce.products.retrieve(productId);
        setSingleProduct(singleProduct)
    }

    useEffect(() => {
        retrieveSingleProduct();
    }, [])

    console.log(singleProduct)
    console.log(singleProduct.assets)

    let assets = singleProduct.assets
    console.log(assets)

    if (!singleProduct) {
        return (
            <div>Loading...</div>
        )
    }
    
    return (
        <div>
            <p>hi this is where a single towel collection is gonna go</p>
            <div>
                <img src={singleProduct.media?.source}></img>
                <p>{singleProduct.name}</p>
                <h3>{singleProduct.price?.formatted_with_symbol}</h3>
                <p dangerouslySetInnerHTML={{ __html: singleProduct.description }}></p>
                <button onClick={() => onAddToCart(singleProduct.id, 1)}>Add to Cart</button>{/*functionality to add to cart */}
            </div>
            <div>
                {assets?.slice(1).map((variant) => ( // slice gets rid of first element
                    <div key={variant.id}>
                        <img src={variant.url} />
                    </div>
                ))}
            </div>
        </div>
    )
};

export default TowelCollection;
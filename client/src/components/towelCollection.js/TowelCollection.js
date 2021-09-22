import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { commerce } from '../../lib/commerce';

function TowelCollection({ onAddToCart }) {
    const { id: productId } = useParams(); // id = productId (from parameters)

    const [collection, setCollection] = useState([]); // getting all data

    const [selectedProduct, setSelectedProduct] = useState({}); // setting initial image on page load but changing onClick to selected image

    const retrieveProductVariants = async () => {
        const { data } = await commerce.products.getVariants(productId);
        setCollection(data);
        setSelectedProduct({
            img: data[1]?.assets[0].url,
            id: data[1]?.id,
            description: data[1]?.description,
            price: data[1].price?.formatted_with_symbol
        })
    } // setting state to specific collection variants 

    const displaySingleProduct = async (e) => {
        setSelectedProduct(
            { img: e.target.src, id: e.target.id, description: e.target.dataset.description, price: e.target.dataset.price }
        )
    } // setting selected product state to selected product 

    useEffect(() => {
        retrieveProductVariants();
    }, []) // retrieving data on page load ^
    // console.log(collection[0].options)
    return (
        <div>
            <div>
                <img src={selectedProduct.img}></img>
                <h3>{selectedProduct.price}</h3>
                <p dangerouslySetInnerHTML={{ __html: selectedProduct.description }}></p>
                <button onClick={() => onAddToCart(productId, 1, selectedProduct.id)}>Add to Cart</button>{/*functionality to add to cart */}
            </div>
            <div>
                {collection?.map((variant) => (
                    <div onClick={(e) => displaySingleProduct(e)} key={variant?.id} >
                        <img src={variant?.assets[0].url}
                            id={variant?.id}
                            data-description={variant?.description}
                            data-price={variant.price?.formatted_with_symbol}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
};

export default TowelCollection;
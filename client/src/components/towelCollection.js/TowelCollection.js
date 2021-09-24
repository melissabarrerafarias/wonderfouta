import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { commerce } from '../../lib/commerce';

function TowelCollection({ onAddToCart }) {
    const { id: productId } = useParams(); // id = productId (from parameters)

    const [collection, setCollection] = useState([]); // all data

    const [towelNames, setTowelNames] = useState([]); // name/color data (comes in different response that rest of data ^)

    const [selectedProduct, setSelectedProduct] = useState({}); // changing onClick to selected image

    const [quantity, setQuantity] = useState('1');

    function updateDesiredQuantity(e) {
        setQuantity(e.target.value)
    }

    const retrieveName = async () => { // name data to set in state
        const product = await commerce.products.retrieve(productId);
        let names = product.variant_groups[0].options;
        setTowelNames(names);
    }

    const retrieveProductVariants = async () => { // setting state to specific collection variants 
        const { data } = await commerce.products.getVariants(productId);
        // console.log(data) // in data we find INVENTORY (can be used for later as 'stock')
        setCollection(data);
        setSelectedProduct({ //setting initial image on page load
            img: data[1]?.assets[0].url,
            id: data[1]?.id,
            description: data[1]?.description,
            price: data[1].price?.formatted_with_symbol
        })
    }

    const displaySingleProduct = async (e) => { // setting selected product state to selected product
        setSelectedProduct(
            { img: e.target.src, id: e.target.id, description: e.target.dataset.description, price: e.target.dataset.price, stock: e.target.dataset.stock }
        )
    }

    useEffect(() => {
        retrieveProductVariants();
        retrieveName();
    }, []) // retrieving data on page load ^

    console.log(selectedProduct)

    // const LowStock = () => {
    //     if (selectedProduct.stock < 3) {
    //         return (

    //         )
    //     }
    // }

    return (
        <div>
            {/* selected towel */}
            <div>
                <img src={selectedProduct.img}></img>
                <h3>{selectedProduct.price}</h3>
                {selectedProduct.stock < 3 &&
                    <div>
                        <p>Only {selectedProduct.stock} left in stock!</p>
                    </div>
                }
                <p dangerouslySetInnerHTML={{ __html: selectedProduct.description }}></p>
                <input placeholder="Quantity" value={quantity} onChange={updateDesiredQuantity}></input>
                <button type="submit" onClick={() => { onAddToCart(productId, quantity, selectedProduct.id); setQuantity('1') }}>Add to Cart</button>{/*functionality to add to cart */}
            </div>

            {/* all towels styles */}
            <div>
                {collection?.map((variant, index) => (
                    <div onClick={(e) => displaySingleProduct(e)} key={variant?.id} >
                        <img src={variant?.assets[0].url}
                            id={variant?.id}
                            data-description={variant?.description}
                            data-price={variant.price?.formatted_with_symbol}
                            data-stock={variant.inventory}
                        />
                        {towelNames[index]?.name} {/* shows towel name/color */}
                    </div>
                ))}
            </div>
        </div>
    )
};

export default TowelCollection;
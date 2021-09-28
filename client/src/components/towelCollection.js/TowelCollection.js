import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { commerce } from '../../lib/commerce';

function TowelCollection({ onAddToCart }) {
    const { id: productId } = useParams(); // id = productId (from parameters)
    const [collection, setCollection] = useState([]); // all data
    const [towelNames, setTowelNames] = useState([]); // name/color data (comes in different response that rest of data ^)
    const [selectedProduct, setSelectedProduct] = useState({}); // changing onClick to selected image
    const [quantity, setQuantity] = useState('1');
    const outOfStock = selectedProduct.stock == 0; // check to see if inventory is empty
    const isLowStock = selectedProduct.stock < 3 && selectedProduct.stock > 0; // check to see if inventory is less than 3 but more than 0

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
            price: data[1].price?.formatted_with_symbol,
            stock: data[1]?.inventory
        })
    }

    const displaySingleProduct = async (e) => { // setting selected product state to selected product
        const stockNum = parseInt(e.target.dataset.stock); // need to make number integer to compare properly
        setSelectedProduct(
            { img: e.target.src, id: e.target.id, description: e.target.dataset.description, price: e.target.dataset.price, stock: stockNum }
        )
    }

    const LowStock = () => {
        return (
            <div>
                <p style={{ color: 'red' }}>Only {selectedProduct.stock} left in stock!</p>
            </div>
        )
    }
    const EmptyStock = () => {
        return (
            <div>
                <p style={{ color: 'red' }}>Out of stock!</p>
            </div>
        )
    }

    useEffect(() => {
        retrieveProductVariants();
        retrieveName();
    }, []) // retrieving data on page load ^

    // console.log(collection)
    return (
        <div>
            {/* selected towel */}
            <div>
                <img src={selectedProduct.img}></img> 
                <h3>{selectedProduct.price}</h3>

                {outOfStock && <EmptyStock />}

                {isLowStock && <LowStock />}

                <p dangerouslySetInnerHTML={{ __html: selectedProduct.description }}></p>

                {quantity > selectedProduct.stock && selectedProduct.stock > 0 &&
                <p style={{ color: 'red' }}>Sorry! We only have {selectedProduct.stock} available!</p>
                } {/* message if user tries to put too many towels */}

                <input type="number" min="1" max={selectedProduct.stock} placeholder='Qty' value={quantity} onChange={updateDesiredQuantity}></input>

                {(selectedProduct.stock > 0 && quantity <= selectedProduct.stock)
                    && <button type="submit" onClick={() => { onAddToCart(productId, quantity, selectedProduct.id); setQuantity('1') }}>Add to Cart</button>
                } 
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
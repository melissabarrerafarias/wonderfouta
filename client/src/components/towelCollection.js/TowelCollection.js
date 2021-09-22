import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { commerce } from '../../lib/commerce';

function TowelCollection({ onAddToCart }) {
    const { id: productId } = useParams(); // id = productId (from parameters)

    const [collection, setCollection] = useState([]); // getting all data

    const [selectedProduct, setSelectedProduct] = useState({
        img: "https://cdn.chec.io/merchants/33461/assets/D5TD6zDyjFlWX5hS%7CArthur%20Fouta%20NutmegAndBlack.jpg", 
        id: "vrnt_L1vOoZPbQplRa8", 
        description: "Arthur Fouta Nutmeg / black stripes Dimensions: 40x80 inches Content: 100% cotton Weight: 0.93 oz Our chic and modern personal size fouta's  are the perfect addition for your busy life. The fouta with all of its many uses is not only eco-friendly,  super absorbent,  and lightweight  as a towel, but when heading to the beach(it does not retain sand), poolside, as a lightweight traveling blanket,  a quick and stylish shawl , and another FUN FACT:  5 fouta's can fit in the same space as 1 terrycloth towel", 
        price: "$32.00"
    }); // setting initial image on page load but changing onClick to selected image

    const retrieveProductVariants = async () => {
        const { data } = await commerce.products.getVariants(productId);
        setCollection(data);
    } // setting state to specific collection variants 

    const displaySingleProduct = async (e) => {
        setSelectedProduct(
            { img: e.target.src, id: e.target.id, description: e.target.dataset.description, price: e.target.dataset.price }
        )
    } // setting selected product state to selected product 

    useEffect(() => {
        retrieveProductVariants();
    }, []) // retrieving data on page load ^
    console.log(collection)

    return (
        <div>
            <div>
                <img src={selectedProduct.img}></img>
                <h3>{selectedProduct.price}</h3>
                <p dangerouslySetInnerHTML={{ __html: selectedProduct.description }}></p>
                <button onClick={() => onAddToCart(selectedProduct.id, 1)}>Add to Cart</button>{/*functionality to add to cart */}
            </div>
            <div>
                {collection?.map((variant) => (
                    <div onClick={(e) => displaySingleProduct(e)} key={variant.id} >
                        <img src={variant.assets[0].url}
                            id={variant.id}
                            data-description={variant.description}
                            data-price={variant.price.formatted_with_symbol}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
};

export default TowelCollection;
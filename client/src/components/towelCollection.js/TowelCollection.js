import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { commerce } from '../../lib/commerce';

import TowelVariant from './towelVariant';

function TowelCollection({ onAddToCart }) {
    const { id: productId } = useParams(); // id = productId (from parameters)

    const [collection, setCollection] = useState([]); // getting all data

    const [towelNames, setTowelNames] = useState([]);

    const [selectedProduct, setSelectedProduct] = useState({}); // setting initial image on page load but changing onClick to selected image

    const retrieveName = async () => {
        const product = await commerce.products.retrieve(productId);
        let names = product.variant_groups[0].options;
        setTowelNames(names);
    }

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
        retrieveName();
    }, []) // retrieving data on page load ^

    // console.log(collection)s
    // console.log(towelNames)

    // const arrayOfData = collection.map(towel => {
    //     return {
    //         ...towel, 
    //         name: towelNames.find(optionId => option.id === collection.options )
    //     }
    // })

    return (
        // <div> 
        //     <TowelName collection={collection} towelName={towelNames}/>
        // </div>
        <div>
            <div>
                <img src={selectedProduct.img}></img>
                <h3>{selectedProduct.price}</h3>
                <p dangerouslySetInnerHTML={{ __html: selectedProduct.description }}></p>
                <button onClick={() => onAddToCart(productId, 1, selectedProduct.id)}>Add to Cart</button>{/*functionality to add to cart */}
            </div>
            <div>

                {collection?.map((variant, index) => (
                    <div onClick={(e) => displaySingleProduct(e)} key={variant?.id} >
                        <img src={variant?.assets[0].url}
                            id={variant?.id}
                            data-description={variant?.description}
                            data-price={variant.price?.formatted_with_symbol}
                        />
                        {towelNames[index].name}
                    </div>
                ))}
            </div>
        </div>
    )
};

export default TowelCollection;
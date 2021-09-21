import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { commerce } from '../../lib/commerce';

function TowelCollection({ onAddToCart }) {
    const { id: productId } = useParams(); // id = productId

    const [singleProduct, setSingleProduct] = useState([]);

    const [selectedProduct, setSelectedProduct] = useState({ id: undefined, img: 'https://cdn.chec.io/merchants/33461/assets/D5TD6zDyjFlWX5hS|Arthur Fouta NutmegAndBlack.jpg' }); 

    const retrieveProductVariants = async () => {
        const productVariants = await commerce.products.getVariants(productId);
        console.log(productVariants);
      }

    const retrieveSingleProduct = async () => {
        const singleProduct = await commerce.products.retrieve(productId);
        setSingleProduct(singleProduct)
    }

    // const displaySingleProduct = async (e) => {
    //     setSelectedProduct({ img: e.target.src })
    //     console.log(e.target)
    // }

    useEffect(() => {
        retrieveSingleProduct();
        retrieveProductVariants();
    }, [])

    // let assets = singleProduct.assets
    // console.log(singleProduct)
    return (
        <div> hi </div>
        // <div>
        //     <p>hi this is where a single towel collection is gonna go</p>
        //     <div>
        //         <img src={selectedProduct.img}></img>
        //         <p>{singleProduct.name}</p>
        //         <h3>{singleProduct.price?.formatted_with_symbol}</h3>
        //         <p dangerouslySetInnerHTML={{ __html: singleProduct.description }}></p>
        //         <button onClick={() => onAddToCart(selectedProduct.id, 1)}>Add to Cart</button>{/*functionality to add to cart */}
        //     </div>
        //     <div>
        //         {assets?.map((variant) => (
        //             <div onClick={(e) => displaySingleProduct(e)} key={variant.id} >
        //                 <img src={variant.url} id={variant.id} />
        //             </div>
        //         ))}
        //     </div>
        // </div>
    )
};

export default TowelCollection;
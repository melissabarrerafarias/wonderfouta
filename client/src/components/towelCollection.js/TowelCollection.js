import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { commerce } from '../../lib/commerce';

function TowelCollection() {
    const { id: productId } = useParams(); // id = productId

    const [singleProduct, setSingleProduct] = useState([]);

    const retrieveSingleProduct = async () => {
        const singleProduct = await commerce.products.retrieve(productId);
        setSingleProduct(singleProduct)
    }

    useEffect(() => {
        retrieveSingleProduct();
    }, [])

    return (
        <div>
            <p>hi this is where a single towel collection is gonna go</p>
            <p>{singleProduct.name}</p>
        </div>
    )
};

export default TowelCollection;
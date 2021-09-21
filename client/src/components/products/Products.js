import React from 'react';
import Towel from '../towel/Towels';
import { Link } from 'react-router-dom';

function Products({ products, onAddToCart, totalItems }) {
    // console.log(products[0].variant_groups[0].options[1].name)
    // map through variant groups to display all variants
    return (
        <main>

            <button><Link to={'/cart'}>Cart{totalItems}</Link></button>{/* button at top of the page to represent cart icon */}
            <div>
                {products.map((product) => (
                    <div key={product.id}>
                        <Towel product={product} onAddToCart={onAddToCart} />
                    </div>
                ))}
            </div>
        </main>
    )
};

export default Products;
import React from 'react';
import Towel from '../towel/Towels';
import { Link } from 'react-router-dom';

function Products({ products, totalItems }) {
    return (
        <main>
            <button><Link to={'/cart'}>Cart{totalItems}</Link></button>{/* button at top of the page to represent cart icon */}
            <div>
                {products.map((product) => (
                    <div key={product.id}>
                        <Towel product={product} />
                    </div>
                ))}
            </div>
        </main>
    )
};

export default Products;
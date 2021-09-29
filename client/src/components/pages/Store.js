import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
// components
import Footer from '../Footer';
import Navbar from '../Navbar';
import Towel from '../towel/Towels';



function Store({ products, totalItems }) {
    console.log(products)
    return (
        <>
            <main>
                <Navbar />
                <button><Link to={'/cart'}>Cart{totalItems}</Link></button>{/* button at top of the page to represent cart icon */}
                <div>
                    {products.map((product) => (
                        <div key={product.id}>
                            <Towel product={product} />
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </>
    );
}

export default Store;
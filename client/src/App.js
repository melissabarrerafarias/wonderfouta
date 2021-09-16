import React, { useState, useEffect } from 'react';
import { commerce } from './lib/commerce';

// components and pages 
import Products from './components/products/Products';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();// get product list from commerce
    setProducts(data) //set the state
  }

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve()); 
  }

  const AddToCart = async (productId, quantity) => {
    const addedProduct = await commerce.cart.add(productId, quantity); 

    setCart(addedProduct.cart)
  } 

  useEffect(() => {
    fetchProducts(); 
    fetchCart(); 
  }, [])

  console.log(cart)
  return (
    <div>
      E-commerce
      <Products products={products} onAddToCart={AddToCart}/>
    </div>
  );
}

export default App;

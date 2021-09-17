import React, { useState, useEffect } from 'react';
import { commerce } from './lib/commerce';

// components and pages 
import Products from './components/products/Products';
import Cart from './components/cart/Cart'; 

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();// get product list from commerce js
    setProducts(data) //set the state
  }

  const fetchCart = async () => {
    const cart = await commerce.cart.retrieve();
    setCart(cart); //get cart info from commerce js
  }

  const AddToCart = async (productId, quantity) => {
    const addedProduct = await commerce.cart.add(productId, quantity);
    setCart(addedProduct.cart)
  }

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, [])

  // console.log(cart)
  
  return (
    <div>
      E-commerce
      {/* <Products products={products} onAddToCart={AddToCart} totalItems = {cart.total_items}/> totalItems can be props for NavBar in the future */}
      <Cart cart={cart}/>
    </div>
  );
}

export default App;

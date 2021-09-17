import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { commerce } from './lib/commerce';

// components and pages 
import Products from './components/products/Products';
import Cart from './components/cart/Cart';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const fetchProducts = async () => { // get product list from commerce js and set state
    const { data } = await commerce.products.list();
    setProducts(data) //set the state
  }

  const fetchCart = async () => { //get cart info from commerce js and set state
    const cart = await commerce.cart.retrieve();
    setCart(cart);
  }

  const AddToCart = async (productId, quantity) => {
    const addedProduct = await commerce.cart.add(productId, quantity);
    setCart(addedProduct.cart)
  }

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, [])

  return (
    <Router>
      <div>
        E-commerce {/* this line can be <NavBar /> and have totalItems passed in as props (if checkout is on navbar) */}
        <Switch>
          <Route exact path="/"><Products products={products} onAddToCart={AddToCart} totalItems={cart.total_items} /></Route> {/* totalItems can be props for NavBar in the future */}
          <Route exact path="/cart"><Cart cart={cart} /></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { commerce } from './lib/commerce';

// components and pages 
import Products from './components/products/Products';
import Cart from './components/cart/Cart';
import TowelCollection from './components/towelCollection.js/TowelCollection';
import './App.css';
// import Navbar from './componets/Navbar';


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

  const handleCartQty = async (productId, quantity) => {
    const updated = await commerce.cart.update(productId, { quantity });
    setCart(updated.cart)
  }

  const handleRemoveFromCart = async (productId) => {
    const removedItem = await commerce.cart.remove(productId);
    setCart(removedItem.cart)
  }

  const handleEmptyCart = async () => {
    const emptyCart = await commerce.cart.empty();
    setCart(emptyCart);
  }

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, [])


  return (
    <Router>
      <div>
        {/* <Navbar/>  */}
        {/* this line can be <NavBar /> and have totalItems passed in as props (if checkout is on navbar) */}
        <Switch>
          <Route exact path='/'><button><Link to={'/products'}>Click me</Link></button></Route>{/* just to simulate home page */}
          <Route exact path="/products">
            <Products products={products} totalItems={cart.total_items} />
          </Route> {/* totalItems can be props for NavBar in the future */}

          <Route exact path="/cart">
            <Cart cart={cart}
              handleCartQty={handleCartQty}
              handleRemoveFromCart={handleRemoveFromCart}
              handleEmptyCart={handleEmptyCart} />
          </Route>
          <Route exact path="/products/:id">
            <TowelCollection onAddToCart={AddToCart}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

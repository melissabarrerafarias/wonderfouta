import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { commerce } from "./lib/commerce";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// components and pages
// import Products from './components/products/Products';
import Cart from "./components/cart/Cart";
import TowelCollection from "./components/towelCollection.js/TowelCollection";

import "./App.css";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Store from "./components/pages/Store";
import WholeSale from "./components/pages/WholeSale";
import Contact from "./components/pages/Contact";
import Login from "./components/pages/Login";
import Checkout from "./components/checkoutForm/Checkout/Checkout";

function App() {
  const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_KEY
  );
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    // get product list from commerce js and set state
    const { data } = await commerce.products.list();
    setProducts(data); //set the state
  };

  const fetchCart = async () => {
    //get cart info from commerce js and set state
    const cart = await commerce.cart.retrieve();
    setCart(cart);
  };

  const AddToCart = async (productId, quantity, variantId) => {
    const addedProduct = await commerce.cart.add(
      productId,
      quantity,
      variantId
    );
    setCart(addedProduct.cart);
  };

  const handleCartQty = async (productId, quantity) => {
    const updated = await commerce.cart.update(productId, { quantity });
    setCart(updated.cart);
  };

  const handleRemoveFromCart = async (productId) => {
    const removedItem = await commerce.cart.remove(productId);
    setCart(removedItem.cart);
  };

  const handleEmptyCart = async () => {
    const emptyCart = await commerce.cart.empty();
    setCart(emptyCart);
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  };

  const handleRetailCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );
      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      setError(error.data.error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <Elements stripe={stripePromise}>
      <Router>
        <div>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/About" exact component={About} />
            <Route exact path="/Store">
              <Store products={products} totalItems={cart.total_items} />
            </Route>
            <Route path="/WholeSale" exact component={WholeSale} />
            <Route path="/Contact" exact component={Contact} />
            <Route path="/Login" exact component={Login} />

            <Route exact path="/cart">
              <Cart
                cart={cart}
                handleCartQty={handleCartQty}
                handleRemoveFromCart={handleRemoveFromCart}
                handleEmptyCart={handleEmptyCart}
              />
            </Route>

            <Route exact path="/Store/:id">
              <TowelCollection onAddToCart={AddToCart} />{" "}
              {/* link to specific towel */}
            </Route>
            <Route exact path="/Checkout">
              <Checkout
                items={cart}
                order={order}
                onCaptureCheckout={handleRetailCheckout}
                error={error}
              />
            </Route>
          </Switch>
        </div>
      </Router>
    </Elements>
  );
}

export default App;

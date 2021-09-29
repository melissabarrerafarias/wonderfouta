import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { commerce } from '../../lib/commerce';

function TowelCollection({ onAddToCart }) {
    // const productId = id from parameters. Now we can use 'productId' later to get specific product and its variants
    // for example, in retrieveProductVariants() and retrieveName()
    const { id: productId } = useParams();

    // setting all towel data (all variants from specific towel collection, e.g, Arthur Fouta, Gwen Fouta, etc.) from commerceJS to state
    // (retrieved from retrieveProductVariants() function)
    const [collection, setCollection] = useState([]);

    // setting name data to state (in our case name is the color of the towel, like 'name: Pink and Green')
    // (comes in different response that rest of data ^ for some reason, so it needed a different api call)
    // (retrieved by retrieveName() function)
    const [towelNames, setTowelNames] = useState([]);

    // changing the state of the selected product. User can click on the option of yellow towel and the image, description, price, etc will 
    // change to that of the yellow towel at the top of the page. State is changed in displaySingleProduct() function
    const [selectedProduct, setSelectedProduct] = useState({});

    // To add the product to the cart, we need the amount of the specific towel the user wants. 2 yellow towels, 1 red towel, 8 black towels...
    // The initial state is 1 because they shouldn't add 0 towels to the cart. State is changed in updateDesiredQuantity() function
    const [quantity, setQuantity] = useState('1');

    // variable is used later in the JSX to check if product is out of stock
    const outOfStock = selectedProduct.stock == 0;

    // variable is used later in the JSX to check if product stock is less than three but not out of stock ( greater than 0 )
    const isLowStock = selectedProduct.stock < 3 && selectedProduct.stock > 0;

    const retrieveProductVariants = async () => { // setting state to specific product variants 
        // destructure 'data' from response. In there we find all the towel data. (price, description, id, stock/inventory)
        const { data } = await commerce.products.getVariants(productId);

        // set the data to state and now we can use 'collection' in our JSX and display all the towels
        setCollection(data);

        // setting the state of the selected product to the towel at index 1 (corresponds to the one on /store page)
        // so automatically when page loads, user can see the towel they initially clicked on
        setSelectedProduct({ //setting initial image on page load
            img: data[1]?.assets[0].url,
            id: data[1]?.id,
            description: data[1]?.description,
            price: data[1].price?.formatted_with_symbol,
            stock: data[1]?.inventory
        })
    }

    const retrieveName = async () => {
        // Another API call to commerceJS because the data we have in 'collection' doesn't have the 'name'/color and we need that information
        // so we make a different request that comes with the name
        const product = await commerce.products.retrieve(productId);

        // destructure the names from the response and assign the value to 'names'
        let names = product.variant_groups[0].options;

        // set the 'names' to state and now we can use 'towelNames' in our JSX and display all the towels name/colors
        setTowelNames(names);
    }

    function updateDesiredQuantity(e) {
        // in the JSX, everytime the input value changes, it is set to the state and we can pass in 'quantity' 
        // to the addToCart function
        setQuantity(e.target.value)
    }

    const displaySingleProduct = async (e) => {
        // e.target.dataset.stock comes back as a string. We use parstInt to make it an integer
        // enabling us to compare it to the quantity correctly in the JSX
        const stockNum = parseInt(e.target.dataset.stock);

        // setting state to the towel user clicked on
        // We need the image so we can display it, the id so we can pass it in to the addToCart, the description to display, 
        // the price to display, and the stock to make sure its in stock 
        setSelectedProduct(
            { img: e.target.src, id: e.target.id, description: e.target.dataset.description, price: e.target.dataset.price, stock: stockNum }
        )
    }


    // warning message to user that the towel they selected is running out (used later in JSX)
    const LowStock = () => {
        return (
            <div>
                <p style={{ color: 'red' }}>Only {selectedProduct.stock} left in stock!</p>
            </div>
        )
    }

    // warning message to user that the towel they selected is no longer in stock (used later in JSX)
    const EmptyStock = () => {
        return (
            <div>
                <p style={{ color: 'red' }}>Out of stock!</p>
            </div>
        )
    }

    useEffect(() => {
        retrieveProductVariants();
        retrieveName();
    }, []) // runs these functions on page load

    return (
        <div>
            {/* selected towel */}
            <div>
                {/* the selected towel image */}
                <img src={selectedProduct.img}></img>

                {/* the selected towel price */}
                <h3>{selectedProduct.price}</h3>

                {/* if outOfStock is true display <EmptyStock/> message */}
                {outOfStock && <EmptyStock />}

                {/* if isLowStock is true display <LowStock/> message */}
                {isLowStock && <LowStock />}

                {/* the selected towel description */}
                {/* using just {selectedProduct.description} returns literally '<p>{selectedProduct.description}</p>' */}
                {/* so we use dangerouslySetInnerHtml to remove the <p></p> */}
                <p dangerouslySetInnerHTML={{ __html: selectedProduct.description }}></p>

                {/* if the quantity the user manually inserted is more than there is in stock AND the the towel isn't out of stock,
                display message to let the user know */}
                {quantity > selectedProduct.stock && selectedProduct.stock > 0 &&
                    <p style={{ color: 'red' }}>Sorry! We only have {selectedProduct.stock} available!</p>
                }

                {/* user can insert the quantity they want. Must be min of 1 and maximum of the towel stock */}
                <input type="number" min="1" max={selectedProduct.stock} placeholder='Qty' value={quantity} onChange={updateDesiredQuantity}></input>

                {/* if the selected towel stock is more than 0 AND the quantity the user inputted is less than or equal to 
                the amount of towels in stock, display button and allow them to add the towel and the amount they want to the cart */}
                {(selectedProduct.stock > 0 && quantity <= selectedProduct.stock)
                    && <button type="submit" onClick={() => { onAddToCart(productId, quantity, selectedProduct.id); setQuantity('1') }}>Add to Cart</button>
                }
            </div>

            {/* all towels styles */}
            <div>
                {/* For each towel in the array 'collection', display its image and hide in the html the towel information using the 
                data attribute. That way we have the information needed to change the state of the selected product in the
                displaySingleProduct() function */}
                {collection?.map((variant, index) => (
                    <div onClick={(e) => displaySingleProduct(e)} key={variant?.id} >
                        <img src={variant?.assets[0].url}
                            id={variant?.id}
                            data-description={variant?.description}
                            data-price={variant.price?.formatted_with_symbol}
                            data-stock={variant.inventory}
                        />
                        {towelNames[index]?.name}
                        {/* towelNames is another array, and we can't map through two arrays at once.. but we need the name information that 
                        collection doesn't have. So we use the 'index' parameter of the map function, which tells us the current index of the 
                        specific towel in the collection array, and use it to get the name of the towel in towelNames. If we are at 
                        collection[1] then we should also be at towelNames[1]. Collection[2], also towelNames[2].. and so forth. */}
                    </div>
                ))}
            </div>
        </div>
    )
};

export default TowelCollection;
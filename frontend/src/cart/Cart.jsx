import React, { useState,useEffect } from 'react';
import "./Cart.css";
import Header from '../Home/Header/Header';
import { useProduct } from '../ProductContext';

function Cart() {
  const { calculate, setCalculate } = useProduct();
  const [totalPrice, setTotalPrice] = useState();

  useEffect(() => {
    const newTotalPrice = Object.values(calculate).reduce((acc, item) => {
      const itemQuantity = item.quantity || 0; // Default quantity to 0 if undefined
      const itemPrice = item.price || 0; // Default price to 0 if undefined
      return acc + itemQuantity * itemPrice;
    }, 0);
    setTotalPrice(newTotalPrice);
  }, [calculate]);

  // Remove product from the cart
  const handleRemoveProduct = (index) => {
    setCalculate((prev) => {
      const updated = { ...prev }; // Copy the previous state
      const product = { ...updated[index] }; // Copy the product at the given index

      product.quantity -= 1; // Decrease the quantity

      if (product.quantity === 0) {
        delete updated[index]; // Remove the product if quantity reaches 0
      } else {
        updated[index] = product; // Update the product in the state
      }
      return updated;
    });
  };

  return (
    <div>
      <Header />
      <div className="cart__container">
        {Object.keys(calculate).length > 0 ? (
          Object.keys(calculate).map((index) => {
            const product = calculate[index];
            return (
              <div key={index} className="cart-item">
                <h5>{product.name}</h5>
                <p>{`Price: $ ${product.price}`}</p>
                <img src={product.image} alt={product.name} />
                <span>{`Quantity: ${product.quantity}`}</span>
                
                <button
                  onClick={() => handleRemoveProduct(index)}
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>
            );
          })
          
        ) : (
          <p>Your cart is empty</p>
        )}
        <span>{` | Total Price: $${totalPrice}`}</span>
        {console.log(totalPrice)}
        
      </div>
    </div>
  );
}

export default Cart;

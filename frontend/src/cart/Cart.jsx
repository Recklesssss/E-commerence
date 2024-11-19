import React from 'react';
import "./Cart.css"
import Header from '../Home/Header/Header';
import { useProduct } from '../ProductContext';

function Cart() {
  const { calculate, setCalculate } = useProduct();

  // Remove product from the cart
  const handleRemoveProduct = (index) => {
    setCalculate((prev) => {
      const updated = { ...prev };
      delete updated[index]; // Remove the product by index
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
                <h5>{product.name}</h5>  {/* Accessing the 'name' property of the product object */}
                <p>{product.price}</p>  {/* Accessing the 'price' property */}
                <img src={product.image} alt={product.name} />
                <span>Quantity: {product.quantity}</span> {/* Accessing the 'quantity' property */}
                <button onClick={() => handleRemoveProduct(index)} className="remove-btn">
                  Remove
                </button>
              </div>
            );
          })
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>
    </div>
  );
}

export default Cart;

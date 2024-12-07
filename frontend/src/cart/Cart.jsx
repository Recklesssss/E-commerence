import React, { useState, useEffect } from 'react';
import "./Cart.css";
import Header from '../Home/Header/Header';
import { useProduct } from '../ProductContext';
import axios from 'axios';

function Cart() {
  const { calculate, setCalculate, user_id, userName } = useProduct();
  const [totalPrice, setTotalPrice] = useState(0);
  const [productId, setProductId] = useState([]);
  const [message,setMessage] = useState("")

  // Effect to set product ids based on the calculate object
  useEffect(() => {
    const ids = Object.values(calculate).map((item) => item.product_id);
    setProductId(ids);
  }, [calculate]);

  // Effect to calculate the total price
  useEffect(() => {
    const newTotalPrice = Object.values(calculate).reduce((acc, item) => {
      const itemQuantity = item.quantity || 0; // Default quantity to 0 if undefined
      const itemPrice = item.price || 0; // Default price to 0 if undefined
      return acc + itemQuantity * itemPrice;
    }, 0);
    setTotalPrice(newTotalPrice);
  }, [calculate]);




  // Post Order function
  const postOrder = async () => {
    // Validate input
    if (!user_id) {
      alert("User ID is missing. Please log in.");
      return;
    }
    const orderItems = Object.values(calculate).map((item) => ({
      quantity: item.quantity,
      product_id:item.product_id,
    }));
    if (productId.length === 0) {
      alert("No products in the cart.");
      return;
    }

    try {
      const message = `New order placed by user ${userName} for a total of $${totalPrice}.`;
      setMessage(message);
      const notificationResponse = await axios.post("http://localhost:5000/postNotification",{ user_id,message:message,is_checked:false,});
      const productResponse = await axios.post("http://localhost:5000/postOrder", { user_id,orderItems,total:totalPrice });
      const getName = await axios.get(`http://localhost:5000/getName?id=${user_id}`);
      
      console.log(orderItems)
      console.log("Product order placed successfully:", productResponse.data);
      console.log("sucesss")
      alert("order added to the product successfully!");

      

    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place the order. Please try again.");
    }
  };

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
                <p>{`Price: $${product.price}`}</p>
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
        <div>
          <button onClick={postOrder} className="post-order-btn">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;

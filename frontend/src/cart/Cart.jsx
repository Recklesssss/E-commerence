import React, { useState, useEffect } from "react";
import "./Cart.css";
import Header from "../Home/Header/Header";
import { useProduct } from "../ProductContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Cart() {
  const { calculate, setCalculate, user_id, userName } = useProduct();
  const [totalPrice, setTotalPrice] = useState(0);
  const [productId, setProductId] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const ids = Object.values(calculate).map((item) => item.product_id);
    setProductId(ids);
  }, [calculate]);

  useEffect(() => {
    const newTotalPrice = Object.values(calculate).reduce((acc, item) => {
      const itemQuantity = item.quantity || 0;
      const itemPrice = item.price || 0;
      return acc + itemQuantity * itemPrice;
    }, 0);
    setTotalPrice(newTotalPrice);
  }, [calculate]);

  // Post Order function
  const postOrder = async () => {
    console.log("postOrder triggered");
    const orderItems = Object.values(calculate).map((item) => ({
      quantity: item.quantity,
      product_id: item.product_id,
    }));

    const message = `New order placed by ${userName} for $${totalPrice}.`;
    setMessage(message);

    // First API call to post order
    try {
      await axios.post("http://localhost:5000/postOrder", {
        user_id,
        orderItems,
        total: totalPrice,
      });
      toast.success("Order placed successfully!");
    } catch (error) {
      toast.error("Failed to place the order. Please try again.");
      return;
    }

    // Second API call to send notification
    try {
      await axios.post("http://localhost:5000/postNotification", {
        user_id,
        message,
        is_checked: false,
      });
      toast.success("Notification sent successfully!");
    } catch (error) {
      toast.error("Failed to send notification. Please check your settings.");
    }

    toast.info("Thank you for your purchase!");
  };

  // Remove product from the cart
  const handleRemoveProduct = (index) => {
    setCalculate((prev) => {
      const updated = { ...prev };
      const product = { ...updated[index] };

      product.quantity -= 1;

      if (product.quantity === 0) {
        delete updated[index];
      } else {
        updated[index] = product;
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
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default Cart;

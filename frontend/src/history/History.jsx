import React, { useState, useEffect } from "react";
import axios from "axios";
import "./History.css"; // Optional: Add CSS styles for better UI
import { useProduct } from "../ProductContext";

function History({ userId }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user_id } = useProduct();

  // Fetch order history
  
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/history/${user_id}`);
        setHistory(response.data); // Set the data to state
        console.log(response.data); // Debugging to verify the data
      } catch (err) {
        setError("Failed to fetch history. Please try again.");
        console.error("Error:", err); // Debugging
      } finally {
        setLoading(false);
      }
    };
  
    if (user_id) {
      fetchHistory(); // Call the function only if user_id is available
    }
  }, [user_id]); // Dependency on user_id  
  // Conditional Rendering
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (history.length === 0) return <p>No order history found.</p>;

  return (
    <div className="history-container">
      <h2>Order History</h2>
      <div className="history-list">
        {history.map((order, index) => (
          <div key={index} className="history-item">
            <p>
              <strong>Order ID:</strong> {order.order_id}
            </p>
            <p>
              <strong>Order Date:</strong> {new Date(order.order_date).toLocaleString()}
            </p>
            <p>
              <strong>Product ID:</strong> {order.product_id}
            </p>
            <p>
              <strong>Quantity:</strong> {order.quantity}
            </p>
            <p>
              <strong>Total:</strong> ${order.total.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default History;

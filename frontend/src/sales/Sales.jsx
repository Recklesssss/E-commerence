import axios from "axios";
import React, { useState, useEffect } from "react";
import Header from "../Home/Header/Header";
import "./Sales.css";
import { ToastContainer, toast } from "react-toastify"; // Import toast components
import "react-toastify/dist/ReactToastify.css";

function Sales() {
  const [toggleForm, setToggleForm] = useState(false);
  const [sale, setSale] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [productPicture, setProductPicture] = useState(null); // Use null for no file initially
  const [price, setPrice] = useState("");

  const PostSales = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("price", parseInt(price)); // Ensure price is a number
      if (productPicture) {
        formData.append("product_picture", productPicture);
      }
  
      // Post data to the backend
      const response = await axios.post("http://localhost:5000/postSales", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure proper headers
        },
      });
  
      setTitle("");
      setContent("");
      setPrice("");
      setProductPicture(null);
      fetchSalesData(); // Refresh sales data
      toast.success("Sales posted successfully!");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to post the sale. Please try again.";
      toast.error(errorMessage);
    }
  };
  

  const toggleFormFun = () => {
    setToggleForm((prev) => !prev);
  };

  const fetchSalesData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/sales");
      setSale(response.data);
    } catch (error) {
      console.error("Error fetching sales data:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchSalesData();
  }, []);

  return (
    <div className="final_sale">
      <Header />
      <div className="sale">
        <button onClick={toggleFormFun}>Post Sales</button>
        {toggleForm && (
          <div className="form_container_sale">
            <form onSubmit={PostSales}>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Enter product name"
                required
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setProductPicture(e.target.files[0])}
              />
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                placeholder="Enter a price"
                required
              />
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter product description"
                required
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        )}
        <div className="container_of_sales">
          <div className="sales_container">
            {sale.length > 0 ? (
              sale.map((item, index) => (
                <div key={index}>
                  <h3>{item.product_name}</h3>
                  <img
                    src={item.image || `http://localhost:5000/uploads/${item.product_picture}`}
                    alt={item.product_name}
                  />
                  <h5>{item.category}</h5>
                  <h5>${item.price}</h5>
                </div>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </div>
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

export default Sales;

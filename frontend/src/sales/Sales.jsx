import axios from "axios";
import React, { useState, useEffect } from "react";
import Header from "../Home/Header/Header";
import "./Sales.css";

function Sales() {
  const [toggleForm, setToggleForm] = useState(false);
  const [sale, setSale] = useState([]);

  const toggleFormFun = () => {
    setToggleForm((prev) => !prev);
  };

  const fetchSalesData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/sales");
      setSale(response.data);
    } catch (error) {
      console.error("Error fetching sales data:", error);
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
          <form>
            <input type="text" placeholder="Enter product name" />
            <input type="file"  alt="Upload" />
            <textarea placeholder="Enter product description"></textarea>
          </form>
        </div>
      )}
      <div className="container_of_sales">
        <div className="sales_container">
          {sale.length > 0 ? (
            sale.map((item, index) => (
              <div key={index}>
                <h3>{item.product_name}</h3>
                <img src={item.image} alt={item.product_name} />
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
    </div>
  );
}

export default Sales;

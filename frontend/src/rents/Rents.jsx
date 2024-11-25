import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Home/Header/Header";
import "./Rents.css";

function Rents() {
  const [toggleForm, setToggleForm] = useState(false);
  const [rent, setRent] = useState([]);

  const toggleFormFun = () => {
    setToggleForm((prev) => !prev);
  };

  const fetchRentData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/rents");
      setRent(response.data);
    } catch (error) {
      console.error("Error fetching rent data:", error);
    }
  };

  useEffect(() => {
    fetchRentData();
  }, []);

  return (
    <div className="final_rent">
      <Header />
      <div className="rent">
        <button onClick={toggleFormFun}>Post Rent</button>
        {toggleForm && (
          <div className="form_container_rent">
            <form>
              <input type="text" placeholder="Enter property name" />
              <input type="file" alt="Upload" />
              <textarea placeholder="Enter property description"></textarea>
            </form>
          </div>
        )}
        <div className="container_of_rents">
          <div className="rents_container">
            {rent.length > 0 ? (
              rent.map((item, index) => (
                <div key={index}>
                  <h3>{item.property_name}</h3>
                  <img src={item.image} alt={item.property_name} />
                  <h5>{item.category}</h5>
                  <h5>${item.price_per_month}</h5>
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

export default Rents;

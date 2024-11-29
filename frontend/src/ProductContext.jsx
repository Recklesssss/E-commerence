import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create Context
const ProductContext = createContext();

// Provider Component
export const ProductProvider = ({ children }) => {
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState("electronics");
  const [calculate, setCalculate] = useState({});
  const [user_id, setUser_id] = useState();
  const [countNotification,setCountNotification] = useState(0);
  const [userName, setUserName] = useState(() => localStorage.getItem("username") || "");

  // Fetch products based on category
  const fetchProduct = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getCatagories", {
        params: {
          categories: categories !== "All" ? categories : "All",
        },
      });
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetch user ID based on username
  const fetchUserId = async () => {
    try {
      if (!userName) {
        console.error("Cannot fetch user ID without username");
        return;
      }

      const response = await axios.get("http://localhost:5000/getUserId", {
        params: { name: userName },
      });
      setUser_id(response.data.user_id);
    } catch (error) {
      console.error(
        "Error fetching user ID:",
        error.response?.data?.error || error.message
      );
    }
  };

  // Automatically fetch user ID when username changes
  useEffect(() => {
    if (userName && !user_id) {
        fetchUserId(); // Fetch user ID if username exists and user_id is undefined
    }
}, [userName, user_id]);
useEffect(() => {
  console.log("UserName:", userName);
  console.log("User ID:", user_id);
}, [userName, user_id]);



  return (
    <ProductContext.Provider
      value={{
        product,
        setProduct,
        categories,
        setCategories,
        fetchProduct,
        calculate,
        setCalculate,
        user_id,
        setUser_id,
        userName,
        setUserName,
        fetchUserId,
        countNotification,
        setCountNotification,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  return useContext(ProductContext);
};

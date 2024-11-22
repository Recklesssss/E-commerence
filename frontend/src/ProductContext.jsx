import React, { createContext, useContext, useState } from "react";
import axios from "axios";

// Create Context
const ProductContext = createContext();

// Create a provider component
export const ProductProvider = ({ children }) => {
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState("electronics");
  const [calculate,setCalculate]=useState({})
  const [user_id,setUser_id] = useState()
  const [userName,setUserName] = useState("")

  const fetchProduct = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getCatagories", {
        params: {
          categories: categories !== "All" ? categories : 'All',
        },
      });
      setProduct(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchUserId = async () => {
    try {
        if (!userName) {
            console.error("Cannot fetch user ID without userName");
            return;
        }

        const response = await axios.get("http://localhost:5000/getUserId", {
            params: { name: userName },
        });

        setUser_id(response.data.user_id); // Use response.data.user_id
    } catch (error) {
        if (error.response && error.response.data) {
            console.error("Error:", error.response.data.error); // Show error from server
        } else {
            console.error("Unexpected error:", error);
        }
    }
};


  return (
    <ProductContext.Provider
      value={{ product, setProduct, categories, setCategories, fetchProduct , calculate,setCalculate ,user_id,setUser_id,userName,setUserName,fetchUserId}}
    >
      {children}
    </ProductContext.Provider>
  );
};   

export const useProduct = () => {
  return useContext(ProductContext);
};
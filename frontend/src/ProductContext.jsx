import React, { createContext, useContext, useState } from "react";
import axios from "axios";

// Create Context
const ProductContext = createContext();

// Create a provider component
export const ProductProvider = ({ children }) => {
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState("All");

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
  

  return (
    <ProductContext.Provider
      value={{ product, setProduct, categories, setCategories, fetchProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  return useContext(ProductContext);
};
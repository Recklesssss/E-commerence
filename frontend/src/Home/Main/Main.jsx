import React, { useState, useEffect } from 'react';
import './Main.css';
import Bottom from './Bottom';
import { useProduct } from '../../ProductContext';

function Main() {
  const { product, fetchProduct, categories, setCategories } = useProduct();

  useEffect(() => {
    fetchProduct();
  }, [categories]);

  return (
    <div className='adj_main'>
      <div className='banner'>
        <img 
          src="https://img.freepik.com/free-vector/flat-cyber-monday-social-media-cover-template_23-2149098788.jpg?t=st=1731598552~exp=1731602152~hmac=f375bab32c1d18f45f507fc0f1d93506d561e7d79d03f52fff5e7f05f34d7c56&w=996" 
          alt="Cyber Monday Banner" 
        />
      </div>
      
      <div className="electronics">
        <h5>Electronics</h5>
        <div className="electronics__container">
          {product.length > 0 ? (
            product.map((item, index) => (
              <div className="electronics__item" key={index}>
                <img src={item.image} alt={item.product_name} />
                <p>{item.product_name}</p>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
      
      <div className="furniture">
      <h5>Furniture</h5>
        <div className="electronics__container">
          {product.length > 0 ? (
            product.map((item, index) => (
              <div className="electronics__item" key={index}>
                <img src={item.image} alt={item.product_name} />
                <p>{item.product_name}</p>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
      
      <div className="agriculture">
      <h5>Agriculture</h5>
        <div className="electronics__container">
          {product.length > 0 ? (
            product.map((item, index) => (
              <div className="electronics__item" key={index}>
                <img src={item.image} alt={item.product_name} />
                <p>{item.product_name}</p>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
      <div className="vehcle">
      <h5>Vehicle</h5>
        <div className="electronics__container">
          {product.length > 0 ? (
            product.map((item, index) => (
              <div className="electronics__item" key={index}>
                <img src={item.image} alt={item.product_name} />
                <p>{item.product_name}</p>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
      <div>
        <Bottom/>
      </div>
    </div>
  );
}

export default Main;

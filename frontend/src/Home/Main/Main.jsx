import React, { useState, useEffect } from 'react';
import './Main.css';
import Image from '../ImgContainer';
import Bottom from './Bottom';

function Main() {
  const [electronics, setElectronics] = useState([]);

  // Use useEffect to set the state after the component mounts
  useEffect(() => {
    setElectronics(Image);
  }, []);  // Empty array ensures this only runs once when the component mounts

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
          {electronics.length > 0 ? (
            electronics.map((item, index) => (
              <div className="electronics__item" key={index}>
                <img src={item.img_url} alt={item.name} />
                <p>{item.name}</p>
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
          {electronics.length > 0 ? (
            electronics.map((item, index) => (
              <div className="electronics__item" key={index}>
                <img src={item.img_url} alt={item.name} />
                <p>{item.name}</p>
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
          {electronics.length > 0 ? (
            electronics.map((item, index) => (
              <div className="electronics__item" key={index}>
                <img src={item.img_url} alt={item.name} />
                <p>{item.name}</p>
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
          {electronics.length > 0 ? (
            electronics.map((item, index) => (
              <div className="electronics__item" key={index}>
                <img src={item.img_url} alt={item.name} />
                <p>{item.name}</p>
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

import React, { useState } from 'react';
import './header.css';
import { CiSearch } from "react-icons/ci";

function Header() {
  const [toggle, setToggle] = useState(false);

  return (
    <div className='header'>
      <div className="top_nav">
        <div className="buttons">
          <div className="search-bar-container">
            <CiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search for something..."
              className="search-bar"
            />
          </div>
        </div>    
        <div className="user-profile">
          <div className="cart">My cart</div>
          <div className="signin">Sign in & up</div>
        </div>
      </div>

      <div className="second__container">
        <div className="choice">
          <label htmlFor="choices">Categories</label>
          <select id="choices" name="choices">
            <option value="electronics">Electronics Device</option>
            <option value="vehicles">Vehicles</option>
            <option value="furniture">Furniture</option>
            <option value="agriculture">Agriculture & Food</option>
            <option value="construction">Construction Material</option>
            <option value="sports">Sport & Art Material</option>
            <option value="clothing">Cloth & Shoes</option>
          </select>
        </div>
        <ul className="Nav__bars">
          <li>HOME</li>
          <li>SHOP</li>
          <li>ABOUT US</li>
          <li>CONTACT US</li>
          <li>SALES</li>
          <li>RENTS</li>
        </ul>
      </div>
    </div>
  );
}

export default Header;

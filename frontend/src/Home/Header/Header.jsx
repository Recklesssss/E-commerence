import React, { useState, useEffect } from 'react';
import './header.css';
import { CiMenuBurger } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { Link } from 'react-router-dom';

function Header() {
  const [toggle, setToggle] = useState(false); // State to control dropdown visibility
  const [responsive, setResponsive] = useState(window.innerWidth <= 1240); // State for responsiveness

  // Update responsiveness state based on window width
  const handleResize = () => {
    setResponsive(window.innerWidth <= 1240); // Toggle between mobile and desktop layout
  };

  useEffect(() => {
    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleHandler = () => {
    setToggle(prevToggle => !prevToggle); // Toggle the dropdown visibility on click
  };

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

        <div className="toggle"> 
          {/* Desktop view: User profile */}
          <div style={{ display: responsive ? 'none' : 'flex' }} className="user-profile">
            <div className="cart">My cart</div>
            <div className="signin">Sign in & up</div>
          </div>
          
          {/* Mobile view: Dropdown menu */}
          <div style={{ display: responsive ? 'block' : 'none' }} className='dropdown'>
            <CiMenuBurger onClick={toggleHandler} className='burger'/>
            {/* Show the dropdown when toggle is true */}
            {toggle && (
              <div className="dropdown-menu">
                <ul>
                  <li>My cart</li>
                  <li>Sign in & up</li>
                </ul>
              </div>
            )}
          </div>
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
          <Link to={"/About us"}><li>ABOUT US</li></Link>
          <Link to={"/Contact us"}><li>CONTACT US</li></Link>
          <li>SALES</li>
          <li>RENTS</li>
        </ul>
      </div>
    </div>
  );
}

export default Header;

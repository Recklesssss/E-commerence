import React, { useState, useEffect } from 'react';
import './header.css';
import { CiMenuBurger } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { FaBell, FaUserCircle } from "react-icons/fa"; // Icons for notifications and profile
import { Link } from 'react-router-dom';
import { useProduct } from '../../ProductContext';

function Header() {
  const [toggle, setToggle] = useState(false);
  const [responsive, setResponsive] = useState(window.innerWidth <= 1240);
  const [showProfile, setShowProfile] = useState(false); // State to control profile modal
  const { categories, setCategories } = useProduct();

  const handleResize = () => {
    setResponsive(window.innerWidth <= 1240);
  };

  const toggleHandler = () => {
    setToggle((prevToggle) => !prevToggle);
  };

  const toggleProfile = () => {
    setShowProfile((prevShowProfile) => !prevShowProfile);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="header">
      {/* Top navigation */}
      <div className="top_nav">
        <div className="buttons">
          {/* Search Bar */}
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
          {/* Desktop View */}
          <div style={{ display: responsive ? 'none' : 'flex' }} className="user-actions">
            <div className="notification">
              <FaBell className="notification-icon" />
            </div>
            <div className="cart">My Cart</div>
            <Link to={"/SignupSignin"}>
              <div className="signin">Sign in & up</div>
            </Link>
            <div className="profile" onClick={toggleProfile}>
              <FaUserCircle className="profile-icon" />
            </div>
          </div>

          {/* Mobile View */}
          <div style={{ display: responsive ? 'block' : 'none' }} className="dropdown">
            <CiMenuBurger onClick={toggleHandler} className="burger" />
            {toggle && (
              <div className="dropdown-menu">
                <ul>
                  <li>
                    <Link to={"/Orders"}>My Cart</Link>
                  </li>
                  <li>
                    <Link to={"/SignupSignin"}>Sign in & up</Link>
                  </li>
                  <li>Notifications</li>
                  <li onClick={toggleProfile}>Profile</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      {showProfile && (
        <div className="profile-modal">
          <div className="profile-modal-content">
            <button className="close-modal" onClick={toggleProfile}>
              &times;
            </button>
            <h3>User Profile</h3>
            <p><strong>Name:</strong> John Doe</p>
            <p><strong>Email:</strong> johndoe@example.com</p>
            <p><strong>Member since:</strong> January 2021</p>
            {/* Add more user details here */}
          </div>
        </div>
      )}

      {/* Categories and Nav Links */}
      <div className="second__container">
        <div className="choice">
          <label htmlFor="choices">Categories</label>
          <select
            onChange={(e) => setCategories(e.target.value)}
            value={categories}
            id="choices"
            name="choices"
          >
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
          <Link to={"/"}><li>HOME</li></Link>
          <Link to={"/About us"}><li>ABOUT US</li></Link>
          <Link to={"/Contact us"}><li>CONTACT US</li></Link>
          <Link to={"/sales"}><li>SALES</li></Link>
          <Link to={"/rents"}><li>RENTS</li></Link>
        </ul>
      </div>
    </div>
  );
}

export default Header;

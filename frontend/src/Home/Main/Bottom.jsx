import React from 'react'
import "./Bottom.css"

function Bottom() {
  return (
    <footer className="footer">
    <div className="footer-content">
      <div className="about">
        <h3>About Us</h3>
        <p>We are an e-commerce platform providing quality products at affordable prices.</p>
      </div>
      <div className="links">
        <h3>Quick Links</h3>
        <ul>
          <li><a href="/about">About Us</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/terms">Terms & Conditions</a></li>
          <li><a href="/privacy">Privacy Policy</a></li>
        </ul>
      </div>
      <div className="social-media">
        <h3>Follow Us</h3>
        <a href="https://facebook.com" target="_blank">Facebook</a>
        <a href="https://twitter.com" target="_blank">Twitter</a>
        <a href="https://instagram.com" target="_blank">Instagram</a>
      </div>
    </div>
    <div className="footer-bottom">
      <p style={{color:"white"}}>&copy; 2024 E-Commerce Platform. All Rights Reserved.</p>
    </div>
  </footer>
  
  )
}

export default Bottom
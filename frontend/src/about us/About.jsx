import React from 'react'
import "./About.css"

function About() {
  return (
    <div className="contact-about-container">
      <section className="about-us">
        <h2>About Us</h2>
        <p>
          Welcome to our eCommerce platform. We offer a wide variety of products ranging from electronics to clothing and everything in between. Our goal is to provide you with the best shopping experience possible. We ensure customer satisfaction and high-quality products.
        </p>
      </section>

      <section className="contact-us">
        <h2>Contact Us</h2>
        <form className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="4" required></textarea>
          </div>
          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </section>
    </div>
  )
}

export default About
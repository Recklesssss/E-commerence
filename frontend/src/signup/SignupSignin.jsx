import React, { useState } from "react";
import "./SignupSignin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../ProductContext";

const SignupSignin = () => {
  const { setUserName, fetchUserId } = useProduct();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);

  // Toggle between Sign-Up and Sign-In forms
  const toggleForm = () => setIsSignUp(!isSignUp);

  // Validate input fields
  const validateInputs = () => {
    if (!email || !password || (isSignUp && !name)) {
      alert("Please fill all required fields.");
      return false;
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  // Handle Sign-Up
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    try {
      await axios.post("http://localhost:5000/signup", {
        name,
        email,
        password,
      });
      alert("Successfully signed up! ENJOY YOUR STAY!");
      // Save username in context and localStorage
      setUserName(name);
      localStorage.setItem("username", name);
      navigate("/");
    } catch (error) {
      alert("Sign-up failed: " + (error.response?.data || "Server error"));
    }
  };

  // Handle Sign-In
  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    try {
      const response = await axios.get("http://localhost:5000/signin", {
        params: { email, password },
      });
      const { username } = response.data; // Assuming API returns username
      alert("Successfully logged in");
      // Save username in context and localStorage
      setUserName(username);
      localStorage.setItem("username", username);
      await fetchUserId(); // Fetch user ID after login
      navigate("/");
    } catch (error) {
      alert("Sign-in failed: " + (error.response?.data || "Server error"));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignUp) {
      await handleSignUp(e);
    } else {
      await handleSignIn(e);
    }
  };

  return (
    <div className="sign">
      <div className="container">
        <div className="form-container">
          <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
          <form onSubmit={handleSubmit}>
            {isSignUp && (
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                />
              </div>
            )}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                placeholder="Enter your email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                placeholder="Enter your password"
              />
            </div>
            <button type="submit" className="btn">
              {isSignUp ? "Sign Up" : "Sign In"}
            </button>
          </form>
          <p className="toggle-link">
            {isSignUp
              ? "Already have an account? "
              : "Don't have an account? "}
            <span
              onClick={toggleForm}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && toggleForm()}
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupSignin;

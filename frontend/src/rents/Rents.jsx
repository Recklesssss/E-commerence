import axios from "axios";
import React, { useState, useEffect } from "react";
import Header from "../Home/Header/Header";
import "./Rents.css";
import { useProduct } from "../ProductContext";

function Rents() {
  const [toggleForm, setToggleForm] = useState(false);
  const [rents, setRents] = useState([]); // State to store rent data
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [productPicture, setProductPicture] = useState(null); // File input
  const [price, setPrice] = useState("");
  const [show ,setShow] = useState(false);
  const [message,setMessage] = useState("");
  const {user_id,userName} = useProduct()
  const [id,setId] = useState(9)

  const postRents = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("price", parseInt(price)); // Ensure price is numeric
      if (productPicture) {
        formData.append("product_picture", productPicture);
      }

      // Post data to backend
      const response = await axios.post("http://localhost:5000/postRents", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Required for file uploads
        },
      });

      console.log("Rent posted successfully:", response.data);
      setTitle("");
      setContent("");
      setPrice("");
      setProductPicture(null);
      fetchRentsData(); // Refresh rents data
    } catch (error) {
      console.error("Error posting rent:", error.response?.data || error.message);
    }
  };

  const toggleFormFun = () => {
    setToggleForm((prev) => !prev);
  };

  const fetchRentsData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/rents");
      setRents(response.data);
    } catch (error) {
      console.error("Error fetching rents data:", error.response?.data || error.message);
    }
  };
  const sendFriendRequest = async (user_id) => {
    try {
      const message = `New friend has sent a request ${userName} .`;
      setId(user_id);
      setMessage(message);
      const notificationResponse = await axios.post("http://localhost:5000/postNotification",{ user_id:id,message:message,is_checked:false,requesting_user:user_id});
      console.log("Friend request sent!");
    } catch (error) {
      console.error("Error sending friend request:", error.response?.data || error.message);
    }
  };
  
  const showContent = (index,isVisible) => {
    setShow((prevShow) => ({
      ...prevShow,
      [index]: isVisible,
    }));
  };

  useEffect(() => {
    fetchRentsData();
  }, []);

  return (
    <div className="final_sale">
      <Header />
      <div className="sale">
        <button onClick={toggleFormFun}>Post Rents</button>
        {toggleForm && (
          <div className="form_container_rents">
            <form onSubmit={postRents}>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Enter product name"
                required
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setProductPicture(e.target.files[0])}
              />
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                placeholder="Enter a price"
                required
              />
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter product description"
                required
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        )}
        <div className="container_of_rents">
          <div className="rents_container">
            {rents.length > 0 ? (
              rents.map((item, index) => (
                <div 
                  onMouseOver={() => showContent(index, true)}
                  onMouseOut={() => showContent(index, false)}
                  key={index}>
                    <h3>{item.product_name}</h3>
                    <img
                      src={item.image || `http://localhost:5000/uploads/${item.product_picture}`}
                      alt={item.product_name}
                    />
                    <h5>{item.category}</h5>
                    <h5>${item.price}</h5>
                    <div 
                      className="over_the"
                      style={{
                        display: show[index] ? "flex" : "none",
                      }}
                    >
                      <button onClick={() => sendFriendRequest(item.user_id)}>Send a nudge to Owner</button>
                    </div>
                </div>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rents;

import React,{useState,useEffect} from 'react'
import axios from 'axios'
import "./Notification.css"
import { useProduct } from '../ProductContext';
import { Link } from 'react-router-dom';

function Notification() {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const {setCountNotification} = useProduct();
    
  
    useEffect(() => {
      // Fetch notifications from the backend
      const fetchNotifications = async () => {
        try {
          const response = await axios.get("http://localhost:5000/notifications");
          setNotifications(response.data.notifications);
          setUnreadCount(response.data.unreadCount); 
          setCountNotification(response.data.unreadCount);
        } catch (error) {
          console.error("Error fetching notifications:", error);
        }
      };
      fetchNotifications();
    }, []);
  
    const handleNotificationCheck = async (notification_id) => {
      try {
        await axios.post("http://localhost:5000/markNotificationAsChecked", {
          notification_id,
        });
  
        setNotifications(notifications.map((notification) =>
          notification.notification_id === notification_id
            ? { ...notification, is_checked: true }
            : notification
        ));
  
        setUnreadCount(unreadCount - 1);
      } catch (error) {
        console.error("Error marking notification as checked:", error);
      }
    };
  
    return (
      <div className='note'>
        <Link to={"/"}><button>back home</button></Link>
        <h2>Notifications</h2>
        <p>You have {unreadCount} unread notifications.</p>
  
        <ul>
          {notifications.map((notification) => (
            <li key={notification.notification_id}>
              <input
                type="checkbox"
                checked={notification.is_checked}
                onChange={() => handleNotificationCheck(notification.notification_id)}
                disabled={notification.is_checked}  // Disable checkbox if already checked
              />
              {notification.message}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  

export default Notification
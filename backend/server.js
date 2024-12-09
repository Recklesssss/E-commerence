require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const os = require('os');

const app = express();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Adjust the path where files should be saved
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Set file name to avoid overwriting
    }
  });
  const upload = multer({ storage });
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));


const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
}); 
app.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
            [name, email, hashedPassword]
        );
        res.json({ message: 'User added successfully!' });
    } catch (err) {
        if (err.code === '23505') { // Unique constraint violation
            res.status(400).send('Email already in use.');
        } else {
            console.error(err);
            res.status(500).send('Server error');
        }
    }
});

app.get('/signin', async (req, res) => {
    try {
        const { email, password } = req.query;
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length > 0) {
            const isMatch = await bcrypt.compare(password, result.rows[0].password);
            if (isMatch) {
                return res.json({ message: 'User logged in successfully', user: result.rows[0] });
            } else {
                return res.status(401).json({ message: 'Invalid email or password' });
            }
        } else {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server error');
    }
});

app.get("/getCatagories", async (req, res) => {
    try {
      const { categories } = req.query;
      console.log("Categories received:", categories);
      if (!categories) {
        return res.status(400).json({ error: "Category is required" });
      }
  
      const result = await pool.query(`SELECT * FROM products WHERE category = $1`, [categories]);
      res.json(result.rows);
    } catch (error) {
      console.error("Error in API:", error);
      res.status(500).json({ error: "Server Error" });
    }
  });
  

  app.post("/postOrder", async (req, res) => {
    try {
      const { user_id, orderItems, total } = req.body;
  
      const orders = await pool.query(
        `INSERT INTO orders (user_id, order_date) VALUES ($1, NOW()) RETURNING order_id;`,
        [user_id]
      );
      const order_id = orders.rows[0].order_id;
  
      for (const item of orderItems) {
        const { quantity, product_id } = item;
        await pool.query(
          `INSERT INTO order_products (product_id, order_id, quantity, total) VALUES ($1, $2, $3, $4)`,
          [product_id, order_id, quantity, total]
        );
      }
  
      // Respond to client
      res.status(201).json({ message: "Order created successfully" });
    } catch (error) {
      console.error("Error creating order:", error);
  
      // Respond with an error status and message
      res.status(500).json({ message: "Failed to create order" });
    }
  });
  
app.get("/getUserId", async (req, res) => {
    try {
        const { name } = req.query; 
        if (!name) {
            return res.status(400).json({ error: "Name is required to fetch user ID" });
        }

        const userIdResult = await pool.query(`SELECT user_id FROM users WHERE name = $1`, [name]);

        if (userIdResult.rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ user_id: userIdResult.rows[0].user_id }); 
    } catch (error) {
        console.error("Error in /getUserId:", error);
        res.status(500).json({ error: "Server error" });
    }
});

app.get("/sales",async(req,res)=>{
    const sale = "sale"
    const sales = await pool.query(`select * from products where product_type = $1`,[sale])
    res.json(sales.rows)
}) 
app.get("/rents",async(req,res) =>{ 
    const rent = "rent"
    const rents =await pool.query(`select * from products where product_type = $1`,[rent])
    res.json(rents.rows);
})

// POST route for adding sale (posts and products)
app.post("/postSales",upload.single("product_picture"), async (req, res) => {
    try {
      const { title, content, price,category } = req.body;
      const product_picture = req.file ? req.file.filename: null;
      const userId = 9;
  
      console.log("Request body:", req.body); // Debug request body
      console.log("Uploaded file:", req.file); // Debug file upload
  
      if (!title || !content || !price) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      // Insert into posts table
      const postResult = await pool.query(
        `INSERT INTO posts(title, content, product_picture, created_at, category, price, user_id) 
         VALUES ($1, $2, $3, NOW(), $4, $5, $6) RETURNING *`,
        [title, content, product_picture, category, price, userId]
      );
  
      const productResult = await pool.query(
        `INSERT INTO products(product_name, category, product_picture, price) 
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [title, category, product_picture, price]
      );
  
      res.status(201).json({ post: postResult.rows[0], product: productResult.rows[0] });
    } catch (error) {
      console.error("Error posting sale:", error.message); // Log error message
      res.status(500).json({ message: "Error posting sale" });
    }
  });

  app.post("/postRents", upload.single("product_picture"), async (req, res) => {
    try {
      const { title, content, price } = req.body;
      const product_picture = req.file ? req.file.filename : null;
      const userId = 9; 
      const category = "rent"
      const product_type = "rent" 
  
      if (!title || !content || !price) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      // Insert into posts table
      const postResult = await pool.query(
        `INSERT INTO posts(title, content, product_picture, created_at, category, price, user_id) 
         VALUES ($1, $2, $3, NOW(), $4, $5, $6) RETURNING *`,
        [title, content, product_picture, category, price, userId]
      );
  
      // Insert into products table
      const productResult = await pool.query(
        `INSERT INTO products(product_name, product_type, product_picture, price) 
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [title, product_type, product_picture, price]
      );
  
      res.status(201).json({ post: postResult.rows[0], product: productResult.rows[0] });
    } catch (error) {
      console.error("Error posting rent:", error.message);
      res.status(500).json({ message: "Error posting rent" });
    }
  });

  app.get("/uploads/:filename", (req, res) => {
    try {
      const filePath = path.join(__dirname, "uploads", req.params.filename);
  
      // Check if file exists
      if (!fs.existsSync(filePath)) {
        return res.status(404).send("File not found");
      }
  
      // Serve the file
      res.sendFile(filePath);
    } catch (error) {
      console.error("Error serving file:", error.message);
      res.status(500).send("Error fetching file");
    }
  });

  app.post("/postNotification", async (req, res) => {
    try {
      const { user_id, message, is_checked,requesting_user } = req.body;
      const notification = await pool.query(
        `INSERT INTO notifications (user_id, message, created_at,is_checked,requesting_user) VALUES ($1, $2, NOW(),$3,$4)`,
        [user_id, message,is_checked,requesting_user]
      );
      res.status(200).send({ success: true, message: "Notification sent successfully." });
    } catch (error) {
      console.error("Error posting notification:", error);
      res.status(500).send({ success: false, message: "Failed to send notification." });
    }
  });
  
  app.get("/getName", async (req, res) => {
    try {
      const { id } = req.query;
  
      // Check if id is provided
      if (!id) {
        return res.status(400).json({ error: "User ID is required." });
      }
  
      // Query the database
      const result = await pool.query("SELECT name FROM users WHERE user_id = $1", [id]);
  
      // Check if the user was found
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "User not found." });
      }
  
      // Respond with the user's name
      res.json({ name: result.rows[0].name });
    } catch (error) {
      console.error("Error fetching user name:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

// 1. Endpoint to fetch all notifications and count them
app.get("/notifications", async (req, res) => {
  try {
    // Fetch all notifications
    const user_id = 9
    const result = await pool.query("SELECT * FROM notifications WHERE is_checked = FALSE");

    // Count the number of unread notifications
    const notificationCount = result.rows.length;

    // Send the notifications and count as response
    res.json({
      notifications: result.rows,
      unreadCount: notificationCount,
    });
  } catch (error) {
    console.error("Error fetching notifications:", error.message);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
});

// 2. Endpoint to mark a notification as checked and decrease count
app.post("/markNotificationAsChecked", async (req, res) => {
  try {
    const { notification_id } = req.body;

    // Update the notification to set is_checked to TRUE
    const updateResult = await pool.query(
      "UPDATE notifications SET is_checked = TRUE WHERE notification_id = $1",
      [notification_id]
    );

    // Check if any rows were affected (i.e., if the notification exists)
    if (updateResult.rowCount === 0) {
      return res.status(404).json({ error: "Notification not found" });
    }

    // Successfully marked as checked
    res.status(200).json({ message: "Notification marked as checked" });
  } catch (error) {
    console.error("Error marking notification as checked:", error.message);
    res.status(500).json({ error: "Failed to mark notification as checked" });
  }
});

app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');


const app = express();

app.use(cors());
app.use(express.json());

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
  

app.post("/postOrder",async (req,res)=>{
    try {
        const {user_id} = req.body;
        const orders = await pool.query(`insert into orders(user_id,order_date) values($1,NOW())`,[user_id])
    } catch (error) {
        console.error(error)
    }

});
app.post("/postOrderproduct",async (req,res)=>{
    try {
        const {user_id} = req.body;
        const {product_id} = req.body;
        console.log(product_id)
        const orders = await pool.query(`select order_id from orders where user_id = $1 `,[user_id])
        const productOrders = await pool.query(`insert into order_products(product_id,order_id) values($1,$2)`,[orders,product_id])
    } catch (error) {
        console.error(error)
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

  
app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});

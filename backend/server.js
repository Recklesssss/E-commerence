const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();

app.use(cors());
app.use(express.json()); 

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'E-commerence',
  password: 'biruk4you',
  port: 6543,
});
pool.connect();

app.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;  
    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
      [name, email, password]
    );
    res.json({ message: 'User added successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});

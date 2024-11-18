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
                res.json({ message: 'User logged in successfully', user: result.rows[0] });
            } else {
                res.status(401).json({ message: 'Invalid email or password' });
            }
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});

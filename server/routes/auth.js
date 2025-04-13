const express = require('express');
const bcrypt = require('bcryptjs');
const { createUser, getUserByEmail } = require('../models/User'); // Ensure these functions are defined in your User model
const jwt = require('jsonwebtoken');
const router = express.Router();

// User Registration Route
router.post('/register', async (req, res) => {
    const { username, password, email } = req.body;

    // Check if all fields are provided
    if (!username || !password || !email) {
        return res.status(400).json({ message: 'Please provide all fields' });
    }

    // Check if the user already exists by querying the database
    try {
        const user = await getUserByEmail(email);
        if (user) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const result = await createUser(username, email, hashedPassword);
        return res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Database error' });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Validate if user exists
    try {
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Compare entered password with stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        // Respond with the token
        res.status(200).json({
            message: 'Login successful',
            token: token,
            userId: user.id,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Database error' });
    }
});

module.exports = router;

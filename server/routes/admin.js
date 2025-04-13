const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../config/db');  // Import your database connection
const verifyAdmin = require('../middleware/adminMiddleware');  // Admin verification middleware
require('dotenv').config();

const router = express.Router();

// Admin Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Check if credentials match
  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, {
      expiresIn: '2h',
    });

    return res.status(200).json({
      message: 'Admin logged in successfully',
      token,
    });
  }

  return res.status(401).json({ message: 'Invalid admin credentials' });
});

// Admin Dashboard (Protected Route)
router.get('/dashboard', verifyAdmin, (req, res) => {
  res.status(200).json({
    message: 'Welcome to the Admin Dashboard!',
    user: req.user,  // Optional: To display user data (e.g., userId, role)
  });
});

// Add User (Protected Route)
router.post('/add', verifyAdmin, async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please provide all fields' });
  }

  // Check if the email already exists in the database
  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }

    if (result.length > 0) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into the database
    db.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword],
      (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Database error' });
        }

        return res.status(201).json({
          message: 'User added successfully',
          user: {
            id: result.insertId,
            name,
            email,
          },
        });
      }
    );
  });
});

// Update User (Protected Route)
router.put('/update/:id', verifyAdmin, async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  if (!name && !email && !password) {
    return res.status(400).json({ message: 'Please provide at least one field to update' });
  }

  // Build the update query dynamically based on provided fields
  let updateFields = [];
  let updateValues = [];

  if (name) {
    updateFields.push('name = ?');
    updateValues.push(name);
  }

  if (email) {
    updateFields.push('email = ?');
    updateValues.push(email);
  }

  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    updateFields.push('password = ?');
    updateValues.push(hashedPassword);
  }

  updateValues.push(id);

  // Update the user in the database
  const updateQuery = `UPDATE users SET ${updateFields.join(', ')} WHERE id = ?`;

  db.query(updateQuery, updateValues, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({
      message: 'User updated successfully',
      user: {
        id,
        name: name || undefined,
        email: email || undefined,
      },
    });
  });
});

// Delete User (Protected Route)
router.delete('/delete/:id', verifyAdmin, (req, res) => {
  const { id } = req.params;

  // Delete the user by ID
  db.query('DELETE FROM users WHERE id = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'User deleted successfully' });
  });
});

// Get All Users (Protected Route)
router.get('/all', verifyAdmin, (req, res) => {
  // Get all users from the database
  db.query('SELECT id, name, email FROM users', (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }

    return res.status(200).json({
      message: 'All users fetched successfully',
      users: result,
    });
  });
});

module.exports = router;

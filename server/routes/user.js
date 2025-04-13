const express = require('express');
const authenticate = require('../middleware/authMiddleware');
const db = require('../config/db');  // Adjust the path based on the location of db.js

const router = express.Router();

// Protected route: Get User Profile
router.get('/profile', authenticate, (req, res) => {
  // Access the user info from the JWT token
  const userId = req.user.userId;

  // Fetch user data from database based on userId
  const query = 'SELECT name, email FROM users WHERE id = ?';
  db.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'User profile fetched successfully',
      user: results[0],
    });
  });
});

// Add user route
router.post('/add', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Check if the user already exists
    try {
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        await createUser(username, email, hashedPassword);
        res.status(201).json({ message: 'User added successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error adding user' });
    }
});

// Update user route
router.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    try {
        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update the user details
        db.query('UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?', 
            [username, email, hashedPassword, id], (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: 'Error updating user' });
                }

                if (result.affectedRows === 0) {
                    return res.status(404).json({ message: 'User not found' });
                }

                res.status(200).json({ message: 'User updated successfully' });
            }
        );
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating user' });
    }
});

// Delete user route
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Delete the user from the database
        db.query('DELETE FROM users WHERE id = ?', [id], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Error deleting user' });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json({ message: 'User deleted successfully' });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting user' });
    }
});


// View all users route
router.get('/all', async (req, res) => {
    try {
        db.query('SELECT * FROM users', (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Error fetching users' });
            }
            res.status(200).json({ users: result });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching users' });
    }
});


module.exports = router;

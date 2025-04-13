const db = require('../config/db');  // Import your database connection

// Function to get user by email
const getUserByEmail = async (email) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
            if (err) return reject(err);
            resolve(result[0]);  // Return the user if found, else undefined
        });
    });
};

// Function to create a new user
const createUser = async (name, email, password) => {
    return new Promise((resolve, reject) => {
        db.query(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, password],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
};

// ✅ Function to get user by ID
const getUserById = async (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users WHERE id = ?', [id], (err, result) => {
            if (err) return reject(err);
            resolve(result[0]);
        });
    });
};

module.exports = { getUserByEmail, createUser, getUserById };

const express = require('express');
const bodyParser = require('body-parser');
const authRoute = require('./routes/auth'); // Import auth routes
const adminRoute = require('./routes/admin');
const userRoute = require('./routes/user');
require('dotenv').config(); // To load env variables

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoute); // Register route under /api/auth
app.use('/api/user', userRoute); // User profile route (protected)
app.use('/api/admin', adminRoute);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

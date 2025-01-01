const express = require('express');
const dotenv = require('dotenv');

const cors = require('cors');


// Route imports
const authRoutes = require('./Routes/authRoute');
const userRoutes = require('./Routes/ClientRoute/userRoute');
const { checkBlacklist } = require('./Controller/authController');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(checkBlacklist); // Apply blacklist check middleware




// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

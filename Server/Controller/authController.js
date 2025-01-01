const User = require('../Model/User');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../Config/DB');
const util = require('util');
 db.query = util.promisify(db.query).bind(db);

// Registration
// exports.register = async (req, res) => {
//     const { name, mobile, email, password } = req.body;
//     const referralId = req.query.referralId; // Extract referralId from query string
//     console.log(name, mobile, email, password, referralId);

//     // Check if user already exists
//     User.findByEmail(email, async (err, users) => {
//         if (err) return res.status(500).json({ error: err.message });
//         if (users.length > 0) {
//             return res.status(400).json({ message: 'User already exists' });
//         }

//         // Create a new user
//         User.create({ name, mobile, email, password }, async (err, result) => {
//             if (err) return res.status(500).json({ error: err.message });

//             const newUserId = result.insertId; // Get the ID of the newly created user

//             // If referralId is provided, associate the new user with the referring user
//             if (referralId) {
//                 try {
//                     await db.promise().query(
//                         `INSERT INTO referrals (user_id, referred_user_id) VALUES (?, ?)`,
//                         [referralId, newUserId]
//                     );
//                     console.log(`Referral recorded: Referrer ID = ${referralId}, New User ID = ${newUserId}`);
//                 } catch (referralError) {
//                     console.error('Error recording referral:', referralError.message);
//                     // Do not fail the registration even if referral recording fails
//                 }
//             }

//             res.status(201).json({ message: 'User registered successfully' });
//         });
//     });
// };

exports.register = async (req, res) => {
    const { name, email, mobile, password, referralId } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

        // Insert new user with hashed password
        const result = await db.query(
            `INSERT INTO users (name, email, mobile_no, password) VALUES (?, ?, ?, ?)`,
            [name, email, mobile, hashedPassword]
        );

        const newUserId = result?.insertId; // Get the new user ID
        console.log('New User ID:', newUserId);
        console.log('Referral ID:', referralId);

        // If referralId exists, save referral data
        if (referralId) {
            await db.query(
                `INSERT INTO referrals (user_id, referred_user_id, referral_income) VALUES (?, ?, 500)`,
                [referralId, newUserId]
            );
        }

        // Generate JWT for the newly registered user
        const token = jwt.sign({ id: newUserId, email }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(201).json({
            message: 'User registered successfully',
            userId: newUserId,
            token,
        });
    } catch (err) {
        console.error('Error during registration:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Loginrsr
exports.login = (req, res) => {
    const { email, password } = req.body;

    // Find user by email
    User.findByEmail(email, async (err, users) => {
        if (err) return res.status(500).json({ error: err.message });
        if (users.length === 0) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const user = users[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Generate JWT
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.json({ message: 'Login successful', token, id: user.id });
    });
};

exports.authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    // Check if token is blacklisted
    if (blacklistedTokens.has(token)) {
        return res.status(401).json({ message: 'Token is blacklisted. Please login again.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user;
        next();
    });
};

  //Admin Auth Controler API
// Admin Registration
exports.registerAdmin = async (req, res) => {
    const { name, email, password } = req.body;

    // Check if admin already exists
    db.query('SELECT * FROM admin_user WHERE email = ?', [email], async (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length > 0) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        // Hash password and save admin user
        const hashedPassword = await bcrypt.hash(password, 10);
        db.query(
            'INSERT INTO admin_user (name, email, password) VALUES (?, ?, ?)',
            [name, email, hashedPassword],
            (err) => {
                if (err) return res.status(500).json({ error: err.message });
                res.status(201).json({ message: 'Admin registered successfully' });
            }
        );
    });
};

// Admin Login
exports.loginAdmin = (req, res) => {
    const { email, password } = req.body;
    console.log(req.body, 100);
    

    // Find admin by email
    db.query('SELECT * FROM admin_user WHERE email = ?', [email], async (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const admin = results[0];
        const isPasswordValid = await bcrypt.compare(password, admin.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Generate JWT
        const token = jwt.sign({ id: admin.id, email: admin.email, role: admin.role }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        const role = "admin";

        res.json({ message: 'Admin login successful', token, role });
    });
};


const blacklistedTokens = new Set(); // Temporary in-memory store (use Redis/DB for production)

exports.logout = (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(400).json({ message: 'Token is required for logout' });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err) => {
        if (err) {
            return res.status(400).json({ message: 'Invalid token' });
        }

        // Add token to blacklist
        blacklistedTokens.add(token);
        res.json({ message: 'Logout successful' });
    });
};

// Middleware to check for blacklisted tokens
exports.checkBlacklist = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (token && blacklistedTokens.has(token)) {
        return res.status(401).json({ message: 'Token is blacklisted. Please login again.' });
    }

    next();
};
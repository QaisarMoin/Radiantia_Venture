const db = require('../Config/DB');
const bcrypt = require('bcryptjs');

const User = {
    create: async (userData, callback) => {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        db.query(
            'INSERT INTO users (name, mobile_no, email, password) VALUES (?, ?, ?, ?)',
            [userData.name, userData.mobile, userData.email, hashedPassword],
            callback
        );
    },
    findByEmail: (email, callback) => {
        db.query('SELECT * FROM users WHERE email = ?', [email], callback);
    },
};

module.exports = User;

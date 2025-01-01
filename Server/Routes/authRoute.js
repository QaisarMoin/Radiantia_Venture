const express = require('express');
const { register, login, registerAdmin, loginAdmin, logout } = require('../Controller/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.post('/adminRegister', registerAdmin);
router.post('/adminLogin', loginAdmin);

router.post('/logout', logout);


module.exports = router;

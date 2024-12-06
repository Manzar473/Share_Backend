const express = require('express');
const { signup, login, getProfile } = require('../controllers/userController'); // Controller functions
const authenticateToken = require('../middleware/authMiddleware')

const router = express.Router();

// Signup API
router.post('/signup', signup);

// Login API
router.post('/login', login);

router.get('/profile',authenticateToken, getProfile);

module.exports = router;

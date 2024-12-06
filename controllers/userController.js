const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Signup Function
const signup = async (req, res) => {
    const { username, email, password } = req.body;    

    // Validate input
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the new user
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user.', error: error.message });
    }
};

// Login Function
const login = async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Verify the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        // Generate JWT
        const token = jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET,
            { expiresIn: '24h' } // Token expiration time
        );

        res.status(200).json({
            message: 'Login successful!',
            token,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in.', error: error.message });
    }
};


const getProfile = async (req, res) => {
    try {
        // The `req.user` is populated by the `authenticateToken` middleware
        const userId = req.user.id;

        // Fetch the user details excluding the password
        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({ message: 'User profile fetched successfully.', user });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user profile.', error: error.message });
    }
};

module.exports = { signup, login ,getProfile};

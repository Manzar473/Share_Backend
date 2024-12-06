const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Replace with your MongoDB connection string
        await mongoose.connect(process.env.DB_URL);
        console.log('Connected to MongoDB database: Share');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;

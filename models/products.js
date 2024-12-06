const mongoose = require('mongoose');

// Define the product schema
const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
        },
        category: {
            type: String,
            required: true,
        },
        image: {
            type: String, // Store base64 string
            required: true,
        },
        isAvailable: {
            type: Boolean,
            default: true,
        },
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference the User model
            required: true,
        },
    },
    { timestamps: true } // Automatically add createdAt and updatedAt fields
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

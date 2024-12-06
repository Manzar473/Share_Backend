const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema(
    {
        requestBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference to the User model
            required: true,
        },
        requestTo:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference to the User model
            required: true,
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product', // Reference to the Product model
            required: true,
        },
        requestStatus: {
            type: String,
            enum: ['Pending', 'Declined', 'Accepted'], // Allowed values
            default: 'Pending',
        },
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

module.exports = mongoose.model('Request', requestSchema);

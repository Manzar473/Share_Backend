const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            validate: {
                validator: function (value) {
                    return /^\S+@\S+\.\S+$/.test(value); // Basic email regex
                },
                message: props => `${props.value} is not a valid email!`,
            },
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
        isProfileCompleted: {
            type: Boolean,
            default: false,
        },
        address: {
            city: {
                type: String,
                trim: true,
                default: '',
            },
            areaName: {
                type: String,
                trim: true,
                default: '',
            },
        },
        contact: {
            type: String,
            trim: true,
            default: '',
        },
        image: {
            type: String,
            trim: true,
            default: '', // Default value if no image is provided
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        gender:{
            type: String,
            enum: ['male', 'female'],
        }
    },
    {
        timestamps: true, // Adds createdAt and updatedAt
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;

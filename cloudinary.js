// cloudinary.js
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// Function to upload image to Cloudinary
const uploadToCloudinary = async (image, folderName) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    try {
        // Upload image to Cloudinary
        const result = await cloudinary.uploader.upload(image, {
            folder: folderName,  // Specify the Cloudinary folder
            use_filename: true,  // Use original filename
            unique_filename: false,  // Optional: Prevent Cloudinary from appending random suffixes to the filename
        });

        // Delete the local file after successful upload
        fs.unlink(image, (err) => {
            if (err) {
                console.error(`Error deleting file: ${image}`, err.message);
            } else {
                console.log(`File deleted successfully after uploading to Cloudinary: ${image}`);
            }
        });

        return result.secure_url;  // Return the secure URL of the uploaded image
    } catch (error) {
        fs.unlink(image, (err) => {
            if (err) {
                console.error(`Error deleting file: ${image}`, err.message);
            } else {
                console.log(`File deleted locally after Cloudinary Rejection: ${image}`);
            }
        });
        throw new Error('Error uploading image to Cloudinary: ' + error.message);
    }
};

module.exports = {
    uploadToCloudinary,
};

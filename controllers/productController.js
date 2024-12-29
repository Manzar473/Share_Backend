const Product = require('../models/products');
const { uploadToCloudinary } = require('../cloudinary')

// Create a new product
exports.createProduct = async (req, res) => {
    const { name, description, quantity, category, isAvailable, postedBy } = req.body;
    const image = req.file; 

    // Validate input
    if (!name || !description || !quantity || !category || !postedBy) {
        return res.status(400).json({ message: 'All fields except the image are required.' });
    }

    try {
        let imageUrl;

        // Upload image to Cloudinary if provided
        if (image) {
            imageUrl = await uploadToCloudinary(image.path, 'product_images'); // Function to upload the image
        } else {
            return res.status(400).json({ message: 'Image is required.' });
        }

        // Create the product
        const newProduct = new Product({
            name,
            description,
            quantity,
            category,
            image: imageUrl, // Save the uploaded image URL
            isAvailable,
            postedBy,
        });

        await newProduct.save();
        res.status(201).json({ message: 'Product created successfully!', product: newProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error creating product.', error: error.message });
    }
};

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('postedBy', 'username email'); // Populate postedBy with username and email
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products.', error: error.message });
    }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('postedBy', 'username email');
        if (!product) {
            return res.status(404).json({ message: 'Product not found.' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product.', error: error.message });
    }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found.' });
        }
        res.status(200).json({ message: 'Product updated successfully!', product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error updating product.', error: error.message });
    }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found.' });
        }
        res.status(200).json({ message: 'Product deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product.', error: error.message });
    }
};

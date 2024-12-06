const Product = require('../models/products');

// Create a new product
exports.createProduct = async (req, res) => {
    const { name, description, quantity, category, image, isAvailable, postedBy } = req.body;

    // Validate input
    if (!name || !description || !quantity || !category || !image || !postedBy) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const newProduct = new Product({
            name,
            description,
            quantity,
            category,
            image,
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

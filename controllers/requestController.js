const Request = require('../models/request');

// Create a new request
const createRequest = async (req, res) => {
    const { productId, requestTo } = req.body;

    if (!productId) {
        return res.status(400).json({ message: 'Product ID is required.' });
    }

    try {
        // Check if the user has already requested this product
        const existingRequest = await Request.findOne({
            requestBy: req.user.id,
            productId,
        });

        if (existingRequest) {
            return res.status(400).json({ message: 'You have already requested this product.' });
        }

        // Create a new request
        const newRequest = new Request({
            requestBy: req.user.id, // Extracted from the JWT token in middleware
            productId,
            requestTo
        });

        const savedRequest = await newRequest.save();
        res.status(201).json({ message: 'Request submitted successfully.', request: savedRequest });
    } catch (error) {
        res.status(500).json({ message: 'Error creating request.', error: error.message });
    }
};

// Delete a request
const deleteRequest = async (req, res) => {
    const { requestId } = req.params;

    try {
        const deletedRequest = await Request.findByIdAndDelete(requestId);
        if (!deletedRequest) {
            return res.status(404).json({ message: 'Request not found.' });
        }

        res.status(200).json({ message: 'Request deleted successfully.', request: deletedRequest });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting request.', error: error.message });
    }
};

// Get requests for a specific product
const getRequestsByProductId = async (req, res) => {
    const { productId } = req.params;

    try {
        const requests = await Request.find({ productId })
            .populate('requestBy', 'username email image city area')
            .populate('productId', 'name description image') .sort({ createdAt: -1 });

        res.status(200).json({ message: 'Requests fetched successfully.', requests });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching requests.', error: error.message });
    }
};

// Get requests for a specific user
const getRequestsByUserId = async (req, res) => {
    try {
        const requests = await Request.find({ requestBy: req.user.id })
        .populate('requestBy', 'username email image city area')
        .populate('requestTo', 'username email image city area')
        .populate('productId', 'name description image').sort({ createdAt: -1 });;

        res.status(200).json({ message: 'Requests fetched successfully.', requests });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching requests.', error: error.message });
    }
};


// Get requests for a specific user
const getRequestsReceivedByUserId = async (req, res) => {
    try {
        const requests = await Request.find({ requestTo: req.user.id })
        .populate('requestBy', 'username email image city area')
        .populate('requestTo', 'username email image city area')
        .populate('productId', 'name description image').sort({ createdAt: -1 });

        res.status(200).json({ message: 'Requests fetched successfully.', requests });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching requests.', error: error.message });
    }
};


// Get a request by its own ID
const getRequestById = async (req, res) => {
    const { requestId } = req.params;

    try {
        const request = await Request.findById(requestId)
            .populate('productId', 'name description')
            .populate('requestBy', 'username email');

        if (!request) {
            return res.status(404).json({ message: 'Request not found.' });
        }

        res.status(200).json({ message: 'Request fetched successfully.', request });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching request.', error: error.message });
    }
};


// update the request status
const updateRequestStatus = async (req, res) => {
    const { requestId } = req.params;
    const { requestStatus } = req.body;

    // Validate status input
    if (!['Pending', 'Accepted', 'Declined'].includes(requestStatus)) {
        return res.status(400).json({ message: 'Invalid request status. Allowed values: Pending, Accepted, Declined.' });
    }

    try {
        // Find the request by ID
        const request = await Request.findById(requestId);
        if (!request) {
            return res.status(404).json({ message: 'Request not found.' });
        }

        // Update the request status
        request.requestStatus = requestStatus;
        const updatedRequest = await request.save();

        res.status(200).json({
            message: 'Request status updated successfully.',
            request: updatedRequest,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating request status.', error: error.message });
    }
};

module.exports = {
    createRequest,
    deleteRequest,
    getRequestsByProductId,
    getRequestsByUserId,
    getRequestById,
    updateRequestStatus,
    getRequestsReceivedByUserId
};

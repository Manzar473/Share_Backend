const express = require('express');
const {
    createRequest,
    deleteRequest,
    getRequestsByProductId,
    getRequestsByUserId,
    getRequestById,
    updateRequestStatus,
    getRequestsReceivedByUserId
} = require('../controllers/requestController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

// Create a new request
router.post('/', authenticateToken, createRequest);

// Delete a request
router.delete('/:requestId', authenticateToken, deleteRequest);

// Get requests by product ID
router.get('/product/:productId', authenticateToken, getRequestsByProductId);

// Get requests by user ID
router.get('/send', authenticateToken, getRequestsByUserId);

// Get requests received by user ID
router.get('/receive', authenticateToken, getRequestsReceivedByUserId);

// Get a request by its own ID
router.get('/:requestId', authenticateToken, getRequestById);

// update the status
router.put('/:requestId/status', authenticateToken, updateRequestStatus);

module.exports = router;

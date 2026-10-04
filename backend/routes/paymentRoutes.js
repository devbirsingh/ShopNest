const router = require('express').Router();
const { createdOrder, verifyPayment } = require('../controller/paymentController');
const { admin } = require('../middleware/adminMiddleware');
const { protect } = require('../middleware/authMiddleware');

router.post('/order',createdOrder);
router.post('/verify',verifyPayment);

module.exports = router;
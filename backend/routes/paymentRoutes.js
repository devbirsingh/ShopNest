const router = require('express').Router();
const { createdOrder, verifyPayment } = require('../controller/paymentController');
const { protect } = require('../middleware/authMiddleware');

router.post('/order',protect,createdOrder);
router.post('/verify',protect,verifyPayment);

module.exports = router;
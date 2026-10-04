const { createOrder, getOrders, myOrders, updateOrderStatus } = require('../controller/orderController');
const { admin } = require('../middleware/adminMiddleware');
const { protect } = require('../middleware/authMiddleware');

const router = require('express').Router();

router.route('/').post(protect,createOrder).get(protect,admin,getOrders)
router.route('/myorders').get(protect,myOrders)

router.route('/:id/status').put(protect,admin,updateOrderStatus);

module.exports = router;
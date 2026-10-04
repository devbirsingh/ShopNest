const router = require('express').Router();
const authRoutes = require('./authRoutes.js');
const productRoutes = require('./productRoutes.js');
const orderRoutes = require('./orderRoutes.js');
const paymentRoutes = require('./paymentRoutes.js');

router.use('/auth',authRoutes);
router.use('/products',productRoutes);
router.use('/orders',orderRoutes)
router.use('/payments',paymentRoutes)

module.exports = router;


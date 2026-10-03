const router = require('express').Router();
const authRoutes = require('./authRoutes.js');
const productRoutes = require('./productRoutes.js');

router.use('/auth',authRoutes);
router.use('/products',productRoutes);


module.exports = router;


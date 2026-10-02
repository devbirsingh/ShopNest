const router = require('express').Router();
const {registerUser,loginUser,getUsers} = require('../controller/authController');
const { admin } = require('../middleware/adminMiddleware');
const { protect } = require('../middleware/authMiddleware');

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/users",protect,admin, getUsers);

module.exports = router;

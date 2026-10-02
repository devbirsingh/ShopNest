const router = require('express').Router();
const {registerUser,loginUser,getUsers} = require('../controller/authController');

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/user", getUsers);

module.exports = router;

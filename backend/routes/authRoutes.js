const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { getActiveUserCounts } = require('../utils/activeUsers');
const {authMiddleware} = require('../middleware/authMiddleware'); 


router.post('/register', authController.registerUser);


router.post('/login', authController.loginUser);


router.post('/logout', authMiddleware, authController.logoutUser);


router.get('/user/:username', authController.getUserByUsername);

router.post("/find", authController.findUser);



router.get('/active-users', (req, res) => {
    const activeUserCounts = getActiveUserCounts();
    res.status(200).json({ success: true, activeUserCounts });
});

module.exports = router;

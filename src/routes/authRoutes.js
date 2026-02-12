const express = require('express');
const { register, login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { authLimiter } = require('../middleware/rateLimiters');

const router = express.Router();

router.use(authLimiter);

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);

module.exports = router;

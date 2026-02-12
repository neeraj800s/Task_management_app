const rateLimit = require('express-rate-limit');

exports.authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: {
        success: false,
        error: 'Too many login attempts, please try again after 15 minutes'
    }
});

exports.apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});

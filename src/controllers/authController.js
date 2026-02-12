const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const logActivity = require('../services/loggerService');

exports.register = async (req, res, next) => {
    const { name, email, password } = req.body;

    try {
        const user = await User.create({
            name,
            email,
            password
        });

        await logActivity(user.id, 'REGISTER_SUCCESS', req, { email });

        sendTokenResponse(user, 201, res);
    } catch (err) {
        next(err);
    }
};


exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorResponse('Please provide an email and password', 400));
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
        await logActivity(null, 'LOGIN_FAILED', req, { email, reason: 'User not found' });
        return next(new ErrorResponse('Invalid credentials', 401));
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
        await logActivity(user.id, 'LOGIN_FAILED', req, { email, reason: 'Invalid password' });
        return next(new ErrorResponse('Invalid credentials', 401));
    }

    await logActivity(user.id, 'LOGIN_SUCCESS', req);
    sendTokenResponse(user, 200, res);
};

exports.getMe = async (req, res, next) => {
    const user = await User.findByPk(req.user.id);

    res.status(200).json({
        success: true,
        data: user
    });
};


const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };

    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }

    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            token
        });
};

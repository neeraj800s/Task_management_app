const ActivityLog = require('../models/ActivityLog');

/**

 * @param {string|null} userId 
 * @param {string} action 
 * @param {Object} req 
 * @param {Object} details
 */
const logActivity = async (userId, action, req, details = {}) => {
    try {
     const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];

    await ActivityLog.create({
            userId,
            action,
            ipAddress,
            userAgent,
            details
        });
    } catch (err) {
console.error('Failed to log activity:', err);
    }
};

module.exports = logActivity;

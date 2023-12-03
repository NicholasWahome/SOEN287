const authMiddleware = (req, res, next) => {
    try {
        next();
    } catch (error) {
        console.log(req.session.user);
        console.error('Auth Middleware Error:', error);
        res.status(500).json({ success: false, message: 'Internal server error in authentication middleware' });
    }
};

module.exports = authMiddleware;
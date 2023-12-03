const authMiddleware = (req, res, next) => {
    try {
        // console.log(req.session); 
        // if (req.session.user) {
        //     console.log(req.user.session);
            next();
        // } else {
        //     // User is not authenticated, send an unauthorized response
        //     console.log(req.session); 
        //     res.status(401).json({ success: false, message: 'Unauthorized' });
        // }
    } catch (error) {
        console.log(req.session.user);
        console.error('Auth Middleware Error:', error);
        res.status(500).json({ success: false, message: 'Internal server error in authentication middleware' });
    }
};

module.exports = authMiddleware;


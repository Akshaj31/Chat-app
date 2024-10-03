import jwt from 'jsonwebtoken';

// Middleware to verify access token
const authenticateToken = (req, res, next) => {
    const token = req.cookies.accessToken; // Get token from cookies

    if (!token) return res.status(401).json({ message: 'Access token is required.' });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid access token.' });
        }
        req.user = user; // Attach user info to the request
        next(); // Call the next middleware or route handler
    });
};

export { authenticateToken };

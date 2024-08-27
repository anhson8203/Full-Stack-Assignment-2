const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).json({ message: 'Unauthorised. No token!' });
    }

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        const token = req.headers.authorization.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid or Expired token!' });
            } else {
                req.user = data;
                next();
            }

            req.user = decoded;
            next();
        });
    }
}

module.exports = verifyToken;
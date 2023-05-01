const jwt = require('jsonwebtoken');

module.exports.verifyJWT =
    async function verifyJWT(req, res) {
        const token = req.headers['access-token'];
        if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

        jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
            if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
        });
    };
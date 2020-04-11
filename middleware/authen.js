const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function(req, res, next) {
    //get token from header
    const token = req.header('x-auth-token');

    //check if not token
    if (!token) {
        return res.status(400).json({ msg: 'No token' })
    }

    //verify token
    try {
        const decode = jwt.verify(token, config.get('jwtSecret'));
        req.user = decode.user
        next();
    } catch (err) {
        res.status(400).json({ msg: 'Token is not valid' })
    }
}
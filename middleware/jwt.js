const jwt = require("jsonwebtoken");

module.exports = {
    checkTokenRoot: (req, res, next) => {
        var token = req.cookies.accessToken;
        if (token) {
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    return res.json({
                        success: 0,
                        message: "Invalid Token...",
                    });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            return res.json({
                success: 0,
                message: "Access Denied! Unauthorized User",
            });
        }
    },
    checkToken: (req, res, next) => {
        var accessToken = req.cookies.accessToken;
        var token = req.cookies.token;
        if (token) {
            jwt.verify(accessToken, token, (err, decoded) => {
                if (err) {
                    return res.json({
                        success: 0,
                        message: "Invalid Token...",
                    });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            return res.json({
                success: 0,
                message: "Access Denied! Unauthorized User",
            });
        }
    },
};
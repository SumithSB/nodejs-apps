const { verify } = require('jsonwebtoken');

module.exports = {
    checkToken: (req, res, next) => {
        const token = req.get('authorization');
        if (token) {
            let jwt = token.slice(7);
            verify(jwt, "mysecretkeyman", (err, decoded) => {
                if (err) {
                    res.status(400).json({
                        result: "Invalid token",
                        status: "FAILURE"
                    });
                } else {
                    next();
                }
            });

        } else {
            res.status(400).json({
                result: "Unauthorized",
                status: "FAILURE"
            });
        }
    }
}
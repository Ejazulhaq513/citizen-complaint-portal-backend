const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: "Not authorized"
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || "hackathon_default_secret_key_2026"
        );

        req.user = {
            id: decoded.userId || decoded.id,
            userId: decoded.userId || decoded.id,
            ...decoded
        };

        next();

    } catch (error) {
        res.status(401).json({
            message: "Invalid token"
        });
    }
};

module.exports = protect;
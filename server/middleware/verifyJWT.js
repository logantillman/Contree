import jwt from 'jsonwebtoken';

export const verifyJWT = async(req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
            return res.status(403).json({ message: "Forbidden" });
        }
        req.user = {};
        req.user.id = decoded.id;
        req.user.email = decoded.email;
        next();
    });
}
import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({ path: '../config.env' });

export const registerUser = async(req, res) => {
    const user = req.body;

    const emailIsTaken = await User.findOne({ email: user.email });

    if (emailIsTaken) {
        res.status(400).json({ message: "Email is taken" });
    } else {
        user.password = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
            email: user.email.toLowerCase(),
            password: user.password
        });

        newUser.save()
        res.status(200).json({ message: "Success creating user" });
    }
}

export const loginUser = async(req, res) => {
    const user = req.body;

    User.findOne({ email: user.email })
    .then(userFound => {
        if (!userFound) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        bcrypt.compare(user.password, userFound.password)
        .then(usersMatch => {
            if (usersMatch) {
                const payload = {
                    id: userFound._id,
                    email: userFound.email
                }
                jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    { expiresIn: 86400 },
                    (error, token) => {
                        if (error) return res.status(400).json({ message: error.message });
                        return res.status(200).json({
                            message: "Success logging in",
                            token: "Bearer " + token
                        })
                    }
                )
            } else {
                return res.status(400).json({ message: "Invalid email or password" });
            }
        })
    })
}

export const verifyJWT = async(req, res, next) => {
    const token = req.headers["authorization"]?.split(' ')[1];

    if (token) {
        jwt.verify(token, process.env.PASSPORTSECRET, (error, decoded) => {
            if (error) return res.status(400).json({
                isLoggedIn: false,
                message: "Failed to authenticate"
            });
            req.user = {};
            req.user.id = decoded.id;
            req.user.email = decoded.email;
            next();
        });
    } else {
        res.status(400).json({
            isLoggedIn: false,
            message: "Incorrect token given"
        });
    }
}
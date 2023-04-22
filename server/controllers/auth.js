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
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const foundUser = await User.findOne({ email: email });

    if (!foundUser) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const match = await bcrypt.compare(password, foundUser.password)

    if (!match) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const accessToken = jwt.sign(
        {
            id: foundUser._id,
            email: foundUser.email
        },
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
        { email: foundUser.email },
        process.env.REFRESH_SECRET,
        { expiresIn: "1d" }
    );

    res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000
    });

    res.json({ accessToken });
}

export const refresh = (req, res) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) {
        console.log("no jwt cookie found");
        return res.status(401).json({ message: "Unauthorized" });
    }

    const refreshToken = cookies.jwt;

    jwt.verify(refreshToken, process.env.REFRESH_SECRET, async(error, decoded) => {
        if (error) {
            return res.status(400).json({ message: "Failed to authenticate" });
        }

        const foundUser = await User.findOne({ email: decoded.email });

        if (!foundUser) {
            console.log("didn't find user when refreshing");
            return res.status(401).json({ message: "Unauthorized" });
        }

        const accessToken = jwt.sign(
            {
                id: foundUser._id,
                email: foundUser.email
            },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        );

        res.json({ accessToken });
    })
}

export const logoutUser = (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        return res.sendStatus(204);
    }

    res.clearCookie('jwt', {
        httpOnly: true,
        secure: true,
        sameSite: "None",
    })
    res.json({ message: "Cookie cleared" });
}
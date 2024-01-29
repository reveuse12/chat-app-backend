import User from "../models/users.models.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const generateTokenAndRefreshTokens = async (userid) => {
    try {
        const user = await User.findById(userid);
        const token = user.generateToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshTokens = refreshToken;
        await user.save({ validateBeforeSave: false });
        return { token, refreshToken };
    } catch (error) {
        console.log("error generating tokens", error);
    }
};

export const registerUser = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        if (!username || !password || !email)
            return res.status(400).json({ message: "Please fill all fields" });

        const alreadyUser = await User.findOne({ username });

        if (alreadyUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = await User.create({
            username: username.toLowerCase(),
            password,
            email,
        });

        const createdUser = await User.findById(newUser._id).select(
            "-password -refreshToken"
        );

        if (!createdUser)
            return res
                .status(500)
                .json({ message: "error while registering User" });

        res.json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

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

export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password)
            return res.status(400).json({ message: "Please fill all fields" });

        const user = await User.findOne({ username }).select("+password");

        if (!user) return res.status(400).json({ message: "User not found" });

        const isPasswordCorrect = await user.isPasswordCorrect(password);

        if (!isPasswordCorrect)
            return res.status(400).json({ message: "Invalid Password" });

        const { token, refreshToken } = await generateTokenAndRefreshTokens(
            user._id
        );

        const loggedInUser = await User.findById(user._id).select(
            "-password -refreshToken"
        );

        const options = {
            httpOnly: true,
            secure: true,
        };

        res.status(200).json({
            user: loggedInUser,
            token,
            refreshToken,
            options,
            message: "User Logged In Successfully",
        });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

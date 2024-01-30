import express from "express";
import {
    loginUser,
    registerUser,
    changePassword,
    logoutUser,
} from "../../controllers/users.controller.js";
import { isAuthenticated } from "../../middlewares/auth.middleware.js";

const userRoutes = express.Router();

userRoutes.get("/", (req, res) => {
    res.json({ message: "user routers" });
});

userRoutes.route("/register").post(registerUser);

userRoutes.route("/login").post(loginUser);

//secure routes
userRoutes.route("/logout").post(isAuthenticated, logoutUser);
userRoutes.route("/changepassword").post(isAuthenticated, changePassword);

export default userRoutes;
